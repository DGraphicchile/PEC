### ADR-010: Estrategia de Scaffolding Personalizado para el Dominio

**Estado:** Aceptado

**Fecha:** 2025-08-09

#### **Contexto**

El proyecto se basa en una arquitectura de software específica y bien definida, documentada en ADRs anteriores (ADR-008, ADR-009). Esta arquitectura utiliza un conjunto de patrones de diseño (Action, State Machine, Observer, RDN, Service, Builder, etc.) para asegurar que el sistema sea robusto, mantenible y escalable.

Sin herramientas de desarrollo a medida, la implementación de estos patrones requeriría que los desarrolladores creen manualmente la estructura de archivos y el código repetitivo para cada nuevo componente. Este proceso manual es lento, propenso a errores y puede llevar a inconsistencias que erosionen la integridad de la arquitectura con el tiempo.

Para maximizar la productividad y asegurar la adherencia a los patrones definidos, necesitamos un conjunto de herramientas que haga que "la forma correcta" sea también "la forma más fácil".

#### **Decisión**

Se ha decidido implementar una **suite completa de herramientas de scaffolding personalizado** utilizando los sistemas de **Comandos (`ace`) y Plantillas (`Stubs`)** de AdonisJS.

Se creará un comando `make:*` específico para cada componente repetitivo de nuestra arquitectura. Estos comandos automatizarán la creación de archivos, la estructura de clases, las importaciones necesarias y la documentación inicial, permitiendo a los desarrolladores centrarse exclusivamente en la lógica de negocio.

La suite de scaffolding incluirá, como mínimo, los siguientes generadores:

1.  **`make:action <NombreProceso>`**
    *   **Propósito:** Generar el esqueleto para un **Proceso de Negocio (PDN)**, implementado como una clase de Acción.
    *   **Stub:** `stubs/action.stub`
    *   **Resultado:** Una clase que implementa `BaseAction`, con métodos `execute`/`undo` y un validador listos para ser completados.

2.  **`make:rule <ID_Regla>`**
    *   **Propósito:** Generar el esqueleto para una **Regla de Negocio (RDN)**.
    *   **Flags:** `--type=<tipo>` (validation, calculation, lifecycle), `--description="..."`.
    *   **Stubs:** `stubs/rdn/validation.stub`, `stubs/rdn/calculation.stub`, `stubs/rdn/lifecycle.stub`.
    *   **Resultado:** Un archivo en el subdirectorio correcto (`app/Rules/Calculations`, etc.) con la función y la firma adecuadas para el tipo de regla, y con comentarios JSDoc autogenerados.

3.  **`make:test <ID_Escenario>`**
    *   **Propósito:** Generar un archivo de prueba para un **Escenario de Verificación (EV)** del MDLO.
    *   **Flags:** `--group="..."`, `--description="..."`.
    *   **Stub:** `stubs/test.stub`.
    *   **Resultado:** Un archivo de prueba de Japa (`.spec.ts`) con la estructura BDD (Given/When/Then) y enlaces al escenario de negocio del MDLO.

4.  **`make:adr "<Título>"`**
    *   **Propósito:** Generar un nuevo **Registro de Decisión de Arquitectura (ADR)**.
    *   **Stub:** `stubs/adr.stub`.
    *   **Resultado:** Un nuevo archivo Markdown en `mvp/` con la plantilla estándar de un ADR (Contexto, Decisión, Consecuencias).

5.  **`make:service <NombreModelo>`**
    *   **Propósito:** Generar una clase de **Servicio** para encapsular la lógica de acceso a datos.
    *   **Stub:** `stubs/service.stub`.
    *   **Resultado:** Una clase de Servicio en `app/Services/` con el esqueleto básico para inyectar un modelo de Lucid y definir métodos de consulta.

6.  **`make:builder <NombreObjeto>`**
    *   **Propósito:** Generar una clase que implemente el **Patrón Constructor (Builder)**.
    *   **Stub:** `stubs/builder.stub`.
    *   **Resultado:** Una clase en `app/Builders/` con la estructura estándar del patrón (constructor, métodos `with...`, método `build()`), ideal para objetos complejos como `LiquidacionDePago`.

#### **Consecuencias**

**Positivas:**
*   **Productividad Acelerada:** Se reduce drásticamente el tiempo necesario para iniciar una nueva tarea de desarrollo.
*   **Consistencia Arquitectónica Forzada:** Se garantiza que todos los componentes del sistema sigan la misma estructura y convenciones, previniendo la desviación de la arquitectura definida.
*   **Reducción de Errores:** La automatización del código repetitivo minimiza la posibilidad de errores por distracción, como typos o importaciones incorrectas.
*   **Curva de Aprendizaje Suavizada:** Las herramientas guían a los nuevos desarrolladores, enseñándoles en la práctica cómo se deben construir los diferentes componentes del sistema.
*   **Fomento de Buenas Prácticas:** Se pueden incorporar prácticas como la documentación (JSDoc) y la estructura de pruebas directamente en las plantillas.

**Negativas:**
*   **Inversión Inicial en Herramientas:** Se requiere un esfuerzo inicial para desarrollar y mantener esta suite de comandos y stubs.
*   **Mantenimiento de Tooling:** Si la arquitectura evoluciona, las herramientas de scaffolding deben ser actualizadas en consecuencia.

#### **Justificación**

La inversión inicial en la creación de esta suite de scaffolding personalizado es fundamental para la escalabilidad y la salud a largo plazo del proyecto. Transforma la arquitectura de una serie de documentos teóricos a un conjunto de prácticas reforzadas por herramientas, haciendo que el flujo de trabajo del desarrollador sea más rápido, fácil y seguro. Esto es esencial para mantener la calidad y la consistencia a medida que la aplicación y el equipo crecen.