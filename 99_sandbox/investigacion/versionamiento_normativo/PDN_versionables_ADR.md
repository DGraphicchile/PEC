# Architecture Decision Record: 001 - Estrategia de Resolución de Servicios PDN Versionables

**Fecha:** 2025-08-08

**Estado:** Aceptado

## 1. Contexto

El proyecto PEC debe ejecutar diferentes versiones de múltiples Procesos de Negocio (PDN). El requisito clave es la capacidad de gestionar **"Snapshots Normativos"**. Un Snapshot Normativo representa un conjunto coherente de reglas y procesos válidos para un período o contexto específico (ej. "Normativa vigente en Q1 2025").

Esto implica que un Snapshot Normativo dicta qué versión específica de cada PDN debe ser utilizada. Por ejemplo:
* **Snapshot `SNAP-2025-Q1`** podría requerir:
    * `PDN-OTG-002` -> Versión `v1`
    * `PDN-PAG-003` -> Versión `v3`
* **Snapshot `SNAP-2025-Q2`** podría requerir:
    * `PDN-OTG-002` -> Versión `v2` (actualizado)
    * `PDN-PAG-003` -> Versión `v3` (sin cambios)

El sistema, por tanto, no resuelve una versión de PDN de forma aislada. Debe resolver la versión correcta en función de dos entradas: el **identificador del Snapshot Normativo** activo y el **código del PDN** a ejecutar. Se necesita una arquitectura que gestione esta lógica de mapeo de forma centralizada, mantenible y escalable.

## 2. Alternativas Consideradas

### 2.1. Alternativa 1: Resolución Directa en el Orquestador (Rechazada)

* **Descripción:** El orquestador sería responsable de toda la lógica de resolución. Esto implicaría:
    1.  Cargar y parsear un manifiesto o configuración de Snapshots Normativos.
    2.  Buscar el snapshot activo.
    3.  Dentro del snapshot, buscar el código del PDN para obtener el string de la versión requerida (ej. `v2`).
    4.  Construir el nombre del binding para el contenedor de IoC (ej. `pdn/PDN-OTG-002/v2`).
    5.  Llamar a `app.container.make()` para obtener el servicio.

* **Razones para el Rechazo:**
    * **Violación Extrema del Principio de Responsabilidad Única (SRP):** El orquestador, cuya función es dirigir el flujo de negocio, se vería sobrecargado con responsabilidades de gestión de configuración, parseo de archivos/DB y lógica de resolución de dependencias.
    * **Acoplamiento Crítico:** El orquestador estaría fuertemente acoplado a la estructura del manifiesto de snapshots y a la implementación del contenedor de IoC.
    * **Nula Reutilización:** Esta compleja lógica se tendría que duplicar o referenciar en cada parte del sistema que necesite ejecutar un PDN versionado, llevando a una pesadilla de mantenimiento.
    * **Complejidad en Pruebas:** Probar el orquestador se volvería extremadamente difícil, requiriendo mocks no solo del servicio final, sino de todo el sistema de configuración y del contenedor.

### 2.2. Alternativa 2: Servicio de Fábrica con Lógica de Snapshot (Aceptada)

* **Descripción:** Se introduce una capa de abstracción, un `PdnFactoryService`.
    1.  Se define un **Manifiesto de Snapshots** (ej. un archivo JSON o una tabla en la base de datos) que mapea los Snapshots Normativos a las versiones de cada PDN.
    2.  El `PdnFactoryService` carga y conoce este manifiesto.
    3.  El orquestador solo necesita saber el ID del Snapshot y el código del PDN. Llama a un método de la fábrica: `pdnFactory.getService(snapshotId, pdnCode)`.
    4.  Toda la lógica de búsqueda en el manifiesto y resolución del binding en el contenedor reside **dentro de la fábrica**.

## 3. Decisión

Se ha decidido implementar la **Alternativa 2: Servicio de Fábrica con Lógica de Snapshot**.

Esta decisión establece una arquitectura clara: el orquestador es el consumidor, la fábrica es el resolvedor inteligente, y el manifiesto es la fuente de verdad de la configuración.

## 4. Fundamentación

La introducción del requisito de "Snapshot Normativo" hace que la elección de la Alternativa 2 no solo sea preferible, sino **fundamental para el éxito y la mantenibilidad del proyecto**.

1.  **Centralización de Reglas de Negocio Críticas:** La asignación de qué versión de proceso corresponde a qué marco normativo es una regla de negocio de primer nivel. El `PdnFactoryService` se convierte en el guardián de esta lógica, proporcionando un único punto de verdad y control.

2.  **Configuración sobre Código (Configuration over Code):** El enfoque de fábrica promueve naturalmente el uso de un manifiesto externo. Esto es una ventaja inmensa. Un nuevo Snapshot Normativo puede ser habilitado **modificando la configuración (el manifiesto), sin necesidad de redesplegar el código de la aplicación**. Esto aumenta la agilidad y reduce el riesgo.

3.  **Desacoplamiento y Cohesión:** Se logra una separación de responsabilidades perfecta.
    * **Orquestador (Cohesión Alta):** Se enfoca 100% en el flujo de trabajo: `solicitar servicio -> ejecutar servicio -> manejar resultado`.
    * **Fábrica (Cohesión Alta):** Se enfoca 100% en la resolución: `recibir solicitud -> consultar manifiesto -> construir nombre de binding -> solicitar al contenedor`.
    * **Acoplamiento (Bajo):** El orquestador y la fábrica están desacoplados. El orquestador solo depende del contrato de la fábrica, no de su implementación interna.

4.  **Testabilidad y Simplicidad:** La complejidad de las pruebas se reduce drásticamente.
    * **Probar el Orquestador:** Se reduce a verificar que llama a la fábrica con el `snapshotId` y `pdnCode` correctos.
    * **Probar la Fábrica:** Se puede probar de forma aislada, proporcionándole un manifiesto falso y verificando que resuelve los nombres de binding correctos.

## 5. Consecuencias

* **Positivas:**
    * La arquitectura refleja directamente el modelo de negocio de "Snapshots Normativos".
    * El sistema es altamente mantenible y flexible; los cambios normativos se gestionan como configuración.
    * Se promueve una separación de responsabilidades limpia, adhiriéndose a principios de diseño robustos.
* **Requisitos Derivados:**
    * Se debe diseñar e implementar el **Manifiesto de Snapshots**. Se debe decidir si será un archivo de configuración (ej. `config/snapshots.ts`), un JSON, o tablas en la base de datos.
    * El `PdnFactoryService` debe ser implementado para cargar y cachear eficientemente este manifiesto.
    * El `PdnProvider` continuará registrando los bindings individuales (ej. `pdn/PDN-OTG-002/v2`), que actuarán como los "bloques de construcción" que la fábrica utilizará.