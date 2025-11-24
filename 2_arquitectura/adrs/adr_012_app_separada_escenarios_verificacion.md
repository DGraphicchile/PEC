# ADR-012: Plataforma separada de escenarios para validación temprana de MDLO, generación de bundles y borradores BDD (AdonisJS)

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

Antes de construir capacidades completas, queremos una etapa inicial enfocada en validar el MDLO (entidades/procesos/reglas) y producir golden sets confiables. Se propone una app AdonisJS separada y ligera ("plataforma de escenarios") que:
- Ejecute procesos PDN en “modo smoke/visualización” (sin outbox ni integraciones) para demostrar el flujo y salidas.
- Genere bundles reutilizables (manifest + seed.sql + expected/*.json) para E2E de la app principal.
- Asista la creación de borradores de features Gherkin (BDD) a partir de los bundles, para revisión/edición por negocio (ver ADR-013).

Esto reduce riesgo, acelera alineamiento con negocio y crea artefactos directamente consumibles por el pipeline de pruebas.

## Pregunta de decisión

¿Adoptar una app AdonisJS separada para validación temprana de MDLO, con ejecución smoke de PDN, generación de bundles para E2E y borradores BDD, manteniendo aislamiento total de la app principal?

## Alternativas consideradas

1) App separada (AdonisJS) con DB propia (propuesta)
- Pros: aislamiento total; cero side-effects en producción; puede escalar/verificarse independiente; facilita PoCs de rendimiento; genera bundles y borradores BDD.
- Contras: segunda app/DB para operar; sincronización de versiones de artefactos/reglas; mayor mantenimiento.

2) Funcionalidad interna (modo simulación) en el sistema principal
- Pros: máxima paridad con runtime real; reutiliza íntegramente servicios y config.
- Contras: riesgo de contaminación si el aislamiento falla; complejidad para desactivar outbox/externos; ventanas operativas.

3) Factories/seeders únicamente en el monolito + snapshots DB
- Pros: simplicidad; menos moving parts; sin segunda app.
- Contras: suites E2E más lentas y acopladas; menor flexibilidad para generar bundles reutilizables; difícil gobernanza.

4) Scripts offline (CLI) sin servidor
- Pros: muy bajo costo operativo; fácil de correr en CI.
- Contras: menos ergonomía; evoluciona en paralelo sin interfaz; difícil multiusuario.

5) App separada minimalista con lógica independiente (sin paquete compartido)
- Pros: máxima simplicidad y autonomía de la app de escenarios; cero dependencia de versiones internas del monolito; tiempo de puesta en marcha corto.
- Contras: drift de lógica inevitable; duplicación de reglas (PIM/PLI/CCL) y riesgo de divergencia; la equivalencia debe validarse vía contratos/bundles, no por reutilización de código.

## Diseño propuesto (App separada)

- Paquete de dominio compartido (preferente) o lógica focalizada (alternativa 5), según trade-off.
- Base de datos: Postgres propio (lectura/escritura); opcional conexión read-only a réplica para muestrear y materializar datos al sandbox.
- Aislamiento: `ScenarioWorkspace` (schema `scenario_<uuid>`); `search_path` por escenario.
- Modo simulación: publicador outbox no-op (no hace nada); integraciones deshabilitadas; `AppAudit.simulation=true`.
- UI mínima opcional: vistas/JSON para visualizar entradas/salidas (smoke) de PDN seleccionados.
- Generación de artefactos:
 - Bundles: `manifest.json`, `seed.sql`, `expected/*.json` (liquidaciones, conceptos y opcional eventos stub).
   - El `manifest.json` incluye: `marco_id`, `marco_version`, `directiva_version`, `ccl_version`, `freeze_time`, `periodo`, `coverage.pdn/rdn`, `dataset_hash` y `checksums`.
  - Borradores BDD: plantillas `.feature` pre-rellenadas (tags @PDN/@Marco/@CCL/@Periodo, Given/When/Then mínimos), para revisión/edición por negocio.

## Contratos y reutilización en E2E (app principal)

 - Bundle (contrato mínimo): manifest.json (ids/versión de marcos/CCL, `directiva_version`, `coverage` PDN/EDN/RDN, freeze time, dataset_hash, domain_pkg_version), seed.sql e expected/*.json.
- Flujo E2E: Postgres limpio → migraciones → importar seed → ejecutar PDN → comparar con expected.

## Criterios de aceptación (fase inicial)

- 3–5 escenarios críticos entregados con: bundle reproducible, expected deterministas y feature Gherkin revisada por negocio.
- Re-ejecución determinista (idempotencia/locks) en Postgres; tasa de flakiness ≈ 0.
- Tiempo de incorporación de un escenario nuevo ≤ 1 día (incluye feature review).
- Diferencias detectadas entre MDLO y reglas implementadas documentadas y corregidas.

## Plan de fase inicial (2–4 semanas)

1) Montar app separada con `ScenarioWorkspace`, commands de ejecución smoke y export de bundles.
2) Integrar artefactos normativos/CCL versionados; freeze time; IDs estables.
3) Generar borradores Gherkin a partir de bundles (plantillas); circuito de revisión con negocio.
4) Publicar 3–5 escenarios (otorgamiento, PIM/PLI básico, idempotencia, un caso borde) y validar E2E en la app principal.
5) Medir tiempos (generación, import, ejecución) y ajustar parámetros; decidir sobre paquete compartido vs lógica focalizada.

## Riesgos y mitigaciones

- Drift entre apps → preferir paquete de dominio compartido; si no, pruebas de conformidad obligatorias (diff 0 contra outputs de la app principal) en CI.
- Fuga de PII → datos sintéticos o anonimización pre-export; validaciones automáticas.
- Deriva de artefactos normativos → checksums en manifest; error explícito ante mismatch.
- Complejidad extra → timebox y foco; limitar alcance a PDN críticos.

## Consecuencias

- (+) Validación temprana de MDLO y alineamiento negocio-tec; artefactos útiles para BDD/E2E (ADR-013/ADR-011).
- (+) Menor riesgo de ambigüedad; feedback rápido con smoke y visualización.
- (–) Costo de operar una app/DB adicional y sincronización de artefactos.

## Referencias

- ADR-009: Invocación interna de PDN (IoC Services + Commands/Jobs)
- ADR-010: Estrategia de ejecución masiva de liquidaciones de fin de mes
- ADR-011: Estrategia de Pirámide de Tests
- ADR-013: Adopción de BDD como especificación ejecutable
- `3_especificacion_tecnica/pruebas/00_piramide_tests.md`

## Diseño de la alternativa 5 (app separada minimalista, lógica independiente)

- Objetivo
  - Maximizar simplicidad y autonomía de la app de escenarios, aceptando mantener lógica de negocio independiente de la app principal.

- Stack y componentes
  - AdonisJS 6 minimal (HTTP opcional; foco en Commands/Jobs).
  - Persistencia: Postgres propio (puede iniciar con SQLite para velocidad en dev/CI del verificador).
  - Sin ORM complejo si no se desea: Lucid opcional; alternativa con QueryBuilder/knex.
  - Sin outbox/integraciones: publicador noop; auditoría local básica etiquetada `simulation=true`.

- Modelo de datos (simplificado, no isomorfo al dominio completo)
  - Tablas mínimas: `scenario_workspaces`, `prestaciones`, `liquidaciones`, `conceptos_liquidacion`.
  - Constraints esenciales: `unique(liquidaciones.periodo, prestacion_id)`, FKs básicas, montos en enteros.
  - No se replica todo el modelo (Acuerdos, Deudas, etc.) salvo que el escenario lo requiera.

- Artefactos normativos y CCL
  - Copias locales (JSON/CSV) de `MarcoNormativo` (parámetros/directivas) y CCL por versión.
  - Verificación por checksum en un `manifest.json`; si no coincide, bloquear ejecución o advertir.

- Lógica de negocio (independiente)
  - Re-implementación focalizada de reglas necesarias: CALC-PIM/PLI básicas y redondeo.
  - Orquestador de PDN mínimos (otorgamiento/pago) en Commands.
  - Determinismo: freeze time, IDs estables, orden fijo de procesamiento.

- Orquestación de escenarios
  - `ScenarioWorkspace` crea un “espacio” aislado (schema o prefijo de tablas).
  - Factories/seeders deterministas generan datos del escenario.
  - Command `escenario:ejecutar --id <uuid>` corre PDN y persiste resultados.

- Contratos de salida (bundles)
  - `manifest.json`: ids/versión de marcos/CCL, dataset_hash, domain_version (de la app verificador), notas.
  - `seed.sql`: inserts deterministas para reconstruir el escenario en otras apps.
  - `expected/*.json`: liquidaciones y conceptos esperados (y opcional eventos stub).

- Integración con E2E de la app principal
  - La app principal consume bundles (sin compartir código) y valida outputs contra `expected/*.json`.
  - Conformidad se garantiza por contrato (no por reutilización de servicios).

- Sincronización y gobernanza
  - Política: “contract-first”. La equivalencia se prueba con suites de conformidad (diff 0 entre apps) ejecutadas en CI.
  - Versionado SemVer de la app verificador; cada cambio mayor actualiza el formato de bundle.
  - Registro de bundles versionados (artefact repository) con checksums.

- Operación
  - App y DB separadas; recursos acotados; TTL para workspaces; límites de tamaño/CPU.
  - Métricas: tiempo por escenario, divergencias vs app principal, tasa de éxito de conformidad.

- Riesgos y mitigaciones
  - Drift de lógica: ejecutar con frecuencia pruebas de conformidad (verificador vs principal) y bloquear releases ante divergencias.
  - Cobertura insuficiente: ampliar escenarios hasta cubrir reglas críticas (lista curada) y casos borde.
  - Deriva de artefactos normativos: checksums y fallo explícito ante mismatch.
