# 2. Restricciones

## 2.1 Regulatorias
- SUSESO/IPS: reportería obligatoria, conservación de evidencia, inmutabilidad de artefactos (liquidaciones, comprobantes, resoluciones).
- Reproducibilidad normativa: cada cálculo debe estar asociado a un `MarcoNormativo` vigente a su fecha.
- Auditoría: registro de decisiones, correlación CRUD↔eventos, y evidencias consultables.

## 2.2 Técnicas
- Stack: TypeScript, AdonisJS 6, Lucid ORM, DB relacional.
- Estándares: versionado SemVer para `ParametrosNormativos` y `DirectivaDeEjecucion`; ADRs para decisiones.
- Entrega de eventos: outbox con idempotencia y `correlation_id/causation_id`.

## 2.3 Organizativas/Procesos
- Ventanas operativas acotadas para jobs masivos (pago, reportería, reliquidaciones).
- Controles VERF para acciones sensibles (restauraciones, publicación de marcos, correcciones).
- Ciclos de aprobación de cambios normativos con evidencia de pruebas y plan de rollback.

## 2.4 Datos/Privacidad
- PII: minimización, cifrado en reposo y tránsito; retención por tabla y scrubbing en eventos.
- Inmutabilidad: no borrar evidencia regulatoria; correcciones por adición (append-only donde aplique).

Ver políticas en `3_especificacion_tecnica/seguridad/` y persistencia en `3_especificacion_tecnica/datos/`.
