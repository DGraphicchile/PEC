# ADR-000: Adopción de ADRs (Documenting Architecture Decisions, Nygard)

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- Es necesario registrar decisiones arquitectónicas significativas de forma ágil, modular y trazable a lo largo del proyecto.
- Los documentos largos tienden a desactualizarse; se prefieren piezas pequeñas y mantenibles.

## Decisión
- Adoptar el formato de Architecture Decision Records (ADRs) según Michael Nygard para documentar decisiones arquitectónicas.
- Mantener los ADRs en el repositorio bajo `2_arquitectura/adrs/adr-NNN_<slug>.md` (Markdown), numerados secuencial y monótonamente (NNN).
- Estructura mínima por ADR: Título, Contexto (fuerzas), Decisión, Estado, Consecuencias. Opcional: Alternativas, Historial de estado.
- Si una decisión es reemplazada, marcar el ADR como “Superseded by ADR-XXX” y conservar el histórico.

## Alcance
- Aplica a decisiones que afecten estructura, características no funcionales, dependencias, interfaces o técnicas de construcción.
- Los ADRs se enlazan desde arc42 (sección 9) y desde secciones afectadas en `3_especificacion_tecnica/*`.

## Consecuencias
- (+) Trazabilidad de motivaciones y efectos; facilita onboarding y revisiones futuras.
- (+) Evita aceptación o reversión “a ciegas” de decisiones pasadas.
- (–) Requiere disciplina para mantener estado y enlaces al día.

## Historial de estado
- 2025-08-09: Proposed → Accepted (Javier Errazuriz)

## Referencias
- Michael Nygard, “Documenting Architecture Decisions”: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
