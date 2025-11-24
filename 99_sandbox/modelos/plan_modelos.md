# Plan de especificación de modelos de datos MDLO en AdonisJS 6

## Objetivo

- Formular la especificación completa de modelos (Lucid) para MDLO v1, con migraciones, relaciones, constraints, índices y factories/seeders alineados al capítulo `09_Escenarios_de_Verificacion.md`.

## Principios de modelado (Adonis/Lucid)

- **Nombres**: modelos en `app/models/*`, tablas snake_case plural (ej. `prestaciones_economicas`).
- **Tipos**: usar enums en TypeScript; en DB `varchar` con `CHECK` o enum nativo según motor.
- **Integridad**: FKs `NOT NULL` donde aplique; índices por búsqueda y unicidad de negocio; timestamps `created_at/updated_at`; `deleted_at` solo donde tenga sentido.
- **Auditabilidad**: `correlation_id`, `causation_id`, `sna_id` cuando aplique; logs de orquestación livianos.
- **Versionamiento normativo**: toda ejecución de cálculo referencia un `SNA` (Snapshot Normativo Aplicado).

## Distinción clave: Eventos de negocio vs eventos de aplicación

- **Eventos de Negocio (EVT)**:
  - Sucesos del dominio (p. ej. “Acreditación de estudios recibida”, “Nuevo vínculo (AUC)”, “Fallecimiento causante”, “Cese por edad”).
  - Persisten en BD; disparan PDN/RDN; permiten trazabilidad y replays.
  - Tabla central: `eventos_negocio`.
- **Eventos de Aplicación (App Events)**:
  - Eventos de infraestructura (EventEmitter, jobs, hooks) para orquestación interna (p. ej. “Liquidación generada”, “Archivo enviado a banco”).
  - No son parte del MDLO; opcionalmente se registran en `app_event_log` solo para observabilidad.

## Fase 1 — Núcleo conceptual MDLO (catálogos, base, EVT, excepciones)

Entregables:

- Migraciones, modelos, relaciones, índices, factories mínimas, seeders base.
- Validadores VineJS para DTOs de creación EVT/EXP/EXD.
- Tests funcionales mínimos + 1 E2E de registro EVT→efecto PDN simulado.

Modelos y tablas:

- `Persona` → `personas`
  - Claves: `rut` único; datos demográficos; índice por `rut`.
- `FichaPersona` → `fichas_persona`
  - FK `persona_id`; datos de afiliación y salud; índice por `persona_id`.
- `HechoCausal` → `hechos_causales`
  - `tipo_siniestro` (catálogo 1.4), `fecha_siniestro`, `trabajador_id` (FK), `sisesat_folio` (índice).
- `PrestacionEconomica` → `prestaciones_economicas`
  - `tipo` (catálogo 1.3), `estado` (catálogo 1.1), `codigo_inactivacion` (catálogo 1.2), fechas de activación/fin; índices por `ficha_persona_id`, `estado`.
- `EventoNegocio` → `eventos_negocio`
  - Campos:
    - `tipo` (catálogo EVT MDLO, ej. `EVT-MANT-CERT_ESTUDIOS_RECIBIDO`, `EVT-CESE-NUEVO_VINCULO`, `EVT-FALL-CAUSANTE`).
    - `sujeto_tipo` (`Persona`, `FichaPersona`, `PrestacionEconomica`, `HechoCausal`, `Tramite`, `Expediente`).
    - `sujeto_id` (polimórfico: par tipo+id; opcional `prestacion_id` directa por acceso rápido).
    - `origen` (`interno`/`externo`), `fuente` (ej. `SIVEGAM`, `IPS`, `FrontOffice`).
    - `payload` JSON, `metadata` JSON.
    - `occurred_at`, `registrado_at`, `correlation_id`, `causation_id`, `idempotency_hash` (unique).
    - `ack_status` (pendiente/procesado/error), `ack_at`.
    - `sna_id?`.
  - Índices: por `tipo`, `(sujeto_tipo,sujeto_id)`, `occurred_at DESC`, `idempotency_hash UNIQUE`.
- `ExcepcionDeProceso` (EXP) → `excepciones_proceso`
  - Desviaciones esperadas del flujo con tratamiento normado (ej. pago retenido por cotizaciones).
  - Campos: `categoria` (catálogo EXP), `estado` (abierta/cerrada), `expediente_id?`/`prestacion_id?`, `descripcion`, `regla_asociada?` (ID RDN/PDN), `evidencia_url?`.
- `IncidenteDeDominio` (EXD) → `incidentes_dominio`
  - Inconsistencias e integridad (requiere intervención humana).
  - Campos: `tipo`, `severidad`, `estado` (ej. `Diagnostico`, `Planificado`, `Resuelto`, `Rechazado`), `impacto_estimado?`, `plan_accion?`, `verf_regla` (ej. `VERF-GOB-001`), `aprobado_por?`, `aprobado_at?`, `evidencia_url?`, `correlation_id?`.
  - Relaciones con `VERF` y anexos.
- `VerificacionHumana` (VERF) → `verificaciones_humanas`
  - Aprobaciones ligadas a EXP/EXD: `regla_verf_id` (ej. `VERF-GOB-001`), `estado`, `asignado_a`, `expira_at`, `resultado`, `notas`.

Catálogos (enums TS + constraints):

- Estados de `PrestacionEconomica`; Códigos de inactivación; Tipos de siniestro; Tipos de beneficiario de sobrevivencia.
- Validación VineJS en entradas conforme `03_Glosario_y_Catalogos.md`.

SNA y huella normativa mínima:

- `SnapshotNormativoAplicado` (SNA) → `snapshots_normativos`
  - Campos: `marco_id` (ej. `MN-2022-PGU-SEP`), `version_parametros`, `version_directiva`, `fecha_resolucion`.
  - FK de `eventos_negocio` y de entidades de cálculo a `sna_id` donde aplique.

Eventos de aplicación (opcional observabilidad):

- `AppEventLog` → `app_event_log`
  - `name`, `level`, `payload` JSON, `occurred_at`, `correlation_id`.
  - Sin FKs al dominio salvo `correlation_id`.

## Fase 2 — Acuerdos, liquidaciones y cálculos

Entregables:

- Modelos: `AcuerdoDePago`, `MetodoDePago`, `ConfiguracionDescuento`, `LiquidacionDePago`, `ConceptoLiquidacion`, `AjusteManualLiquidacion`, `Deuda`.
- Constraints e índices:
  - `acuerdos_de_pago`: unicidad de vigencia activa por `prestacion_id` y `tipo_acuerdo` con `prioridad`.
  - `conceptos_liquidacion`: FK a `liquidaciones_de_pago`; índice por `codigo_concepto`, `tipo`.
- SNA: cada `liquidaciones_de_pago` referencia `sna_id`.
- Seeders de conceptos base (CCL) desde `03_Glosario_y_Catalogos.md`.
- E2E inicial: `PAGO-EVP-001` (ciclo mensual) simplificado y `PAGO-EVD-001` (CCAF) esqueleto.

## Fase 3 — Trámite, expediente y comunicaciones

Entregables:

- `ExpedienteDeTramite`, `Tramite`, `DocumentoAdjunto`, `GestionDeContacto`, `ResolucionRegulador`, `InformeRegulatorio`, `ReembolsoAEmpleador`.
- Reglas `COMM-*` conectadas a `EventoNegocio`.
- Índices: `expedientes.cun UNIQUE`, búsquedas por `estado`, `organismo`.

## Fase 4 — Cálculo y contabilidad complementaria

Entregables:

- `CalculoSueldoBase`, `ComprobanteContable`, `CapitalRepresentativo`.
- Integridad: hash de cálculo para idempotencia; FK a `sna_id`.
- E2E mapping: `PAGO-EVP-005`, `RELQ-*`.

## Fase 5 — Marco normativo persistente (opcional)

Si se decide pasar de archivos/config a DB:

- `MarcoNormativo`, `ParametrosNormativos`, `DirectivaDeEjecucion` (SemVer) + tablas de vigencia.
- Resolver lee de DB con cache y valida solapes.
- Publicación y auditoría (VERF para activar marcos).

## Plantilla de especificación por entidad

Para cada modelo, usar esta ficha:

- Nombre/Propósito
- Tabla
- Atributos (nombre, tipo TS y tipo DB, nullability, default, catálogo)
- Relaciones (belongsTo/hasMany/manyToMany; pivots)
- Índices y constraints (UNIQUE, CHECK, FKs, ON DELETE)
- Campos de auditoría (`correlation_id`, `causation_id`, `sna_id`)
- Eventos de negocio que crea/afecta
- Validaciones (VineJS)
- Factories/seeders
- Cobertura de escenarios (IDs en `09_Escenarios_de_Verificacion.md`)

## Especificaciones breves prioritarias

- `eventos_negocio`:
  - `id`, `tipo`, `sujeto_tipo`, `sujeto_id`, `prestacion_id?`, `origen`, `fuente?`, `payload` JSON, `metadata` JSON?, `occurred_at`, `registrado_at`, `correlation_id?`, `causation_id?`, `idempotency_hash`, `ack_status`, `ack_at?`, `sna_id?`, `created_at/updated_at`.
  - UNIQUE (`idempotency_hash`); INDEX (`tipo`); INDEX (`sujeto_tipo`,`sujeto_id`); INDEX (`occurred_at DESC`).
- `incidentes_dominio`:
  - `id`, `tipo`, `severidad`, `estado`, `expediente_id?`, `prestacion_id?`, `descripcion`, `impacto_estimado?`, `plan_accion?`, `verf_regla`, `aprobado_por?`, `aprobado_at?`, `evidencia_url?`, `correlation_id?`, `created_at/updated_at`.
  - Índices: `estado`, `severidad`, `(prestacion_id, estado)`.
- `excepciones_proceso`:
  - `id`, `categoria`, `estado`, `expediente_id?`, `prestacion_id?`, `descripcion`, `regla_asociada?`, `evidencia_url?`, `created_at/updated_at`.
  - Índices: `estado`, `categoria`.
- `snapshots_normativos`:
  - `id`, `marco_id`, `version_parametros`, `version_directiva`, `fecha_resolucion`, `created_at/updated_at`.

## Backlog y hitos

- **Hito 1 (1–2 semanas)**:
  - Catálogos/enums TS y constraints.
  - Modelos/migraciones: `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `EventoNegocio`, `ExcepcionDeProceso`, `IncidenteDeDominio`, `VerificacionHumana`, `SnapshotNormativoAplicado`.
  - Factories mínimas; seed catálogo CCL básico.
  - Test funcional de CRUD y FK; E2E simple de registro EVT con `correlation_id` y `idempotency_hash`.
- **Hito 2 (2–3 semanas)**:
  - Acuerdos y liquidaciones; CCL sembrado; primera liquidación con SNA.
  - E2E `PAGO-EVP-001` básico y `PAGO-EVD-001`.
- **Hito 3 (2 semanas)**:
  - Trámite/Expediente/Comunicaciones; `COMM-OTG-005` conectado a EVT.
  - E2E `CESE-EVP-002` y `OTG-EVP-005`.
- **Hito 4 (2 semanas)**:
  - Cálculo/contabilidad; reportería base.
  - E2E `RELQ-EVP-001` con marcos desde config (o DB si se activa Fase 5).
- **Hito 5 (opcional)**:
  - Persistencia de marcos normativos; UI/flows de publicación con VERF.

## Gobernanza y calidad

- Validaciones VineJS en endpoints de creación EVT/EXD/EXP.
- Registros con `idempotency_hash` para evitar duplicados de EVT externos.
- Auditoría: `ExecutionLogger` con `correlation_id` por transacción/escenario.
- CI: migraciones limpias + tests E2E por lote.


