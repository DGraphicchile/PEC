# ADR-011: Estrategia de Pirámide de Tests (SQLite para rápidos; Postgres para E2E)

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

Necesitamos validar calidad funcional y reproducibilidad normativa con ciclos de feedback rápidos sin sacrificar realismo en escenarios E2E. El stack es AdonisJS 6 con Lucid, escenarios de verificación con golden sets, idempotencia/locking, y cálculos financieros (PIM/PLI) sensibles a precisión y concurrencia. Probar todo contra la misma base de datos de producción mejora paridad, pero ralentiza el ciclo de desarrollo y no es necesario para todas las capas.

## Decisión

- Adoptar una pirámide de tests con motores diferenciados:
  - Unit y funcional/servicios: SQLite (in-memory/archivo temporal) usando `better-sqlite3` con PRAGMAs (WAL, busy_timeout, foreign_keys, synchronous=NORMAL).
  - E2E/escenarios, migraciones/esquema y performance smoke: Postgres equivalente a producción (Docker/Testcontainers), con migraciones reales y seeds/golden sets.
- Mantener dos conexiones en `config/database.ts` (`sqlite`, `pg`) y seleccionar por `NODE_ENV`/entorno de test.
- Estándares: montos en enteros, golden sets deterministas, verificación de idempotencia (`unique(periodo, prestacion_id)`, `dataset_hash`) y `job_locks`.
- CI: pipeline rápido por PR (unit+funcional SQLite) y pipeline completo (E2E+migraciones Postgres, opcional performance smoke) por etiqueta o nightly.
 - Smoke BDD por PR: ejecutar escenarios etiquetados `@SMOKE` en SQLite, validando schema de salida y cobertura mínima `coverage.*` (EDN/RDN) sin comparación de montos.
 - Full BDD (nightly/etiqueta): ejecutar escenarios completos en Postgres (Testcontainers), con comparación contra golden sets, idempotencia y verificación de no concurrencia/outbox.

## Alternativas consideradas

1) Un solo motor (Postgres) para todos los tests
- Pros: máxima paridad con producción.
- Contras: feedback lento; sobrecarga de infra en dev/CI; fricción para TDD.

2) Un solo motor (SQLite) para todos los tests
- Pros: máxima velocidad y simplicidad.
- Contras: falsos verdes por diferencias de dialécto/locking/precisión; riesgo en migraciones y concurrencia real.

3) Mocks/stubs extensivos sin DB
- Pros: ultra rápido; pruebas puras.
- Contras: baja confianza para escenarios E2E, cálculos y persistencia real.

## Consecuencias

- (+) Ciclo de feedback rápido en dev; pruebas realistas donde importa (E2E, migraciones, performance).
- (+) Reducción de falsos verdes al exigir Postgres en capas sensibles (concurrencia/precisión).
- (–) Mayor complejidad de configuración (dos motores, bootstrap distinto).
- (–) Disciplina para no introducir SQL específico del motor en capas rápidas sin cobertura E2E.

## Acciones

- Crear `3_especificacion_tecnica/pruebas/00_piramide_tests.md` con guía operativa (hecho).
- Configurar `config/database.ts` con conexiones `sqlite` (better-sqlite3 + PRAGMAs) y `pg`.
- Bootstrap Japa: migraciones/transacciones para SQLite; orquestación Postgres para E2E (Docker/Testcontainers).
- Definir estructura de golden sets y seeds con IDs estables; validar idempotencia y locking en E2E.
- Ajustar CI: job rápido (SQLite) por PR y job completo (Postgres) por etiqueta/nightly.

## Referencias

- `3_especificacion_tecnica/pruebas/00_piramide_tests.md`
- ADR-009: Invocación interna de PDN (IoC Services + Commands/Jobs)
- ADR-010: Estrategia de ejecución masiva de liquidaciones de fin de mes
- arc42 §10 (Calidad), §6 (Runtime)
