# 5. Building Blocks

Descomposición estática en bloques principales y responsabilidades.

- Núcleo de datos y eventos
  - Dominio: `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `LiquidacionDePago`, `ConceptoLiquidacion`, `AcuerdoDePago`, `Deuda`, etc. (ver MDLO v1 Anexo B).
  - Persistencia CRUD (system-of-record), outbox para DomainEvents, auditoría AppAudit/CDC.
  - `MarcoNormativo`: repositorios de `ParametrosNormativos` y `DirectivaDeEjecucion` con `FrameworkResolverService` (ver MDLO v1 cap. 12).
  - Publicación EDA: contratos de eventos y publicador outbox — ver `3_especificacion_tecnica/eventos-auditoria/01_domain_events.md` y `3_especificacion_tecnica/eventos-auditoria/03_outbox_publicador.md`.

- Integraciones
  - Conectores a IPS, SUSESO/SIVEGAM, Registro Civil, PREVIRED, Bancos, SAP (ver MDLO v1 Anexo E).
  - Idempotencia, DLQ, validación de contratos y mapeos (`MAP-*`).
  - Especificación de ingesta de archivos: `3_especificacion_tecnica/integraciones/ingesta_archivos.md`.

- Aplicación Front-end (Portal de Analistas)
  - Interfaz de usuario construida como un monolito moderno usando Inertia.js y React, servida directamente desde el backend de AdonisJS.
  - Los controladores del backend renderizan componentes React en lugar de retornar JSON a una API.
  - Responsable de la presentación de datos, gestión de estado de UI y flujos de trabajo del usuario.
  - Ver especificaciones detalladas en `3_especificacion_tecnica/frontend/`.

- Seguridad y accesos
  - RBAC/Policies, secretos, cifrado, scrubbing PII en eventos.

- Operación y mantenimiento
  - Jobs programados (pago, reportería, sincronizaciones), runbooks, backups/DR.
  - Evidencias y custodia WORM (versión sencilla): `3_especificacion_tecnica/eventos-auditoria/02_evidencias_y_worm.md` (decisión ligada a ADR-007).
  - Idempotencia operativa (recetas y claves): `3_especificacion_tecnica/operacion/02_idempotencia.md` (decisión ligada a ADR-006).

- Pruebas y escenarios
  - E2E CRUD + eventos, golden sets, escenarios de verificación (Anexo G), matrices de versión.

- Performance y capacidad
  - Índices, materialized views, particionado por tiempo, SLO/SLI.

Nota: Se agregará diagrama de cajas y relaciones en próxima iteración.
