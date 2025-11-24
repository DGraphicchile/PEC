### Requerimientos expresados por el experto (resumen)
- Explicación para reclamos: mostrar los puntos/pasos de cálculo de forma sencilla para que el asistente pueda explicárselos al pensionado (otorgamiento, sueldo base, liquidación mensual). Distinguir si el problema fue por datos de origen capturados o por aplicación de reglas/algoritmos.
- Evidencia de datos de origen: poder verificar qué información llegó desde otras entidades (planillas/archivos), cuándo y cómo se usó en el cálculo.
- Trazabilidad de cambios: ver quién hizo qué cambio (datos de beneficiario, haberes/descuentos, etc.), cuándo y con qué motivo, para investigar errores y casos.
- Alcance práctico: responder rápidamente ante reclamos de usuarios, con información legible, exportable y suficiente para cerrar el caso.

### Tabla de niveles propuestos (bajo → máximo)
| Dominio | Requerimiento bajo y sencillo | Requerimiento intermedio | Requerimiento máximo/estándar |
| --- | --- | --- | --- |
| Explicación del cálculo | Resumen “por qué/por cuánto” del resultado, con causa principal; sin detallar pasos ni normativa. | Pasos clave con valores intermedios principales y nombre de la regla aplicada; texto explicativo legible. | Trazado paso a paso con todas las entradas/salidas, referencia a regla y artículo normativo, versiones vigentes; explicación en lenguaje natural para el reclamo. |
| Evidencia de datos de origen | Confirmación de fecha/proveedor del archivo usado y campos mínimos aplicados; sin mostrar archivo completo. | Vista de registros relevantes del archivo con checksum y comparación “recibido vs usado”; enlace al repositorio; PII acotada. | Conservación WORM del archivo completo, metadatos firmados, rastro línea a línea y validaciones realizadas; cadena de custodia completa. |
| Alcance temporal | 2 años de historia accesible en línea; más antiguo solo bajo solicitud. | 5 años en línea; histórico adicional en archivo; reimpresión de explicaciones de casos. | 6–10 años en línea (según regulación) + archivo indefinido; reproducibilidad bit a bit del cálculo con marco/regla versionados y SLA de respuesta. |
| Trazabilidad de cambios | Registro de quién/cuándo para cambios críticos (beneficiario, método de pago); comentario opcional. | Quién/cuándo/antes→después y motivo obligatorio para datos sensibles (incluye ajustes de liquidación); aprobación simple en acciones sensibles. | Auditoría completa de operaciones clave, motivos categorizados, aprobaciones (VERF) multi-rol para acciones críticas; reportes de investigación y alertas. |
| Operación y acceso | Búsqueda por beneficiario y período; acceso para equipo de atención; exportable PDF simple. | Consultas por caso/período/estado; panel con filtros; exportables PDF/Excel; control de acceso por rol. | Portal de auditoría con drill-down y APIs; segregación de funciones, registros de acceso, flujos de aprobación y retención legal; vistas dedicadas para auditoría/regulador. |

### Ejemplos de informes por nivel

#### Nivel bajo (sencillo)
- Informe de reclamo (ejemplo)
  - Beneficiario: 12.345.678-9 | Período: 2025-07 | Caso: CUN-2025-00123
  - Resultado consultado: Pensión líquida $245.800 (motivo principal: descuento salud 7%)
  - Resumen explicativo: “Se aplicó el descuento legal de salud (7%), no se registran retenciones ni deudas para el período.”
  - Fuente de datos de origen: “Archivo PREVIRED de julio 2025 recibido el 2025-07-10, datos aplicados: tasa 7%.”
  - Envío a banco: “Incluido en nómina del 2025-07-26. Confirmación recibida.”
  - Adjuntos: PDF resumen de liquidación.

- Informe de investigación de error (ejemplo)
  - Solicitud: “Monto líquido distinto al esperado en julio 2025.”
  - Revisión: liquidación del período; datos de salud (tasa 7%); método de pago vigente.
  - Hallazgo: cálculo correcto según parámetros; sin incidencias de datos.
  - Acción: se entrega explicación y documento de respaldo al beneficiario.
  - Cierre: reclamo resuelto sin corrección.

#### Nivel intermedio
- Informe de reclamo (ejemplo)
  - Beneficiario: 12.345.678-9 | Período: 2025-07 | Caso: CUN-2025-00123
  - Detalle de cálculo (pasos clave):
    - Base imponible: $300.000 (CALC-PIM)
    - Descuento salud 7%: $21.000 (REG. salud)
    - Neto a pagar: $279.000 → Retención judicial: $33.200 (acuerdo vigente)
    - Líquido: $245.800
  - Datos de origen: PREVIRED (recibido 2025-07-10, checksum ABC...), “recibido vs usado” consistente.
  - Cambios recientes: sin cambios de datos del beneficiario ni acuerdos en el período.
  - Envío a banco: archivo 2025-07-26 (hash DEF...), aceptado; totales enviados/aceptados coinciden.
  - Adjuntos: PDF detalle de pasos, extracto del archivo de origen (campos relevantes), comprobante de envío.

- Informe de investigación de error (ejemplo)
  - Hipótesis: “Error en aplicación de retención judicial.”
  - Evidencias:
    - Acuerdo de pago tipo RETENCION_JUDICIAL activo desde 2025-06-01.
    - Antes→Después: sin cambios de porcentaje en 2025-07.
    - Archivo fuente comprobado (checksum, registro del beneficiario).
  - Conclusión: retención aplicada correctamente; monto coincide con porcentaje pactado.
  - Acción: comunicación con explicación y tablas; sin correcciones.
  - Seguimiento: cerrar caso; registrar lección si aplica.

#### Nivel máximo/estándar
- Informe de reclamo (ejemplo)
  - Identificación del caso: CUN-2025-00123 | Beneficiario: 12.345.678-9 | Período: 2025-07
  - Trazado de cálculo paso a paso:
    - Entradas: rentas, cargas, acuerdos activos; versiones aplicadas: Marco MN-2025-REFORMA-LEY (params v1.1.1, logic v2.1.0)
    - Reglas: CALC-PIM-00X, CALC-PLI-001/002/007, referencias normativas (artículos)
    - Valores intermedios y finales con justificación por regla
  - Datos de origen y custodia:
    - Archivos fuente conservados WORM (hash SHA-256, sello de tiempo, proveedor)
    - Rastro línea a línea y validaciones realizadas
  - Trazabilidad operativa:
    - Cambios auditados (quién/cuándo/antes→después/motivo), aprobaciones VERF si aplican
    - Envío a banco: archivo (hash), confirmación (hash), conciliación OK
  - Adjuntos: reporte técnico y versión legible para el beneficiario.

- Informe de investigación de error (ejemplo)
  - Planteamiento: “Diferencia detectada en julio 2025.”
  - Línea de tiempo y cadena de custodia: recepción de insumos, ejecuciones, aprobaciones.
  - Análisis:
    - Reproducción bit a bit del cálculo con mismo marco/versión
    - Comparativa de entradas/salidas; evaluación de cambios operados y eventos
    - Revisión de integraciones y conciliaciones (banco/PREVIRED)
  - Causa raíz (5 porqués) y clasificación (datos/regla/proceso/humano/sistema)
  - Acciones correctivas y preventivas (CAPA), responsables y fechas
  - Cierre: evidencia de corrección o descarte; comunicación a interesados.

---

## Idempotencia: guía de implementación en AdonisJS 6

### Propósito y relación con WORM
- Idempotencia asegura que una operación tenga efecto una sola vez aunque se reintente (reenvíos, reprocesos).
- WORM conserva evidencia inmutable de “qué se recibió/envió”; no evita efectos duplicados.
- Se complementan: WORM = custodia; Idempotencia = control operativo “solo-una-vez”.

### Dónde aplicarla (casos de uso)
- Salidas a banco (CSV/Excel), PREVIRED, SAP: archivos y líneas no deben duplicar efectos.
- Ingesta de archivos externos: evitar reparsear/elaborar el mismo archivo.
- Generación de batch/nómina: no generar dos nóminas idénticas para el mismo período y filtro.
- Reintentos de publicación: mismo archivo reintentado no debe duplicar.
- Jobs programados: evitar dobles ejecuciones por ventana.
- APIs mutantes internas: asegurar que “crear/aplicar” no duplique ante reintentos del cliente.
- Eventos/outbox/colas: consumidores no deben repetir efectos ante reentregas.

### Recetas concretas (AdonisJS 6)
- HTTP (acciones sensibles)
  - Header `Idempotency-Key`.
  - Tabla `idempotent_requests(idempotency_key unique, status, response_hash, payload_hash, created_at)`.
  - Primer request: ejecutar en transacción, persistir resultado; siguientes: devolver mismo resultado si `payload_hash` coincide.

- Ingesta de archivos (CSV/XLSX)
  - Clave natural: `sha256` del archivo.
  - Índice único `worm_files.sha256`; si existe, reutilizar registro y no reparsear.
  - Ver especificación WORM: `tech/especificacion/eventos-auditoria/02_evidencias_y_worm.md`.

- Generación de nóminas/batches (pago, PREVIRED, SAP)
  - `dataset_hash` (hash de IDs de liquidaciones incluidas) + (`periodo`, `tipo`) con índice único en `payment_runs`.
  - Upsert: `onConflict(['periodo','tipo','dataset_hash']).merge()` para reusar el mismo run.

- Publicación/reintentos (archivos a externos)
  - Clave archivo: `idempotency_key = SHA256(<tipo>|<periodo>|<file_hash_normalizado>)` única en `publication_attempts`.
  - Guardar `file_hash` y `ack_hash` para conciliación.

- Línea de pago (opcional, granular)
  - `line_hash = SHA256(<beneficiario>|<prestacion>|<periodo>|<monto>|<run_id>)` con índice único en `payment_run_items`.

- Jobs programados
  - `job_locks(name, scope, period)` con índice único; adquirir lock con insert en transacción.

- Eventos/outbox/colas
  - `processed_events(idempotency_key unique, processed_at)`; verificar antes de aplicar efectos; registrar al final de la transacción.

- Reliquidaciones/reprocesos
  - Índice único compuesto `(caso, rango_periodo, marco_version, motivo)` en `reliquidations` para no repetir.

### Claves sugeridas (resumen)
- Archivo externo: `<tipo>|<periodo>|<file_hash>`.
- Batch: `<periodo>|<tipo_nomina>|<dataset_hash>`.
- Línea: `<beneficiario>|<prestacion>|<periodo>|<monto>|<run_id>`.
- Ingesta: `sha256` del archivo.
- HTTP: Header `Idempotency-Key` + `payload_hash`.

### Primitivas de soporte (AdonisJS)
- Índices únicos en migraciones; transacciones (`Database.transaction`).
- Upserts (`onConflict().merge()`), hashing (crypto) para `dataset_hash`/`file_hash`.
- Middlewares para leer `Idempotency-Key` y estandarizar manejo.

### Referencias
- ADR-006: Idempotencia e integridad en integraciones.
- ADR-007: Evidencias y trazabilidad (WORM y evidencia mínima).
- Especificación de WORM: `tech/especificacion/eventos-auditoria/02_evidencias_y_worm.md`.
- Ingesta: `tech/especificacion/integraciones/ingesta_archivos.md`.