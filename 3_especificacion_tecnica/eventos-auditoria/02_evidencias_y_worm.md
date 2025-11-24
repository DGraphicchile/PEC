# 02. Evidencias de Proceso y Custodia WORM (versión sencilla)

## 1. Objetivo y alcance
- Objetivo: definir el diseño mínimo para conservar evidencias de procesos (por ejemplo, pago masivo) y los archivos fuente recibidos de terceros con propiedades tipo WORM (Write Once, Read Many).
- Alcance inicial: ingesta de CSV/XLSX para integraciones (IPS, PREVIRED, Banco, Registro Civil, CCAF), evidencias de publicación/envío y conciliaciones. Extensible a otros procesos.
- No-requisitos (versión sencilla): sin event store, sin snapshots por línea del batch, sin repositorio WORM certificado (se usa almacenamiento inmutable lógico).

## 2. Requerimientos (resumen)
- Evidencia mínima por envío/batch y por línea: totales, hashes, inclusión/exclusión y motivo, confirmaciones del externo.
- Custodia de archivos fuente: hash (SHA-256), sello de tiempo de recepción, proveedor, período, ubicación de almacenamiento; sin sobrescritura ni borrado.
- Dedupe por contenido: evitar duplicados si el archivo ya existe (mismo hash).
- Retención y legal hold lógicos: impedir eliminación hasta fecha de retención o fin de bloqueo legal.

## 3. Modelo de datos (mínimo)
- worm_files (custodia de archivos fuente): id, sha256 (único), original_name, mime_type, size_bytes, storage_key, provider, period, received_at, retention_until?, legal_hold (bool), meta (json), created_at, updated_at.
- integration_ingests (ingestas que referencian un archivo WORM): id, worm_file_id (FK), integration_type, batch_id?, notes?, parse_summary (json), created_at, updated_at.

Notas:
- storage_key usa direccionamiento por contenido para impedir sobrescritura (por ejemplo: storage/worm/aa/bb/<sha256>.<ext>).
- parse_summary registra filas leídas, válidas, inválidas y validaciones aplicadas.

## 4. API/contratos (borrador)
- Subida (solo ingesta):
  - POST /uploads/worm
    - Form-data: file (csv/xlsx), provider (IPS, PREVIRED, etc.), period (AAAAMM), integration_type (catálogo), retention_days?
    - Respuesta 201: { id, sha256, storageKey, provider, period, receivedAt }.
- Metadatos de archivo:
  - GET /worm-files/:id (metadatos; sin descarga por defecto).
- Seguridad: control por rol; PII no se expone en metadatos; descargas restringidas.

## 5. Flujo de ingesta y custodia (resumen)
1) Recepción del archivo (HTTP o proceso interno).
2) Cálculo de sha256 y metadatos (proveedor, período, tamaño, mime, fecha).
3) Dedupe por hash: si existe, se reutiliza el registro y se descarta el temporal.
4) Persistencia inmutable: copiar a storage_key y aplicar permisos de solo lectura (0444) o backend inmutable.
5) Registro en worm_files y creación de integration_ingests con parse_summary tras el parseo.
6) Retención y legal hold: impedir eliminación hasta cumplir condiciones.

## 6. Validaciones mínimas
- Tipo/extension permitida: csv/xlsx.
- Tamaño máximo por integración (configurable).
- Periodicidad/consistencia: period esperado según la integración.
- Checksums: guardar sha256; si el proveedor entrega hash propio, registrarlo en meta.

## 7. Seguridad y PII
- No almacenar números de cuenta ni PII sensible en metadatos de WORM.
- account_fingerprint se calcula en la capa de pagos, no en WORM.
- Cifrado en reposo (disco o backend); control de acceso por rol; auditoría de accesos.

## 8. Operación y monitoreo
- Job de verificación (opcional): recalcular sha256 al muestrear archivos.
- Alertas por fallos de ingesta, duplicados inesperados o retención vencida con intentos de borrado.
- Métricas: número de ingestas por integración/mes, rechazos de parseo, tiempos de proceso.

## 9. Escalamiento a WORM fuerte
- Backend S3/Azure con Object Lock (Compliance/Retention) y políticas por bucket.
- Sellos de tiempo confiables (timestamping) y políticas de destrucción regulada.
- Cadena de custodia completa (firmas, logs inmutables).

## 10. Referencias
- ADR-006: Idempotencia e integridad en integraciones.
- ADR-007: Evidencias y trazabilidad para auditoría.
- Especificación de ingesta: tech/especificacion/integraciones/ingesta_archivos.md.
