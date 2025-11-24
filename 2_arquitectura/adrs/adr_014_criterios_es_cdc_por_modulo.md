# ADR-014: Criterios de activación ES/CDC por módulo

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

ADR-002 fija el baseline: CRUD como system-of-record + DomainEvents vía outbox + AppAudit/CDC técnico. Existen casos donde Event Sourcing (ES) o Change Data Capture (CDC) podrían aportar ventajas (replays de lógica, bitemporalidad de consulta, feeds analíticos). Faltaba un marco objetivo para activar estas alternativas por módulo, evitando drift arquitectónico.

## Decisión

Adoptar un marco de decisión por módulo basado en checklist, matriz de puntuación y umbrales, con PoC obligatoria y observabilidad mínima. Este marco determina cuándo activar ES o CDC en lugar del baseline.

## Criterios

- Checklist (Sí/No): replay determinista; consultas bitemporales operativas; predominio de auditoría de intención; volumen muy alto (≥5M eventos/día); latencia estricta <50 ms; feeds incrementales a DWH; capacidad operativa.
- Puntuación (0–2 por criterio) y regla:
  - ES si puntuación ≥6 y supera claramente a Baseline/CDC.
  - CDC si puntuación ≥6 y no se requieren replays de lógica.
  - Baseline en el resto o si latencia/simplicidad penalizan alternativas.

## Consecuencias

- (+) Decisiones consistentes y trazables; reducción de complejidad innecesaria; mejor alineación con SLO/SLI.
- (–) Esfuerzo adicional en PoC/observabilidad y en mantener ADRs por módulo.

## Procedimiento

1) Completar checklist con evidencias (volúmenes, SLO/SLI).
2) Registrar ADR del módulo con scoring, pros/contras, runbooks.
3) Ejecutar PoC (1–2 semanas) y medir p95/p99, lag, duplicados, costos.
4) Si no cumple SLO/SLI, revertir a baseline.
5) Activar dashboards y alarmas mínimos.

## Aplicación inicial

- PAG: Baseline; CDC para reportería (fuera del camino crítico).
- REP: CDC para feeds a almacenes de lectura/analítica.
- OTG/MANT: Baseline; ES sólo si se exige simulación de intención (no requerido hoy).
- Integraciones externas: Baseline + Outbox; CDC/ES no en camino crítico.

## Historial

- 2025-08-09: Propuesta inicial.

## Referencias

- ADR-002: CRUD + eventos + auditoría
- arc42 §4.3/4.4 (criterios y aplicación)

