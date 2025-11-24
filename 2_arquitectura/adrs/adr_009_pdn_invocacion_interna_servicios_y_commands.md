# ADR-009: Invocación interna de PDN vía Servicios (IoC) y Comandos/Jobs (sin APIs HTTP internas)

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto

Para los procesos de Otorgamiento (PDN-OTG-002) y Cálculo de Pago (PDN-PAG-002/003), se evaluó exponer APIs HTTP internas para los PDN versus invocar la lógica de negocio de forma interna mediante servicios registrados en el contenedor IoC de AdonisJS y su orquestación con Ace Commands/Jobs.

Fuerzas:
- Minimizar costo y complejidad (latencia HTTP, seguridad, versionado de contratos, idempotencia HTTP).
- Mantener una arquitectura idiomática de AdonisJS (IoC + Services + Validators, controladores delgados, Jobs/Commands reutilizando servicios).
- Asegurar idempotencia y auditabilidad con mecanismos de persistencia (locks/índices únicos) y ejecución reproducible.

## Decisión

- Invocar PDN internamente usando:
  - Servicios de aplicación registrados en IoC (p. ej., `OtorgamientoService`, `PagoService`) con DTOs tipados y validación VineJS donde aplique.
  - Comandos Ace y/o Jobs para orquestar procesos (p. ej., `pagar:calcular --periodo=AAAAMM`) reutilizando los mismos servicios.
- Reservar APIs HTTP para consumo externo/UX. No exponer APIs HTTP “internas” para PDN.
- Idempotencia para invocaciones internas mediante transacciones, `job_locks`, `dataset_hash` e índices únicos; no depender de `Idempotency-Key` HTTP.
- Observabilidad/auditoría: usar `ExecutionLogger` con `correlation_id`, registrar `marco_normativo_id` y `hash_ejecucion` en `LiquidacionDePago`, y emitir telemetría de cobertura: eventos de inicio/fin de `EDN` y aplicación de `RDN` (id y versión) correlacionados por `scenario_id/periodo/marco`.

## Alcance

- Aplica inicialmente a PDN-OTG-002 (otorgamiento y activación) y PDN-PAG-002/003 (PIM/PLI/redondeo); extensible a otros PDN mientras no exista necesidad de consumo externo directo.

## Alternativas consideradas

1) APIs HTTP internas para PDN (OpenAPI)
- Pros: contrato claro, pruebas de contrato, separación de concerns.
- Contras: overhead HTTP, seguridad y versionado de contratos; mayor superficie de ataque; idempotencia vía middleware adicional.

2) Orquestación por eventos/colas internas
- Pros: desacople temporal, reintentos nativos, escalabilidad.
- Contras: complejiza; requiere broker/infra y semántica de exactamente-una-vez; mayor esfuerzo en trazabilidad.

## Consecuencias

- (+) Menor complejidad; alineado con filosofía AdonisJS (IoC/Services/Jobs).
- (+) Reutilización de servicios desde controllers, jobs y commands; pruebas Japa más simples (in-memory).
- (+) Idempotencia y locking en capa de persistencia (determinismo en corridas).
- (–) Menos formalización de contratos HTTP internos (si se requiere exposición futura).
- (–) Si se necesita consumo externo, se deberá añadir una capa HTTP delgada sobre los mismos servicios (evolución prevista).

## Acciones

- Definir `OtorgamientoService` y `PagoService` con interfaces explícitas y validación de entradas.
- Implementar comandos Ace para PDN-OTG-002 y PDN-PAG-002/003 y jobs (si aplica) con `job_locks`.
- Añadir registros de `marco_normativo_id`, `hash_ejecucion` y `correlation_id` a `LiquidacionDePago`.
- Emite eventos/telemetría de `EDN` y `RDN` (id y versión) para validación de cobertura en BDD (ver ADR-013); conservar en logs/tabla de auditoría para trazabilidad.
- Pruebas Japa E2E invocando servicios/commands y validando contra golden sets.
- Si en el futuro se requieren APIs, generar controladores delgados y OpenAPI sobre estos servicios (sin duplicar lógica).

## Referencias

- ADR-002: CRUD + eventos + auditoría
- ADR-008: AdonisJS 6 como framework base
- `evaluacion_diseno.md`: §3.3 Runtime (Invocación de PDN), §4.5 Operación, §4.6 Pruebas
- arc42: §6 (Runtime), §8 (Conceptos), §10 (Calidad)
