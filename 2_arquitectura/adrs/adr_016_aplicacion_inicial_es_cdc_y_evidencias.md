# ADR-016: Aplicación inicial de ES/CDC y Evidencias (PEC)

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

- ADR-002 define el baseline: CRUD como system-of-record + DomainEvents (outbox/idempotencia) + AppAudit/CDC técnico, sin replays deterministas.
- ADR-007 define el requerimiento de negocio para evidencias y trazabilidad por transacción/liquidación, con vínculo a `MarcoNormativo`, `CUN`, `correlation_id/causation_id` y custodia WORM.
- ADR-014 establece criterios objetivos para activar ES/CDC por módulo; ADR-015 propone CDC para reportería/lecturas.

Se requiere documentar la aplicación inicial de estas decisiones en cada módulo del sistema PEC.

## Decisión

Adoptar la siguiente aplicación por módulo:

- OTG (Otorgamiento): Baseline. Sin ES. CDC opcional sólo para vistas de seguimiento (no camino crítico).
- MANT (Mantenimiento): Baseline. Sin ES. CDC opcional para dashboards operativos (no camino crítico).
- PAG (Pagos): Baseline para cálculo y orquestación. Sin ES. CDC no en camino crítico; sólo para alimentar reportería.
- REP (Reportería): Activar CDC para feeds incrementales y, cuando aplique, consultas bitemporales hacia almacenes de lectura/analítica, aislados del SoR (conforme ADR-015).
- Integraciones (Banco, PREVIRED, Registro Civil, SAP): Baseline + outbox/idempotencia; reconciliaciones. Sin ES/CDC en el camino crítico.
- Analítica/Monitoring: CDC dedicado para vistas analíticas/bitemporales, aislado del SoR.

## Evidencias y trazabilidad (exigencias mínimas ADR-007)

- Por `LiquidacionDePago` y transacciones relevantes: registrar `marco_normativo_id` (params/directiva), `hash_ejecucion` (inputs relevantes + versiones), `correlation_id/causation_id`.
- Vincular operaciones a `ExpedienteDeTramite (CUN)` cuando aplique.
- Publicaciones/ingestas: custodia WORM de archivos (hash + sello de tiempo + proveedor), AppAudit de envío/acuse y de motivos de exclusión.
- Procesos con `VERF`: registro de aprobación (usuario/rol/fecha) enlazado al CUN.

## Justificación

- OTG/MANT/PAG no requieren replay determinista de lógica; la latencia/simplicidad del baseline favorece su adopción (ADR-014).
- REP/Analítica requieren feeds incrementales y potencial bitemporalidad; CDC reduce carga operacional del SoR y habilita SLA de reportería (ADR-015).

## Alcance y lineamientos técnicos

- CDC (REP/Analítica):
  - Tablas iniciales: `PrestacionEconomica`, `LiquidacionDePago`, `ConceptoLiquidacion`, `InformeRegulatorio`, `WormFiles` (metadatos).
  - Contratos de topics y scrubbing de PII obligatorios; gobernanza de esquemas.
  - Observabilidad: dashboards de lag/throughput/errores; alarmas por lag sostenido y error rate.
- Baseline (OTG/MANT/PAG/Integraciones):
  - Idempotencia: `Idempotency-Key`, `job_locks`, `dataset_hash`, `publication_attempts`.
  - AppAudit por etapa; correlación `correlation_id/causation_id` end-to-end.
  - WORM para archivos de salida/entrada.

## SLO/SLI (a concretar)

- Completar `3_especificacion_tecnica/performance/03_slo_sli_capacidad.md` con metas por dominio:
  - CDC: lag P95/P99, throughput, duplicados/clave.
  - PAG/OTG/MANT: p95 de cálculo por caso/batch, p99 de endpoints, errores/idempotencia.

## Consecuencias

- (+) Trazabilidad y evidencias alineadas a negocio (ADR-007) sin complejidad innecesaria en el camino crítico.
- (+) Reporterías y lecturas aisladas con CDC; menor carga en el SoR.
- (–) Operación adicional de conectores/broker y gobierno de esquemas para CDC.

## Plan y aceptación

1) PoC CDC con `LiquidacionDePago`/`ConceptoLiquidacion`; medir lag/throughput/errores.
2) Completar SLO/SLI y contratos de topics; scrubbing PII.
3) Añadir verificaciones de evidencias mínimas en EV (Anexo G).
4) Cerrar ADR con resultados y pasar a Aceptada si cumple SLO/SLI.

## Referencias

- ADR-002: CRUD + eventos + auditoría (baseline)
- ADR-007: Evidencias y trazabilidad
- ADR-014: Criterios ES/CDC por módulo
- ADR-015: CDC para reportería
- arc42 §4.3/4.4; `1_dominio` Anexos C, D, G

