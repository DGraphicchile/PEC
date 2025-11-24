# 10. Requisitos de Calidad

## 10.1 Árbol de calidad (ISO/IEC 25010)
- Seguridad, Fiabilidad, Mantenibilidad, Rendimiento, Compatibilidad.

## 10.2 Escenarios de calidad (medibles)
- Auditabilidad y reproducibilidad: dado un caso y periodo histórico, al re-ejecutar, la liquidación coincide bit a bit con la original (mismo MarcoNormativo y conceptos). p95 < 2 min/caso.
- Idempotencia: ante reintentos de publicación bancaria/PREVIRED, no se generan duplicados. 0 duplicados detectados por `idempotency_hash`/mes.
- Rendimiento de lote: Nómina mensual (N registros) en < X minutos nominal y < Y minutos pico; reportería en < W minutos.
- Disponibilidad: P99 de latencia para endpoints críticos < Z ms; uptime ≥ 99.9% horario hábil.
- Seguridad/PII: sin fugas en eventos/payloads; auditorías internas sin hallazgos críticos.

## 10.3 Verificación
- Pruebas E2E y golden sets (ver `tech/especificacion/pruebas/`).
- Monitoreo de SLIs y alertas operativas (ver `tech/especificacion/operacion/`).
