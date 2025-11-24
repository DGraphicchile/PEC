# DomainEvents — Especificación

Objetivo: publicar eventos de negocio que describan sucesos del dominio (no técnicos), útiles para integración, monitoreo y auditoría de alto nivel.

## Esquema y metadatos (contrato mínimo)
- Campos mínimos:
  - id (uuid)
  - type (catálogo controlado, ej. EVT-PRESTACION-ACTIVADA)
  - schema_version (SemVer del contrato)
  - occurred_at (timestamptz, UTC)
  - subject_type (PrestacionEconomica | FichaPersona | Expediente | ...)
  - subject_id (uuid)
  - correlation_id (uuid)
  - causation_id (uuid)
  - idempotency_hash (string, único por evento lógico)
  - marco_normativo_id (opcional si aplica)
  - payload (JSON; PII minimizada)
- Reglas:
  - Inmutables, append-only (canal EDA; no es fuente de verdad del estado).
  - PII: scrubbing/ofuscación; referencias por ID a datos sensibles.

## Contratos y versionado
- Esquemas versionados (e.g., type + schemaVersion).
- Compatibilidad backward en cambios minor; cambios major coordinados.
- Catálogo de tipos (ejemplos):
  - EVT-PRESTACION-ACTIVADA, EVT-PRESTACION-CESADA, EVT-LIQUIDACION-GENERADA
  - EVT-ACUERDO-CREADO, EVT-ACUERDO-CERRADO

## Publicación (outbox)
- Escritura atómica: persistir evento en `outbox_events` dentro de la misma transacción que el CRUD.
- Procesador asíncrono publica a broker/canal; reintentos con backoff y DLQ.
- Consumidores idempotentes: usan `idempotency_hash`.

## Gobernanza
- Validación de contratos antes de publicar (schema registry o validadores locales).
- Observabilidad: métricas por tipo, lag del outbox, DLQ size.
- Seguridad: control de acceso a tópicos y cifrado en tránsito.

## Referencias
- Outbox y publicador: `tech/especificacion/eventos-auditoria/03_outbox_publicador.md`
