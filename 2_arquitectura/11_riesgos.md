# 11. Riesgos y Deuda Técnica

- Cambios normativos no anticipados
  - Prob/Impacto: Medio/Alto
  - Mitigación: `MarcoNormativo` + matrices de vigencia; ADRs; pruebas de regresión y plan de activación/rollback.
- Reliquidaciones extensas fuera de ventana operativa
  - Prob/Impacto: Bajo/Medio
  - Mitigación: particionado por tiempo, jobs reanudables, priorización y límites.
- Integraciones externas no idempotentes o con rechazos masivos
  - Prob/Impacto: Medio/Medio
  - Mitigación: outbox, claves de idempotencia, reconciliación, DLQ y replays controlados.
- Crecimiento de tablas (eventos, logs)
  - Prob/Impacto: Medio/Medio
  - Mitigación: particionado/archivado; índices; TTL lógico y agregados para lectura.
- Fuga de PII en eventos/payloads
  - Prob/Impacto: Bajo/Alto
  - Mitigación: scrubbing, cifrado, revisiones de seguridad, acceso mínimo.
- Divergencias entre CCL y reglas implementadas
  - Prob/Impacto: Bajo/Medio
  - Mitigación: gobierno del catálogo, validaciones de consistencia y pruebas EV.
