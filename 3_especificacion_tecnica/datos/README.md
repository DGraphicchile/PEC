# Especificación técnica — Datos

Alcance: modelo de datos, políticas de persistencia, versionado de esquema, privacidad/PII, archivado y particionado. Se integra con eventos de negocio (DomainEvents) y auditoría (AppAudit/CDC) y con vistas/materialized views para performance.

## Contenidos
- 01_soft_deletes.md: Política general y por entidad; scopes, restauración, VERF, eventos al eliminar/restaurar.
- 02_versionado_esquema.md: Estrategia de evolución (SemVer, SCD, migraciones backward-compatible). [Pendiente]
- 03_archivado_particionado.md: Archivado, particionamiento temporal y TTL lógico. [Pendiente]
- 04_privacidad_pii.md: Catálogo PII, anonimización, ventanas de retención y excepciones legales. [Pendiente]

## Relación
- Eventos y auditoría: ver ../eventos-auditoria/
