# 4. Estrategia de Solución

Resumen de decisiones y enfoques que dan forma a la arquitectura (tecnología, descomposición, tácticas de calidad y decisiones organizativas), conforme a arc42.

- Tecnología base: TypeScript + AdonisJS 6, Lucid ORM, DB relacional.
- Decisión principal (ADR-002): CRUD como system-of-record + outbox/idempotencia para DomainEvents + auditoría técnica (AppAudit) o CDC. Sin replays deterministas.
- Tácticas de calidad: referencia al `MarcoNormativo` en registros/eventos; materialized views; validaciones contractuales de eventos; matrices de versión para marcos/directivas.
- Descomposición: datos/eventos, integraciones, seguridad, operación.
- Organización: ADRs para decisiones clave; especificación modular por vistas y vínculo a MDLO v1.

## 4.1 Trade-offs y alternativas

- CRUD + DomainEvents + AppAudit/CDC (elegida)
  - Beneficios: simplicidad operativa; auditabilidad clara; integración por eventos.
  - Riesgos: orden/correlación CRUD↔eventos; gobierno de esquemas.
  - Mitigaciones: outbox, claves de idempotencia, `correlation_id/causation_id`, validación de contratos.

- ES + proyecciones (alternativa)
  - Requisitos: replays deterministas, auditoría como fuente canónica.
  - Beneficios: historia/intención completas; simulaciones; reliquidaciones por tramo.
  - Costos: complejidad operativa y almacenamiento.

- CDC/bitemporalidad (alternativa)
  - Beneficios: historia de cambios sin tocar app.
  - Costos: captura “qué” más que “por qué”; replays de lógica no exactos.

## 4.2 Decisiones registradas
- ADRs: ver `2_arquitectura/09_decisiones_arquitectonicas.md` y `2_arquitectura/adrs/adr_*.md`.

Referencia: https://r.jina.ai/arc42.org/overview

## 4.3 Criterios de activación ES/CDC por módulo

- Baseline: CRUD como system-of-record + DomainEvents vía outbox + AppAudit/CDC técnico. Sólo activar alternativas si los criterios y el puntaje lo justifican.

- Checklist (Sí/No):
  - ¿Se requiere replay determinista de la lógica (simulaciones exactas, auditoría de intención)?
  - ¿Se requieren consultas bitemporales operativas (time-travel) más allá de auditoría?
  - ¿Predomina auditoría de intención (por qué) sobre auditoría de dato (qué cambió)?
  - ¿Volumen de eventos muy alto (≥5M/día) y retenciones prolongadas en bus?
  - ¿Latencia estricta en camino crítico (<50 ms) de lectura/escritura?
  - ¿Necesidad de feeds incrementales a DWH/lake sin tocar la app?
  - ¿Capacidad operativa del equipo para operar brokers/connectors/ES?

- Matriz de puntuación (0–2 por criterio, síntesis):
  - ES: +2 si se requiere replay determinista; +2 si predomina intención; +1 si b/temporalidad; −1 si latencia <50 ms es crítica.
  - CDC: +2 si se requiere feed incremental/bitemporalidad; +1 si volumen muy alto; −1 si latencia <50 ms es crítica.
  - Baseline: +2 si latencia <50 ms es crítica; +2 si tolerancia operativa baja.

- Regla de activación:
  - Elegir ES si su puntaje ≥6 y supera claramente a Baseline/CDC.
  - Elegir CDC si su puntaje ≥6 y no se requieren replays de lógica.
  - Mantener Baseline cuando ninguna alternativa supera el umbral o cuando latencia/simplicidad penalizan alternativas.

- Procedimiento por módulo:
  1) Completar checklist y tabla de puntaje con evidencias (volúmenes, SLO/SLI).
  2) Registrar ADR del módulo con decisión, pros/contras, SLO/SLI y runbooks.
  3) Ejecutar PoC (1–2 semanas) y medir p95/p99, lag, duplicados, costo operativo.
  4) Criterio de salida: si la PoC no cumple SLO/SLI, revertir a Baseline.
  5) Observabilidad: dashboards de lag/throughput/duplicados/errores; alarmas.
  6) Rollout/rollback: plan de migración de lecturas/proyecciones y reversibilidad.

Referencias: ADR-002 (baseline), ADR-014 (criterios ES/CDC), ADR-015 (CDC para reportería).

## 4.4 Aplicación inicial en PEC (guía)

- Pago masivo (PAG): Baseline. ES penaliza latencia/operación; CDC opcional sólo para reportería (fuera del camino crítico).
- Reportería (REP): CDC aceptado para feeds incrementales hacia almacenes de lectura/analítica; SoR permanece en CRUD.
- Otorgamiento (OTG) y Mantenimiento (MANT): Baseline. ES sólo si se exige simulación de intención con replays verificables (no requerido hoy).
- Integraciones (Bancos/PREVIRED): Baseline + Outbox. CDC no aplica en el camino crítico de publicación/conciliación.
- Analítica histórica/bitemporal: CDC dedicado y aislado del SoR.

Notas:
- SLO/SLI específicos de lag/throughput/latencia se catalogarán en `3_especificacion_tecnica/performance/03_slo_sli_capacidad.md`.
- Esquemas y políticas de PII para ES/CDC se referencian desde `3_especificacion_tecnica/eventos-auditoria/*`.
