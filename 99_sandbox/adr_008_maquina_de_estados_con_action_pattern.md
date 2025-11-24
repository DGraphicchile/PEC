### ADR-008: Implementación de la Máquina de Estados con el Patrón de Acción (Command)

**Estado:** Aceptado

**Fecha:** 2025-08-09

#### **Contexto**

Las entidades centrales de la aplicación, como `PrestacionEconomica`, tienen ciclos de vida complejos con múltiples estados (ej. `Activa`, `Suspendida`, `Cesada`) y reglas de transición estrictas.

Gestionar estos cambios de estado directamente en los controladores o en métodos de servicio dispersos presenta varios riesgos:
1.  **Lógica Duplicada:** La lógica para cambiar un estado podría repetirse en diferentes partes del sistema.
2.  **Inconsistencias:** Es fácil cometer errores y permitir transiciones inválidas (ej. pasar de `Cesada` a `Activa`), corrompiendo la integridad de los datos.
3.  **Baja Auditabilidad:** Es difícil tener una visión clara y centralizada de todas las reglas que gobiernan el ciclo de vida de una entidad.
4.  **Dificultad para Implementar Funcionalidades Clave:** Acciones como "Deshacer" (Undo) o agrupar operaciones en una sola transacción se vuelven extremadamente complejas de implementar de manera segura.

Se necesita un patrón de diseño robusto, centralizado y seguro para gobernar estas transiciones de estado.

#### **Decisión**

Hemos decidido implementar una **Máquina de Estados Finita (FSM)** formal para gestionar el ciclo de vida de las entidades clave. La ejecución de las acciones asociadas a cada transición de estado se implementará utilizando el **Patrón de Comando**, al que nos hemos referido como **Action Pattern**.

La arquitectura se compondrá de los siguientes elementos:

1.  **Definición Declarativa de la Máquina de Estados:** Un artefacto de configuración (ej. un objeto TypeScript) que define explícitamente todos los estados, los eventos que gatillan transiciones y las reglas para cada transición. Mapea `(Estado Actual, Evento) -> (Condición, Acción, Nuevo Estado)`.

2.  **Clases de Acción (`Action`):** Cada operación que modifica el estado (ej. `SuspenderPensionAction`, `CesarPensionAction`) se encapsulará en su propia clase autocontenida. Estas clases implementarán una interfaz común con un método `execute()` y, opcionalmente, un método `undo()`.

3.  **Un `StateTransitionService` Centralizado:** Un único servicio que actúa como el motor de la máquina de estados. Su responsabilidad es recibir una entidad y un evento, validar la transición según la definición, instanciar y ejecutar la `Acción` correspondiente, y persistir el nuevo estado de la entidad.

Los controladores y otros servicios no modificarán el estado de una entidad directamente. En su lugar, invocarán al `StateTransitionService` informando el evento de negocio que ha ocurrido.

#### **Consecuencias**

**Positivas:**
*   **Lógica de Transición Centralizada:** All rules for state changes are in one place, preventing inconsistencies.
*   **Seguridad:** Es imposible forzar una transición inválida. El sistema la rechazará.
*   **Desacoplamiento:** Los Controladores se simplifican enormemente; solo necesitan disparar eventos de negocio, sin conocer la lógica de estado interna.
*   **Auditabilidad Mejorada:** El log de eventos y transiciones ejecutadas forma un rastro de auditoría claro y completo. La definición de la máquina de estados sirve como documentación viva.
*   **Testeabilidad:** Las Acciones son fáciles de probar unitariamente. La lógica de transición en el `StateTransitionService` también se puede probar de forma aislada.
*   **Capacidades Avanzadas:** Se habilita de forma nativa la funcionalidad de Deshacer/Rehacer (Undo/Redo) y la composición de acciones complejas (Macros).

**Negativas:**
*   **Mayor Abstracción Inicial:** Introduce una capa de indirección. Los desarrolladores necesitan entender el patrón y el flujo a través del `StateTransitionService` en lugar de una llamada a un servicio directo.
*   **Boilerplate/Trabajo Inicial:** Requiere la creación de más archivos al principio (la definición de la máquina, las clases de Acción individuales).

#### **Justificación**

A pesar de la ligera complejidad inicial, los beneficios a largo plazo en mantenibilidad, seguridad y flexibilidad superan con creces la complejidad inicial. Este patrón es ideal para sistemas regulatorios complejos que evolucionan con el tiempo. Proporciona una solución robusta para los requisitos de auditoría y la capacidad de deshacer operaciones críticas, lo que reduce el riesgo operacional.