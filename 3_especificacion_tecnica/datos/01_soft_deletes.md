# FAQ Soft Deletes (Guía general para el proyecto)

## Propósito

Definir criterios coherentes para aplicar soft delete, inmutabilidad, estados/vigencias y/o purga/archivado, alineados con trazabilidad normativa (SNA), auditoría y PII.

---

## Preguntas frecuentes y propuestas de respuesta

### Metas y normativa
- **¿Objetivo principal del soft delete?**
  - Preservar trazabilidad y permitir recuperación operativa de registros no transaccionales, sin comprometer evidencia regulatoria. Correcciones se hacen por adición (eventos/ajustes), no por borrado.
- **¿Requisitos regulatorios que impidan borrar?**
  - Sí: liquidaciones, comprobantes, informes regulatorios, eventos de negocio y artefactos contables son inmutables. Solo se anulan/revierten con contrapartida auditable.
- **¿Derecho al olvido/anonimización PII?**
  - Aplica bajo solicitud legal y/o vencimiento de retención. Política: soft delete inmediato + anonimización selectiva tras 365 días o al cierre legal del caso; conservar claves técnicas para trazabilidad.

### Alcance por entidad (criterios)
- **Inmutables (nunca delete):** artefactos financieros/regulatorios y eventos de negocio.
- **Soft delete reversible:** adjuntos, configuraciones, métodos de pago, gestiones operativas.
- **Estado/vigencia en vez de delete:** prestaciones, acuerdos, trámites, afiliaciones.
- **Hard delete:** solo staging/tmp sin valor histórico, o duplicados no referenciados, con salvaguardas.

### Comportamiento y gobernanza
- **¿Quién puede eliminar/restaurar?**
  - Operador de módulo con permisos; restaurar requiere rol superior o VERF cuando la entidad sea sensible.
- **¿Motivo/causa y aprobación?**
  - Obligatorio `deleted_reason`, `deleted_by`; `approved_by` cuando la entidad sea crítica (bandera por tabla).
- **¿VERF obligatorio?**
  - Sí para `Persona/FichaPersona`, `MetodoDePago`, `AcuerdoDePago` (si tuvo efecto), entidades de gobernanza (EXD/EXP) y cualquier eliminación con impacto de negocio.

### Retención, restauración y ventanas
- **Ventana de restauración por defecto:** 180 días (operativas) / 365 días (PII y pagos).
- **Post-ventana:** anonimización y/o archivado frío; purga física solo para staging/tmp.
- **SLA de recuperación:** < 1 día hábil para restaurables.

### Integridad referencial
- **Política por defecto de FKs hacia soft-deleted:**
  - Restringir (no permitir soft delete si hay dependientes activos) para entidades núcleo.
  - Cascada lógica para dependientes no críticos (ej. `documentos_adjuntos`).
  - Nunca romper integridad con hard delete mientras existan FKs.

### Visibilidad y queries
- **Por defecto, excluir soft-deleted:** sí (scopes globales Lucid).
- **Inclusión opcional:** endpoints/reportes de auditoría con `withTrashed/onlyTrashed`.
- **Índice `deleted_at`:** recomendado en tablas grandes consultadas por auditoría.

### Auditoría y trazabilidad
- **Campos mínimos:** `deleted_at timestamptz (UTC)`, `deleted_by uuid`, `deleted_reason text`, `correlation_id uuid`.
- **Eventos al eliminar/restaurar:** emitir evento de aplicación; para entidades sensibles, crear también un `EventoNegocio` de gestión operativa.
- **Integridad:** para artefactos regulados, preferir reversas/ajustes con hash de integridad y `sna_id`.

### Rendimiento y costos
- **Crecimiento de tablas:** habilitar archivado/particionado por fecha en artefactos voluminosos (logs, eventos) y retención con TTL lógico.
- **Política de purga:** job mensual de anonimización/purga de staging; no purgar artefactos regulados.

### Privacidad y PII
- **`Persona`/`FichaPersona`:** soft delete + anonimización selectiva (nombre, email, teléfono, dirección) tras 365 días; conservar identificadores técnicos y claves foráneas. RUT: reemplazar por hash reversible solo si existe fundamento legal; preferible hash no reversible.
- **Catálogo de campos a anonimizar:** mantener en `config/privacy.ts` y ejecutar job programado.

### Diferenciación conceptual
- **Soft delete:** entidades operativas y configuraciones, con ventana de restauración.
- **Estado/vigencia:** entidades de ciclo de vida (no se eliminan; se cierran/cesan/concluyen).
- **Inmutables:** contables/regulatorias/eventos; solo ajustes por adición.

### Automatización y tooling
- **Estándar de columna:** añadir `deleted_at`, `deleted_by`, `deleted_reason` donde aplique; UTC.
- **Scopes en Lucid:** BaseModel con trait de soft delete (`defaultScope` excluye borrados; `withTrashed/onlyTrashed`).
- **Guardas de dominio:** Policies para bloquear acciones sobre registros soft-deleted; validaciones VineJS.

### Migración y rollback
- **Estrategia:** agregar columnas de soft delete por módulos (prioridad: modelos operativos); script de backfill con `deleted_at = null`.
- **Herramientas:** comando `node ace softdelete:restore --model X --id Y` con trazabilidad y VERF cuando aplique.

---

## Clasificación inicial por entidad

> Política: `inmutable` | `estado/vigencia` | `soft_delete` | `hard_delete (excepcional)`

| Entidad | Política | Ventana | Cascada/Restricción | Restaurable | Requiere VERF | Evento al eliminar | Notas |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Persona | soft_delete + anonimización | 365d | Restringir si hay dependencias | Sí | Sí | Sí | Anonimizar tras 365d |
| FichaPersona | soft_delete | 365d | Restringir | Sí | Sí | Sí | Puede anonimizar datos sensibles |
| PrestacionEconomica | estado/vigencia | N/A | N/A | N/A | Sí (para cambios de estado) | Sí (evento de estado) | Nunca borrar |
| HechoCausal | estado/vigencia | N/A | Restringir | N/A | Sí | Sí (evento correctivo) | Mantener trazabilidad SISESAT/CUN |
| AcuerdoDePago | estado/vigencia (soft_delete si nunca aplicado) | 180d | Restringir | Sí | Sí | Sí | Cerrar/expirar por vigencia |
| MetodoDePago | soft_delete | 365d | Sin cascada | Sí | Sí | Sí | Oculta datos; conservar huella |
| ConfiguracionDescuento | soft_delete | 180d | Sin cascada | Sí | Opcional | Sí | Reemplazar por nueva configuración |
| LiquidacionDePago | inmutable | N/A | N/A | N/A | N/A | No (no borrar) | Solo anulación con contrapartida |
| ConceptoLiquidacion | inmutable | N/A | N/A | N/A | N/A | No | Corrección vía nueva liquidación |
| ComprobanteContable | inmutable | N/A | N/A | N/A | N/A | No | Reversa contable |
| CapitalRepresentativo | inmutable | N/A | N/A | N/A | N/A | No | Recalcular genera nuevo registro (SNA) |
| CalculoSueldoBase | inmutable | N/A | N/A | N/A | N/A | No | Versionado/SNA |
| EventoNegocio | inmutable | N/A | N/A | N/A | N/A | No | Corrección por evento correctivo |
| ExpedienteDeTramite | estado/vigencia | N/A | Restringir | N/A | Sí | Sí (evento de cierre) | Cierre/auditoría |
| Tramite | estado/vigencia (soft_delete si sin uso) | 180d | Restringir | Sí | Opcional | Sí | Cancelación vs eliminación |
| DocumentoAdjunto | soft_delete | 180d | Cascada lógica desde expediente/trámite | Sí | Opcional | Sí | Purga/archivado opcional |
| GestionDeContacto | soft_delete | 180d | Sin cascada | Sí | Opcional | Sí | Log operativo |
| IncidenteDeDominio (EXD) | estado/vigencia | N/A | N/A | N/A | Sí | Sí (cambio de estado) | No borrar; cerrar |
| ExcepcionDeProceso (EXP) | estado/vigencia | N/A | N/A | N/A | Opcional | Sí (cambio de estado) | No borrar; cerrar |
| Deuda | estado/vigencia | N/A | Restringir | N/A | Sí | Sí (cambio de estado) | Ledger; no borrar |
| BeneficioPrevisionalExterno | estado/vigencia | N/A | Restringir | N/A | Opcional | Sí | Compatibilidades |
| CausanteAsignacionFamiliar | estado/vigencia | N/A | Restringir | N/A | Opcional | Sí | Inactivación por reglas CICLO |
| Empleador | soft_delete (si no referenciado) | 365d | Restringir | Sí | Opcional | Sí | Dedupe/merge policy |
| HistorialAfiliacion | inmutable | N/A | N/A | N/A | N/A | No | Cerrar periodos, no borrar |
| InformeRegulatorio | inmutable | N/A | N/A | N/A | N/A | No | Evidencia |
| ResolucionRegulador | inmutable | N/A | N/A | N/A | N/A | No | Evidencia |
| ReembolsoAEmpleador | inmutable | N/A | N/A | N/A | N/A | No | Evidencia |
| SnapshotNormativoAplicado (SNA) | inmutable | N/A | N/A | N/A | N/A | No | Referenciado por cálculos/liquidaciones |

---

## Estándar técnico recomendado

- Añadir columnas (`deleted_at`, `deleted_by`, `deleted_reason`) a tablas con política `soft_delete`.
- Implementar Trait/Mixin de soft delete en BaseModel (scopes: por defecto sin borrados; `withTrashed`, `onlyTrashed`).
- Policies para bloquear mutaciones sobre registros soft-deleted.
- Jobs programados: anonimización PII (mensual) y archivado frío si aplica.
- Emisión de eventos de aplicación al eliminar/restaurar; registrar `correlation_id`.
- Documentar excepciones por entidad en su ficha de modelo.

---

## Próximos pasos

- Validar clasificación con negocio/compliance.
- Generar migraciones incrementales para columnas de soft delete en el alcance definido (Fase 1–3 primero).
- Implementar el Trait de SoftDeletes y scopes globales en Lucid.
- Crear comandos Ace para restauración y reportes de auditoría.


