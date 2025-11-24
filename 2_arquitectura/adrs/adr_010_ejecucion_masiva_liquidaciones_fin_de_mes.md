# ADR-010: Estrategia de ejecución masiva de liquidaciones de fin de mes

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

Al cierre de cada mes se deben calcular ~10.000 liquidaciones de pensión en minutos. La arquitectura actual (AdonisJS 6, DB relacional, outbox asíncrono) puede soportarlo con prácticas adecuadas, pero existen varias alternativas de ejecución con distintos costos operativos y de complejidad.

## Pregunta de decisión

¿Qué estrategia adoptaremos para ejecutar el cálculo masivo mensual de liquidaciones, asegurando tiempos de minutos, idempotencia, auditabilidad y reanudación segura?

## Alternativas consideradas

1) Paralelización por shards (orquestador + N workers)
- Descripción: dividir el set por shard (ej. PrestacionID % N) y procesar en paralelo chunks de 200–1000 casos por worker.
- Pros: simple de razonar, escala horizontal, buen aislamiento de fallos.
- Contras: requiere coordinación de locking/checkpoints; tuning de tamaño de chunk.

2) Cola de trabajos (broker) con autoscaling de consumers
- Descripción: encolar 10k trabajos (1 por prestación), consumir con concurrencia controlada y Dead Letter Queue (DLQ).
- Pros: elasticidad, reintentos finos, Dead Letter Queue (DLQ) nativo.
- Contras: dependencia de broker; mayor complejidad operativa.

3) Cálculo set-based en DB (parcial/total)
- Descripción: mover Pensión Imponible Mensual (PIM)/parte de Pensión Líquida Mensual (PLI) a SQL (Common Table Expressions (CTE)/procedimientos almacenados), minimizando ida/vuelta y N+1.
- Pros: alto rendimiento cuando reglas son tabulares.
- Contras: acopla lógica al motor SQL; menor portabilidad/legibilidad.

4) Incremental/precomputado
- Descripción: precomputar PIM durante el mes; fin de mes aplica PLI + redondeo.
- Pros: reduce CPU pico de fin de mes.
- Contras: complejiza gobernanza si cambia normativa; mayor superficie de invalidaciones.

5) Híbrida (DB para PIM; app para PLI/condiciones)
- Pros: balance entre rendimiento y mantenibilidad.
- Contras: doble locus de lógica; coordinación de cambios.

## Alternativas alineadas con AdonisJS 6 (módulos nativos)

- Ace Command orquestador + Lucid chunking (recomendada)
  - Uso: `Ace` (commands), `@adonisjs/lucid` (QueryBuilder/transactions), `Logger`, IoC Services.
  - Modo: command (p. ej., `pagar:calcular --periodo=AAAAMM`) que selecciona prestaciones en chunks (200–1000), procesa con concurrencia controlada (8–16), transacción por prestación y multi-insert de líneas CCL. Locks en `job_locks` por (periodo, tipo). Publicación outbox desacoplada en otro command.
  - Flujo (paso a paso):
    1. Adquirir `job_lock(periodo, tipo="pago_mensual")` para evitar corridas concurrentes.
    2. Resolver y cachear `MarcoNormativo`, parámetros y CCL inmutables para el período.
    3. Seleccionar prestaciones activas del período con Lucid y procesar en `.chunk()` de 200–1000.
    4. Para cada prestación (pool de 8–16 promesas): abrir transacción; calcular PIM/PLI; upsert de `LiquidacionDePago` con `unique(periodo, prestacion_id)`; bulk insert de líneas CCL; registrar `marco_normativo_id` y `hash_ejecucion`; commit.
    5. Insertar evento en `outbox_events` dentro de la transacción; publicar de forma asíncrona en un command separado.
    6. Checkpoint por chunk (persistir último `prestacion_id` procesado) para reanudación.
  - Concurrencia y chunking:
    - Típico: 8–16 workers; tamaño de chunk 500 (ajustable según CPU/IO). Evitar transacciones largas; 1 transacción por prestación.
  - Idempotencia y reanudación:
    - `unique(periodo, prestacion_id)` en `LiquidacionDePago`; `dataset_hash` por corrida; reintentos seguros re-ejecutan sin duplicar.
  - Errores y reintentos:
    - Backoff exponencial por prestación fallida; mover a tabla de incidencias tras N intentos; continuar el lote.
  - Observabilidad (métricas/logs):
    - throughput (casos/min), p95/p99 por caso, errores por tipo, backlog por chunk, lag de outbox; logs con `correlation_id` por prestación.
  - Estimación de rendimiento:
    - 40 ms/caso en app/DB → 10k en ~6.7 min mono-hilo; con 8 workers: ~1 min (+overhead). Meta conservadora: 2–5 min fin de mes.

- Cola “DB-backed” + consumidores `ace` (sin broker externo)
  - Uso: tabla `work_items` + `SELECT ... FOR UPDATE SKIP LOCKED` con N procesos `node ace queue:consume`.
  - Ventajas: autoscaling simple; reintentos/DLQ en tablas; cero dependencias externas.
  
- Cálculo set-based parcial en DB + Services en app
  - Uso: `Database.raw()`/CTEs para PIM/agrupaciones; PLI y reglas condicionales en Services.
  - Ventajas: reduce ida/vuelta y N+1; mantiene legibilidad de reglas complejas en TS.
  
- Planificación con cron del sistema
  - Uso: cron → `node ace pagar:calcular --periodo=AAAAMM` (y publicador outbox en segundo plano).

### Notas prácticas (AdonisJS/Lucid)

- Índices: `prestaciones(estado)`, `liquidaciones(periodo, prestacion_id)`, `conceptos(codigo_concepto)`.
- Idempotencia: `dataset_hash` por corrida; `unique(periodo, prestacion_id)` en `LiquidacionDePago`.
- Cache en proceso: parámetros normativos/CCL (inmutables durante la corrida).
- Outbox: publicar asíncrono; no dentro de la transacción de cálculo.
- Evitar: transacciones masivas; N+1 con Lucid; I/O síncrono por fila; publicar eventos en línea durante el cálculo.

## Criterios de evaluación (aceptación)

- Rendimiento: p95 de caso < 50 ms en entorno objetivo; 10k casos en < 5 min end-to-end.
- Concurrencia/control: sin deadlocks; lock por lote/periodo; reanudación por chunks.
- Idempotencia: sin duplicados de liquidación por (periodo, prestación); `dataset_hash` único.
- Auditabilidad: evidencia de `marco_normativo_id`, `hash_ejecucion`, `correlation_id` por liquidación.
- Operación: DLQ/retry claros; checkpoints y métricas (throughput, backlog, errores) visibles.
- Coste/Complejidad: minimizar dependencias nuevas (broker) salvo que el rendimiento lo justifique.

## Plan de experimentos/PoC

- Dataset: 10k prestaciones representativas (con 3 perfiles de complejidad de reglas y 10–20 líneas CCL promedio).
- Entorno: DB con índices propuestos; app con 8–16 workers; cache in-process de normativa/CCL.
- Escenarios:
  - E1: Shards con chunks de 200/500/1000; medir p95/p99, CPU DB, locks, tasa de errores.
  - E2: Cola (Rabbit/Kafka) con 16/32 consumers; medir latencia end-to-end y overhead operativo.
  - E3: PIM set-based vs app; medir ahorro de roundtrips.
- Métricas: casos/min, p95/p99 por caso, lag de outbox, I/O por transacción, tasa de reintentos.
- Criterio de selección: mejor trade-off que cumpla aceptación con menor complejidad operativa.

## Riesgos y mitigaciones

- N+1/overhead ORM → precargas/set-based, bulk insert, COPY para líneas CCL.
- Transacciones largas → 1 transacción por prestación; evitar transacciones masivas.
- Contención/locks → particionar por shard; orden estable de procesamiento; índices adecuados.
- Picos de I/O en outbox → publicar asíncrono post-cálculo; backpressure en publicador.

## Consecuencias (a completar tras decisión)

- Impacto en operación (runbooks, DLQ), observabilidad, y costos de infraestructura.

## Próximos pasos

- Ejecutar PoCs E1–E3, recoger métricas y documentar resultados.
- Redactar ADR final (Accepted) con la alternativa elegida y parámetros (N workers, tamaño de chunk, índices).
- Actualizar `tech/especificacion/operacion/` y `performance/` con recetas y SLOs.

## Referencias

- ADR-002: CRUD + eventos + auditoría
- ADR-008: AdonisJS 6 como framework base
- evaluacion_diseno.md: §3.4 Despliegue, §4.5 Operación, §4.8 Performance
- arc42: §6 (Runtime), §7 (Despliegue), §10 (Calidad)
