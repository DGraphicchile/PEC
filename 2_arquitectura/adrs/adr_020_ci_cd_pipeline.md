# ADR-020: Pipeline de CI/CD para PEC2

- Estado: Aceptada
- Fecha: 2025-08-12
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

El proyecto requiere un pipeline de integración y despliegue continuo que asegure:
1) calidad (tests unitarios/funcionales/E2E/BDD), 2) trazabilidad normativa (telemetría EDN/RDN, evidencias),
3) seguridad de entregables (artefactos reproducibles, versionado), y 4) operación confiable (idempotencia, locking).

Existe además la necesidad de ciclos de feedback rápidos en PR y validaciones completas en ramas protegidas y/o nightly,
alineado con la pirámide de tests (ver ADR-011) y la estrategia de ejecución masiva (ver ADR-010).

## Decisión

Adoptar un pipeline de CI/CD con dos niveles de ejecución y gates claros:

1. Pipeline Rápido por PR (mandatory):
   - Lint y typecheck (TS, estilo, convenciones).
   - Tests unitarios y funcionales (SQLite) con cobertura mínima.
   - Smoke BDD etiquetados `@SMOKE` (SQLite), validando esquema de salida y telemetría básica EDN/RDN.
   - Build (compilación) y verificación de empaquetado.
   - Publicación de artefactos efímeros para revisión (si aplica).

2. Pipeline Completo (por etiqueta `release/*`, push a `main` o nightly):
   - Migraciones reales y tests E2E/BDD completos sobre Postgres (Testcontainers/Docker).
   - Verificación de idempotencia (re-ejecución de cálculo/preliquidación), locks de jobs y outbox.
   - Validaciones de integración: generación de archivos (Banco, PREVIRED, SAP) y cuadraturas `PAGO-EVL-001/002/005`.
   - Generación de artefactos: paquetes, reportes de cobertura, documentación (arc42, ADRs, md-to-docx/pdf si procede).
   - Firma y versionado SemVer (tag `vX.Y.Z`), publicación a registry privado si aplica.

3. Despliegue (CD):
   - Estrategia Blue/Green o Rolling según entorno.
   - Migraciones en `pre-deploy`; verificación de salud y rollback automatizado.
   - Promoción por entorno con aprobaciones manuales cuando corresponda.

4. Seguridad y Gobernanza:
   - Escaneo de dependencias (SCA) y secretos.
   - Política de ramas protegidas (revisiones obligatorias, status checks).
   - Evidencias WORM y retención de artefactos críticos (logs, reportes BDD, archivos generados).

## Alternativas consideradas

1) Pipeline único (full) por cada PR
- Pros: máxima confianza por cambio.
- Contras: tiempos altos; menor productividad; sobrecarga de infraestructura.

2) Pipeline minimalista sin BDD/integ.
- Pros: rápido y simple.
- Contras: bajo poder de detección de regresiones normativas y de integración.

## Consecuencias

- (+) Equilibrio entre velocidad (PR) y confianza (full) alineado a ADR-011.
- (+) Evidencias y telemetría normativas se generan y persisten, facilitando auditorías.
- (–) Mayor complejidad de configuración (Docker/Testcontainers, matrices de jobs).
- (–) Costos de cómputo en runs completos (mitigado con nightly y por etiqueta).

## Acciones

- Configurar workflows (GitHub Actions/GitLab CI) con jobs: lint+typecheck, unit/func, smoke BDD (SQLite), build.
- Configurar jobs completos: Postgres (Testcontainers), BDD completos, generación/verificación de artefactos de integración.
- Publicar guías operativas en `3_especificacion_tecnica/pruebas/` y `3_especificacion_tecnica/operacion/`.
- Activar status checks obligatorios para ramas protegidas y proteger `main`.

## Referencias

- ADR-010: Estrategia de ejecución masiva de liquidaciones de fin de mes
- ADR-011: Estrategia de Pirámide de Tests
- arc42 §10 (Calidad), §7 (Despliegue)


