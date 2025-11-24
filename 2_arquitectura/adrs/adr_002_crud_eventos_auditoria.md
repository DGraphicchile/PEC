# ADR-002: CRUD + eventos + auditoría (sin replays deterministas)

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- No se requiere replay determinista del estado. Se exige auditabilidad, trazabilidad de decisiones y capacidad de integración por eventos.
- Fuerzas (drivers):
  - Mantener simplicidad operativa (evitar complejidad de event stores y proyecciones).
  - Asegurar idempotencia y correlación en integraciones.
  - Conservar reproducibilidad normativa a nivel de registro/evento (referencia al `MarcoNormativo`) sin necesidad de replays.

## Decisión
- Adoptar CRUD como system-of-record.
- Publicar DomainEvents mediante outbox con idempotencia.
- Implementar auditoría técnica (AppAudit) y/o CDC para cambios de datos.
- Referenciar el `MarcoNormativo` en registros/eventos, sin fijarlo por-evento para replays deterministas.

## Alternativas consideradas
- ES + proyecciones como fuente canónica.
- CDC/bitemporalidad sin eventos de negocio.
- Command-sourcing.

## Consecuencias
- (+) Simplicidad operativa; auditabilidad clara; integración por eventos.
- (–) Esfuerzo en correlación y gobierno de esquemas de eventos; sin replays deterministas.

## Acciones
- Especificar contratos de DomainEvents y AppAudit/CDC (`3_especificacion_tecnica/eventos-auditoria/*`).
- Documentar publicador Outbox y operar con idempotencia (`3_especificacion_tecnica/eventos-auditoria/03_outbox_publicador.md`).
- Implementar outbox + claves de idempotencia.
- Actualizar documentación arc42 (hecho) y MDLO donde corresponda.

## Historial de estado
- 2025-08-09: Proposed → Accepted (Javier Errazuriz)

## Referencias
- ADR-000: Adopción de ADRs (Nygard): `2_arquitectura/adrs/adr_000_adoptar_adr_nygard.md`
- Documenting Architecture Decisions (Michael Nygard): https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- Especificación de Eventos y Auditoría: `3_especificacion_tecnica/eventos-auditoria/`
