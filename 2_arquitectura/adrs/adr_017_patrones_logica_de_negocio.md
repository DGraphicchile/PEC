# ADR-017: Patrones para Implementación de Lógica de Negocio

- **Estado:** Propuesta
- **Fecha:** 2025-08-10

## Contexto

El sistema requiere un método estandarizado y robusto para implementar la lógica de negocio, especialmente para procesos complejos como el ciclo de vida de una `PrestacionEconomica`. Esta implementación debe ser segura, auditable, fácil de mantener y debe gestionar de forma limpia tanto la lógica principal como sus efectos secundarios (notificaciones, auditoría, etc.).

## Decisión

Se adopta un conjunto de patrones de diseño interrelacionados para gobernar la implementación de toda la lógica de negocio.

#### 1. Patrón de Acción (Command) y Máquina de Estados (FSM)

- **Responsabilidad:** Ejecutar la lógica de negocio principal de un Proceso de Negocio (PDN).
- **Implementación:** Cada PDN que implique una transición de estado se implementará como una clase `Action` (ej. `SuspenderPensionAction`). Un `StateTransitionService` centralizado orquestará la ejecución, validando las transiciones contra una Máquina de Estados Finita (FSM) definida de forma declarativa, tal como se especifica en `1_dominio/04_Modelo_de_Entidades.md`. La `Action` se enfoca exclusivamente en su lógica central.

#### 2. Patrón Observador (Observer) para Efectos Secundarios

- **Responsabilidad:** Gestionar las consecuencias y operaciones secundarias de un Proceso de Negocio.
- **Implementación:** Al completar su ejecución, la `Action` principal **emitirá un evento de dominio** a través del `emitter` de AdonisJS (ej. `pension:suspendida`). Clases `Listener` específicas (ej. `NotificacionListener`, `AuditoriaListener`) se suscribirán a estos eventos para ejecutar las tareas secundarias de forma desacoplada.

#### 3. Patrón Constructor (Builder) para Objetos Complejos

- **Responsabilidad:** Ensamblar entidades complejas con múltiples partes opcionales.
- **Implementación:** Se utilizará el patrón Builder para la creación de objetos como `LiquidacionDePago`, permitiendo una construcción paso a paso que resulta en un objeto final válido y consistente.

### Diagrama de Flujo de Interacción

```mermaid
sequenceDiagram
    participant C as Controller/Job
    participant STS as StateTransitionService
    participant A as Action (ej. SuspenderPensionAction)
    participant E as Emitter
    participant L as Listener (ej. NotificacionListener)

    C->>STS: solicitarTransicion(entidad, evento)
    STS->>A: new Action(entidad).execute()
    A->>E: emit('pension:suspendida', payload)
    E-->>L: on('pension:suspendida', ...)
    L->>: Realizar tarea secundaria (enviar email)
```

## Consecuencias

- **(+) Desacoplamiento:** La lógica principal (la `Action`) no conoce sus efectos secundarios, lo que facilita la extensibilidad.
- **(+) Claridad y Responsabilidad Única:** Cada clase (`Action`, `Listener`, `Builder`) tiene un propósito claro y acotado.
- **(+) Auditabilidad y Seguridad:** Las transiciones de estado son centralizadas y seguras, y los eventos emitidos crean un rastro auditable.
- **(-) Flujo Indirecto:** El desacoplamiento implica que el flujo de ejecución completo es menos directo de seguir, requiriendo la revisión de los listeners de eventos.

## Relación con Otros ADRs

- **Complementa `ADR-002 (CRUD + Eventos)`:** Mientras ADR-002 decide a alto nivel que existirán eventos, este ADR define el patrón (Observer) para su manejo dentro de la aplicación.
- **Complementa `ADR-009 (Invocación Interna)`:** Mientras ADR-009 decide que los PDN se invocan vía `Servicios`, este ADR define la implementación interna de dichos servicios (usando el `StateTransitionService` y las `Actions`).

