# ADR-013: Adopción de BDD (Behavior-Driven Development) como marco de especificación ejecutable

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

El dominio exige trazabilidad normativa, reproducibilidad y un lenguaje compartido entre negocio y tecnología. Necesitamos que los procesos PDN y reglas RDN se documenten y verifiquen como “especificación ejecutable”, minimizando ambigüedades y garantizando que los cambios normativos (MarcoNormativo/CCL) se reflejen en escenarios verificables.

Relación con decisiones previas:
- ADR-009: Invocación interna de PDN (IoC Services/Commands) simplifica steps “When”.
- ADR-010: Ejecutar lotes masivos requiere escenarios y medición determinista.
- ADR-011: Pirámide de tests (SQLite rápidos; Postgres E2E) define dónde vive BDD.
- ADR-012: App separada de escenarios permite “Given” como bundles versionados.

## Decisión

- Adoptar BDD con Gherkin (Given/When/Then) como marco de especificación ejecutable para procesos de negocio y reglas clave.
- Ubicar features versionadas y taggeadas por PDN/RDN, `MarcoNormativo` y `CCL`.
- Runner: Cucumber.js (o equivalente) con step definitions en TypeScript que invocan Services/Commands de AdonisJS (ADR-009).
- Mapeo operativo:
  - Given: cargar bundle de escenario (ADR-012) o seed determinista; fijar `freeze time`; validar versiones de `MarcoNormativo`/`CCL`.
  - When: ejecutar el PDN (p. ej., `pagar:calcular --periodo=AAAAMM`) vía command/service.
  - Then: comparar salidas con golden sets (expected/*.json), verificar idempotencia/locks/outbox (cuando aplique).
- Integración CI: features E2E corren sobre Postgres (paridad prod); unit/funcional pueden usar SQLite para steps rápidos (ADR-011).

## Alcance

- Prioridad: PDN de otorgamiento y cálculo mensual (PIM/PLI/redondeo), reliquidaciones, idempotencia, y eventos críticos (outbox). Gradual para el resto.
- Features y bundles se versionan junto con artefactos normativos.

## Alternativas consideradas

1) TDD/ATDD sin Gherkin (tests imperativos)
- Pros: menos tooling; más directo.
- Contras: menor legibilidad para negocio; menos “living documentation”.

2) Documentación narrativa + pruebas convencionales
- Pros: simple de mantener.
- Contras: riesgo de deriva; poca trazabilidad Given/When/Then.

## Consecuencias

- (+) Lenguaje ubicuo: PDN/RDN/CCL se expresan en ejemplos concretos; menor ambigüedad.
- (+) Trazabilidad: features enlazadas a `MarcoNormativo`/CCL y a resultados deterministas.
- (+) Cambios normativos: actualización de features y bundles evidencian el impacto.
- (–) Coste inicial de tooling y disciplina en mantenimiento de steps/features.
- (–) Riesgo de flakiness si no se asegura determinismo (freeze time, seeds, idempotencia).

## Reflejo en arc42

- §6 Runtime: los escenarios clave se documentan como features BDD y se enlazan; los diagramas de secuencia referencian pasos Given/When/Then.
- §10 Calidad: criterios de aceptación se miden por features BDD (cobertura por PDN, tasa de éxito, p95 de ejecución de scenarios).
- §5 Building Blocks: incluir “Especificación ejecutable (BDD)” como puente entre dominio y pruebas, enlazando a `3_especificacion_tecnica/pruebas/`.
- §9 ADRs: este ADR referencia 009–012; 09_decisiones_arquitectonicas.md se actualiza.

## Reflejo en la especificación técnica

- `3_especificacion_tecnica/pruebas/`:
  - Guía BDD (estructura de features, tags por PDN/RDN/Marco/CCL, convenciones de steps).
  - Integración con golden sets y bundles (ADR-012): contrato de “Given” y “Then”.
  - Pipeline: fast (SQLite) para steps/units; full (Postgres) para E2E.
- Versionado: features y bundles con SemVer y matrices por `MarcoNormativo`.

### Cobertura declarativa y aserciones estándar

- Cada `manifest.yaml` de escenario debe declarar cobertura de proceso y reglas:
  - `coverage.pdn.id`, `coverage.pdn.version`, `coverage.pdn.edn[]` (orden nominal del orquestador).
  - `coverage.rdn_expected[]` (lista o patrones) y `coverage.rdn_excluded[]`.
- Los `.feature` deben incluir Then de verificación de cobertura:
  - "Then el PDN completó todas sus EDN declaradas"
  - "And las RDN ejecutadas incluyen al menos las declaradas"
  - "And no se ejecutaron RDN excluidas"
- Los step definitions validan `coverage.*` contra telemetría de ejecución (ver ADR-009).

## Acciones

- Crear guía “BDD” en `3_especificacion_tecnica/pruebas/` y ejemplos de features iniciales (otorgamiento y cálculo mensual).
- Configurar Cucumber.js (o runner elegido) con TypeScript y hooks de setup/teardown (DB, seeds, freeze time).
- Añadir tags y convenciones (ej.: @PDN-PAG-003, @Marco=params-vX.Y.Z, @CCL=vA.B.C).
- Ajustar CI: job E2E ejecuta features sobre Postgres; publicar reportes (cucumber JSON/HTML).

## Referencias

- ADR-009, ADR-010, ADR-011, ADR-012
- arc42 §5, §6, §10
- `3_especificacion_tecnica/pruebas/00_piramide_tests.md`

## Principios operativos (max impacto, mínimo costo)

- BDD a nivel de servicios/commands (no UI): los steps ejecutan Services/Commands (ADR-009).
- Datos por bundle/seed, no por steps: Given carga bundles (ADR-012) y fija freeze time; evitar tablas Gherkin extensas.
- Then determinista por golden sets: comparar outputs byte a byte (líneas CCL/totales); tolerancias solo justificadas.
- Pocos escenarios, muy representativos: 1–3 por PDN crítico; bordes numéricos vía property-based tests fuera de BDD.
- Reutilización mínima de steps: vocabulario chico, estable y tipado; evitar “step spaghetti”.
- Fast vs Full: ejecutar features críticas en Full CI (Postgres); permitir dry-runs rápidos locales (SQLite) solo para desarrollo.

## Alcance y no-objetivos

- Alcance: PDN de otorgamiento y pago mensual (PIM/PLI/redondeo), reliquidación multi-marco, idempotencia/locks básicos, verificación de outbox (stub o contrato).
- No-objetivos:
  - UI end-to-end con navegadores.
  - Migraciones/esquema (usar suites de migración).
  - NFRs (performance/HA) completos en BDD (medir con suites de carga/SLI).
  - Contratos HTTP/eventos en BDD (usar contract testing/JSON Schema).

## Vocabulario mínimo de steps

- Given
  - "Given el escenario '<scenario_id>' con Marco '<params_version>' y CCL '<ccl_version>'"
  - "And la fecha del sistema es '<YYYY-MM>'"
- When
  - "When ejecuto PDN '<pdn_id>' para el periodo '<YYYY-MM>'"
- Then
  - "Then las liquidaciones coinciden con el golden set"
  - "And la ejecución es idempotente"
  - "And no existen corridas simultáneas para el periodo"

## Guías de autoría

- Convenciones de tags: `@PDN-PAG-003` `@Marco=params-vX.Y.Z` `@CCL=vA.B.C` `@Periodo=YYYY-MM`.
- 1 feature por PDN/tema; escenarios cortos (≤10 líneas).
- Usar bundles para datos; prohibido armar grafos por pasos.
- Mantener steps en TypeScript, con tipos para IDs y periodos; validar versiones antes de ejecutar.

## Determinismo y calidad

- Freeze time y zona horaria fija (UTC) en hooks de features.
- IDs estables (UUIDs fijos) y `dataset_hash` en manifest.
- Idempotencia: assert de `unique(periodo, prestacion_id)` y re-ejecución con mismo resultado.
- Outbox: validar contra eventos stub o contar/publicar en canal simulado, no broker real.

## Layout de repositorio

- `features/` → `.feature` por PDN.
- `steps/` → step definitions TS mínimas.
- `bundles/` → escenarios consumibles (manifest, seed.sql, expected/).
- `support/` → hooks (freeze time, DB bootstrap), matchers y utilidades.

## CI y ejecución

- Fast (por PR): lint + unit/funcional + dry-run BDD opcional (SQLite) sin asserts de DB, solo smoke de steps.
- Full (por etiqueta/nightly): BDD E2E en Postgres (Testcontainers), migraciones y verificación de idempotencia/outbox.
- Artefactos: reportes Cucumber JSON/HTML, diffs de golden sets.

### Política Smoke vs Full (concrete)

- Smoke (@SMOKE): valida estructura de salida (schema), cobertura EDN/RDN mínima y que el PDN no falle; no compara montos.
- Full: compara byte a byte contra golden sets, y además valida idempotencia y no concurrencia.

## KPIs y policy de mantenimiento

- KPIs: 
  - lead time de test (p95) < 10 min en Full; tasa de flakiness < 1%; cobertura BDD de PDN críticos ≥ 80%.
  - tiempo de incorporación de un nuevo escenario ≤ 1 día.
- Política: eliminar/rehacer escenarios flaky; PR que cambia reglas debe actualizar bundle y golden set con changelog.

## Anti-patrones a evitar

- Steps literarios/granulares y reutilización excesiva.
- Datos creados por pasos (en vez de bundles).
- Dependencias de broker real/outbox en features.
- Features largas y con múltiples When/Then.

## Plan de adopción

1) Crear guía BDD en `3_especificacion_tecnica/pruebas/` con este vocabulario y ejemplos.
2) Escribir 3 features iniciales: otorgamiento simple; cálculo mensual básico; idempotencia de pago.
3) Integrar bundles de ADR-012; agregar hooks de freeze time y bootstrap DB.
4) Configurar Cucumber.js + TS en CI Full; publicar reportes.
5) Iterar agregando PDN críticos y bordes priorizados por riesgo.
