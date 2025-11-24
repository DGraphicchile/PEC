# ADR-008: Adopción de AdonisJS 6 como framework base (TypeScript) y extensiones del stack

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- Se requiere un framework opinionado en TypeScript que facilite:
  - Productividad con IoC, configuración, validación, ORM y migraciones.
  - Claridad estructural para dominios, servicios y módulos.
  - Integración con patrones de calidad definidos (outbox, idempotencia, WORM, auditoría) y necesidad de alto rendimiento.
  - Enfoque fuerte en pruebas E2E alineadas a escenarios de verificación del dominio (MDLO v1 Anexo G), con fixtures/factories y pipelines deterministas (golden sets).
- Alternativas evaluadas en el ecosistema Node.js: NestJS, Express/Fastify (con librerías sueltas), Hapi.

## Decisión
- Adoptar AdonisJS 6 como framework de aplicación backend (API + jobs) con:
  - IoC/Container nativo, rutas HTTP, validación, configuración `.env`, logger.
  - Lucid ORM (migraciones, seeders, factories) para persistencia relacional.
  - Módulos de aplicación para servicios de dominio, publicador Outbox y jobs programados.
  - Soporte de pruebas con Japa runner y estructura para E2E: bootstrap de base de datos, factories, seeders por escenario, y verificación determinista contra golden sets.
- Extender con librerías/módulos populares y bien mantenidos:
  - Integraciones/archivos: `fast-csv`/`csv-parse`, `xlsx` para Excel; `aws-sdk v3` (S3/Object Lock si aplica), `node-cron` o cola/broker elegido.
  - Observabilidad: `pino`/`pino-pretty`, OpenTelemetry (SDK Node) cuando proceda.
  - Seguridad: `helmet` (middlewares), `rate-limiter-flexible` para rate limiting.
  - Mensajería/broker: cliente según tecnología (Kafka/Redpanda, RabbitMQ, NATS) con productor/consumidor idempotente.
  - Validación/contratos: JSON Schema (Ajv) para eventos; Zod/Valibot opcional para DTOs internos.

## Alcance
- API HTTP (REST) para procesos operativos.
- Jobs/Workers para outbox, ingestas, generación y publicación de lotes, conciliaciones.
- Persistencia con Lucid ORM; migraciones versionadas.
- Middlewares para idempotencia y seguridad; servicios para WORM y evidencias.

## Alternativas consideradas
1) NestJS
- Pros: módulos y DI ricos, ecosistema grande.
- Contras: sobrecarga conceptual para el tamaño del equipo; integración adicional para ORM/rendimiento según patrones adoptados.

2) Express/Fastify + librerías
- Pros: máxima flexibilidad y rendimiento base alto.
- Contras: mayor esfuerzo en estandarizar estructura, DI, validación, testing y convenciones; riesgo de divergencia.

3) Hapi
- Pros: ecosistema maduro, seguridad.
- Contras: menor adopción reciente; menos material actualizado en TS para nuestro caso.

## Consecuencias
- (+) Curva de aprendizaje coherente con TypeScript e IoC; estructura consistente; productividad en CRUD/migraciones/tests.
- (+) Integración natural con nuestras decisiones: outbox, idempotencia, WORM, auditoría.
 - (+) Alineamiento directo entre escenarios de verificación del dominio y pruebas E2E (fixtures/factories, seeders, japas), reduciendo fricción entre negocio y QA.
- (–) Acoplamiento a Lucid ORM y convenciones de Adonis; requiere disciplina para modularizar dominios y aislar dependencias externas.

## Librerías y módulos recomendados (inicial)
- Archivos: `fast-csv` o `csv-parse`, `xlsx`.
- Almacenamiento: `aws-sdk` (S3), `@aws-sdk/client-s3` (v3) si aplicamos WORM fuerte.
- Validación: `ajv` (JSON Schema) para eventos; Zod opcional en capas internas.
- Observabilidad: `pino`, `@opentelemetry/api` / SDK Node.
- Seguridad: `helmet`, `rate-limiter-flexible`.
- Broker (según selección): `kafkajs`/`node-rdkafka`, `amqplib`, `nats`.

## Acciones
- Definir estructura base de módulos (dominio/infra/app) y convenciones (nombres, rutas, validación).
- Plantillas de middleware de idempotencia y servicios de Outbox, WORM y conciliación.
- Documentar guías de testing (Japa) y CI.
- Mantener catálogo de dependencias y versiones soportadas.
 - Completar especificación E2E y golden sets: `3_especificacion_tecnica/pruebas/01_e2e_replays.md`, `3_especificacion_tecnica/pruebas/02_golden_sets.md`.

## Preguntas abiertas
- ¿Broker de mensajería preferente (Kafka/Redpanda, RabbitMQ, NATS) y sus SLOs?
- ¿Lineamientos de observabilidad (niveles de log, trazas, muestreo)?
- ¿Criterios de selección para storage (S3/Azure/GCP) según requerimientos de WORM fuerte?

## Referencias
- arc42 §4, §5, §8
- ADR-002 (CRUD + eventos + auditoría)
- Especificaciones: `3_especificacion_tecnica/eventos-auditoria/*`, `3_especificacion_tecnica/integraciones/`, `3_especificacion_tecnica/operacion/02_idempotencia.md`
