### ADR-009: Adopción de Patrones de Diseño para Lógica de Negocio y Comunicación entre Módulos

**Estado:** Aceptado

**Fecha:** 2025-08-09

#### **Contexto**

Una vez establecida la arquitectura para el gobierno normativo y las máquinas de estado, la aplicación aún enfrenta desafíos de diseño en áreas como:
1.  **Efectos Secundarios:** Una acción de negocio principal (ej. `ActivarPensionAction`) a menudo necesita desencadenar operaciones secundarias que no son parte de su responsabilidad central (ej. enviar un email de bienvenida, notificar a un sistema de reportería, actualizar una caché).
2.  **Creación de Objetos Complejos:** Entidades como `LiquidacionDePago` pueden tener una construcción compleja con muchas partes opcionales (diversos haberes y descuentos).
3.  **Comunicación Inter-Módulos:** Es necesario que los distintos dominios de la aplicación (ej. Otorgamiento, Pagos, Reportería) reaccionen a los sucesos de otros dominios sin crear un acoplamiento fuerte entre ellos.

Codificar estas lógicas directamente en las clases de Acción o en los servicios conduciría a un código "inflado", difícil de mantener y con responsabilidades mezcladas.

#### **Decisión**

Se ha decidido adoptar formalmente un conjunto de patrones de diseño probados para estructurar estas áreas de la aplicación, utilizando las herramientas que provee AdonisJS.

1.  **Patrón Observador (Observer Pattern):** Será el pilar para la comunicación desacoplada y la gestión de efectos secundarios. Se utilizará el **módulo de Eventos (`emitter`) nativo de AdonisJS**.
    *   **Implementación:** Las Acciones de negocio, al finalizar su operación principal, emitirán un evento con un payload relevante (ej. `emitter.emit('pension:activada', { pension })`).
    *   Módulos separados, llamados **Listeners** (ej. `NotificationListener`, `AuditListener`), se suscribirán a estos eventos y ejecutarán las tareas secundarias correspondientes (enviar email, registrar en auditoría, etc.).

2.  **Patrón Constructor (Builder Pattern):** Se utilizará para el ensamblaje de objetos complejos y con múltiples estados, como `LiquidacionDePago`. Esto centralizará y simplificará la lógica de construcción de estas entidades.

3.  **Patrón Fábrica (Factory Pattern):** Se continuará utilizando el contenedor de inyección de dependencias de AdonisJS (`app.container.make`) como una implementación avanzada de este patrón para la instanciación de clases, especialmente las `Acciones` y Servicios.

4.  **Patrón Fachada (Facade Pattern):** Se reconoce que servicios como `StateTransitionService` ya actúan como una Fachada, y se mantendrá este enfoque para proveer interfaces simples a subsistemas complejos.

5.  **Scaffolding Personalizado para Patrones Arquitectónicos:** Para asegurar la correcta y eficiente adopción de nuestros patrones, se utilizará la funcionalidad de **Stubs** de AdonisJS para crear nuestros propios comandos `ace`.
    *   **`make:action`**: Generará el esqueleto de una clase de Acción, implementando nuestra `BaseAction` y lista para rellenar. Esto estandariza la implementación de los **PDN**.
    *   **`make:rule`**: Generará el esqueleto para una **RDN**, potencialmente con diferentes plantillas según el tipo de regla (ej. `--type=validation` o `--type=calculation`).

#### **Consecuencias**

**Positivas:**
*   **Máximo Desacoplamiento:** La lógica de negocio principal queda aislada de sus efectos secundarios.
*   **Alta Extensibilidad:** Añadir nuevas funcionalidades se reduce a crear nuevos Listeners o Acciones sin modificar el código existente.
*   **Código Más Limpio y Enfocado:** Las clases se mantienen pequeñas y con una única responsabilidad.
*   **Procesamiento Asíncrono:** El Patrón Observador facilita la ejecución de tareas en segundo plano.
*   **Productividad y Consistencia del Desarrollador:** El scaffolding personalizado asegura que todos los componentes de nuestra arquitectura se construyan de manera uniforme y rápida, reduciendo errores y haciendo que seguir la arquitectura sea el camino más fácil.

**Negativas:**
*   **Flujo de Control Indirecto:** La lógica puede ser más difícil de trazar, ya que salta de eventos a listeners.
*   **Gestión de Eventos:** Requiere mantener un registro de los eventos y sus contratos de datos.

#### **Justificación**

La adopción de estos patrones es fundamental para construir una aplicación moderna, escalable y mantenible. Los beneficios de tener módulos autónomos y herramientas de desarrollo a medida superan con creces la complejidad de un flujo de control indirecto, permitiendo que el sistema evolucione de forma segura y eficiente.