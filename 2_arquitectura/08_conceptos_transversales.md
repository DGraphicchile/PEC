# 8. Conceptos Transversales

- Modelo de datos y persistencia: entidades MDLO v1 (Anexo B), soft deletes, versionado de esquema, particionado → `3_especificacion_tecnica/datos/`
- Eventos y auditoría: CRUD + DomainEvents vía outbox; AppAudit/CDC; idempotencia y correlación → `3_especificacion_tecnica/eventos-auditoria/`
  - Evidencias de procesos y custodia WORM (simple) → `3_especificacion_tecnica/eventos-auditoria/02_evidencias_y_worm.md`
  - Contratos de eventos y publicador outbox → `3_especificacion_tecnica/eventos-auditoria/01_domain_events.md` y `3_especificacion_tecnica/eventos-auditoria/03_outbox_publicador.md`
- Normativa: `MarcoNormativo`, parámetros/directivas versionados, resolver y matrices → `3_especificacion_tecnica/normativa/`
- Observabilidad y operación: logs, métricas, dashboards, runbooks, manejo de DLQ → `3_especificacion_tecnica/operacion/`
  - Idempotencia (operación “solo-una-vez”) → `3_especificacion_tecnica/operacion/02_idempotencia.md`
- Seguridad: RBAC/Policies, secretos, cifrado, PII/scrubbing en eventos → `3_especificacion_tecnica/seguridad/`
- Integraciones: contratos, mapeos `MAP-*`, compatibilidad y validación de layouts → `3_especificacion_tecnica/integraciones/`
  - Ingesta de archivos CSV/XLSX → `3_especificacion_tecnica/integraciones/ingesta_archivos.md`
- Performance: índices, materialized views, SLO/SLI, capacidad y costos → `3_especificacion_tecnica/performance/`
