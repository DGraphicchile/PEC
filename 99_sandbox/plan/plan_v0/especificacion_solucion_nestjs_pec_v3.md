# Especificación de Solución Técnica (v3 - Definitiva)

**Fecha:** 2025-08-06
**Framework Base:** NestJS 11 (Seleccionado)
**Propósito:** Servir como el documento técnico fundamental para la planificación y ejecución del proyecto de desarrollo, detallando la arquitectura y la descomposición del trabajo sobre la plataforma NestJS.

---

## 1. Resumen Ejecutivo

Tras una evaluación de alternativas, se ha seleccionado **NestJS 11** como el framework de backend para la implementación del sistema de Prestaciones Económicas (PEC). Esta decisión se basa en su robusta arquitectura modular, su potente sistema de Inyección de Dependencias (DI) y su excelente alineación con los principios de Domain-Driven Design (DDD), los cuales son críticos para manejar la complejidad del MDLO v2.

Este documento consolida y detalla la arquitectura de la solución sobre NestJS. Sirve como la **fuente única de verdad técnica** para el equipo de desarrollo, permitiendo construir un backlog detallado, definir hitos de proyecto y asignar recursos de manera eficiente.

---

## 2. Principios Arquitectónicos

La solución se regirá por los siguientes principios para garantizar la mantenibilidad, escalabilidad y auditabilidad exigidas por el dominio.

-   **Arquitectura Modular (NestJS):** El sistema se organizará en módulos de NestJS cohesivos y débilmente acoplados. Cada módulo encapsulará una capacidad de negocio específica (ej. `ConfigModule`, `PecModule`, `IntegrationModule`).
-   **Domain-Driven Design (DDD):** El código reflejará directamente el lenguaje y la estructura del MDLO. Las entidades, procesos (PDN), etapas (EDN) y reglas (RDN) serán artefactos de primera clase en la arquitectura.
-   **Clean Architecture:** Se mantendrá una estricta separación de capas: Controladores (API), Servicios (Lógica de Negocio) y Repositorios (Acceso a Datos).
-   **Configuración como Código:** Los Snapshots Normativos (SNA) del `Anexo J` se tratarán como archivos de configuración versionados, cargados en tiempo de ejecución para gobernar el comportamiento del sistema.
-   **ORM y Base de Datos:** Se utilizará **Prisma** como ORM por su alta seguridad de tipos, lo que es crucial para manejar el complejo modelo de datos del MDLO.
-   **Testeabilidad como Requisito de Diseño:** La arquitectura debe facilitar la prueba en todos los niveles. Se utilizará el `TestingModule` de NestJS para pruebas unitarias y de integración aisladas. La implementación de los escenarios de negocio del `Anexo G` será un objetivo de primer nivel, guiando el diseño de los servicios para que sean fácilmente testeables de extremo a extremo.

---

## 3. Descomposición de Trabajo y Estimación de Complejidad (WBS)

La descomposición cuantitativa del dominio (50 PDNs, 41 RDNs, 27+ entidades, 8 integraciones) se mantiene como la base para la estimación.

| Módulo | Componente MDLO Asociado | Cantidad | Complejidad Estimada | Notas Clave |
| :--- | :--- | :--- | :--- | :--- |
| `ConfigModule` | Anexo J: Snapshots Normativos | 6+ | **M** | Crítico, bloqueador inicial. Debe ser robusto y testeado a fondo. |
| `DatabaseModule`| Anexo B: Entidades | ~27 | **L** | El modelado inicial en Prisma y las migraciones son complejas. Requiere un desarrollador senior. |
| `PecModule` | **Anexo C: PDN (Total)** | **50** | **XL** | **El corazón del sistema.** El alto número permite una gran paralelización del trabajo entre desarrolladores. |
| `PecModule` | **Anexo D: RDN (Total)** | **41** | **XL** | Lógica atómica muy compleja y crítica. Requiere pruebas unitarias exhaustivas para cada regla. |
| `PecModule` | Anexo H: Gobernanza (PDN-GOB) | 1 | **M** | Aunque es un solo proceso, su lógica de intervención humana y manejo de estados de incidentes es compleja. |
| `IntegrationModule`| Anexo E: Interfaces Externas | 8 | **L** | La complejidad varía por interfaz (SFTP vs. API). Puede ser paralelizado. |
| `SchedulerModule`| Anexo C: PDN (MON) | 8 | **M** | Requiere consultas de base de datos eficientes y manejo de concurrencia. |
| `TestingModule` | Anexo G: Escenarios de Verificación | 40+ | **L** | **(Nuevo Módulo Lógico)**. Representa el esfuerzo de crear una librería de utilidades de testing para data factories y seeding, esencial para la estrategia de QA. |

---

## 4. Estimación de Equipo y Fases del Proyecto (Plan Definitivo)

### 4.1. Roles y Tamaño del Equipo

-   **1x Tech Lead / Arquitecto de Software:** Responsable del diseño general, `ConfigModule` y el orquestador `PdnFactory`. Debe tener experiencia probada en NestJS.
-   **6-8x Desarrolladores Backend (Senior/Mid-level):** Con experiencia deseable en NestJS y Prisma. Se organizarán en squads por dominio (ej. Otorgamiento, Pagos, Mantenimiento).
-   **1x Ingeniero de Datos / DBA:** Especialista en Prisma y optimización de BBDD.
-   **1x Ingeniero DevOps:** Responsable de infraestructura, CI/CD y configuración de integraciones seguras.
-   **2x Ingenieros de QA / SDETs:** Con experiencia en automatización de pruebas en TypeScript (ej. con Jest y Playwright/Cypress para E2E). Serán responsables de implementar el `TestingModule` lógico.
-   **1x Analista de Negocio (BA) / Experto en Dominio:** (Sin cambios).
-   **1x Jefe de Proyecto / Scrum Master:** (Sin cambios).

### 4.2. Fases del Proyecto (Hoja de Ruta Detallada)

1.  **Fase 0: Fundación Arquitectónica y de Testing (Sprint 0-3)**
    -   **Objetivo:** Construir el esqueleto de la aplicación, validar patrones y **crear las herramientas de prueba**.
    -   **Tareas:**
        -   Setup del proyecto NestJS, CI/CD, `DatabaseModule` (migraciones), `ConfigModule` (carga de SNA), implementación del orquestador `PdnFactory`.
        -   **Tarea Crítica:** Desarrollo de un **`TestUtilsModule` interno**. Este módulo proveerá **factories de datos** para las entidades de Prisma y **utilidades de seeding** para poblar la base de datos de pruebas de forma programática. Su objetivo es estandarizar y acelerar la escritura de pruebas para los escenarios del `Anexo G`.

2.  **Fase 1: MVP - Flujo de Otorgamiento de Indemnización (Sprint 4-6)**
    -   **Objetivo:** Implementar un flujo de negocio completo de punta a punta, validado con pruebas automatizadas que usen el `TestUtilsModule`.
    -   **Tareas:** Implementar `PDN-OTG-001`, `PDN-OTG-002`, `PDN-OTG-003` y sus RDNs asociadas. Crear las pruebas de aceptación automatizadas para los `EVP` correspondientes.

3.  **Fase 2: Expansión de Procesos Core (Sprint 7-16)**
    -   **Objetivo:** Implementar la mayoría de los procesos de negocio críticos en paralelo.
    -   **Stream 1 (Squad Pagos):** Implementar los **10 PDN de Pagos (PAG)**.
    -   **Stream 2 (Squad Mantenimiento):** Implementar los **17 PDN de Mantenimiento (MANT)**.
    -   **Stream 3 (Squad Financiero/Corrección):** Implementar los **4 PDN de Gestión Financiera (FIN)** y los **4 PDN de Corrección (COR)**.
    -   *Nota: Cada tarea de implementación de un PDN debe ir acompañada de la implementación de sus pruebas unitarias (RDN) y de integración (EDN) correspondientes.*

4.  **Fase 3: Integraciones y Monitoreo (Sprint 17-21)**
    -   **Objetivo:** Conectar el sistema con el mundo exterior y activar la proactividad.
    -   **Tareas:** Implementación en paralelo de las **8 interfaces** del `IntegrationModule`, con mocks para pruebas. Implementación de los **8 procesos de monitoreo** (`PDN-MON`).

5.  **Fase 4: Gobernanza y Reportería (Sprint 22-24)**
    -   **Objetivo:** Implementar los flujos de intervención humana y los informes regulatorios.
    -   **Tareas:** Desarrollo del `PDN-GOB-001`. Implementación de los **4 PDN de Reportería (REP)**.

6.  **Fase 5: Pruebas End-to-End, UAT y Puesta en Marcha (Sprint 25-27)**
    -   **Objetivo:** Validar el sistema de forma integral y prepararlo para producción.
    -   **Tareas:** Ejecución completa de los **40+ escenarios de verificación** del `Anexo G`. Soporte a UAT, corrección de bugs, optimización y despliegue.

---

## 5. Conclusión

La selección de NestJS 11 como framework y la incorporación de una estrategia de testing explícita desde la Fase 0 proporcionan una base sólida para afrontar la considerable complejidad del sistema PEC. La estructura modular y la descomposición del trabajo aquí presentadas deben guiar la creación del backlog del producto y la planificación de sprints, permitiendo un desarrollo paralelo, controlado y de alta calidad, mitigando los riesgos inherentes a un proyecto de esta magnitud.
