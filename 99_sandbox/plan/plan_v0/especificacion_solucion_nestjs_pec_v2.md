# Especificación de Solución Técnica (v2 - Refinada)

**Fecha:** 2025-08-06
**Framework Base:** NestJS 11
**Propósito:** Servir como documento base para la planificación del proyecto, refinando la estimación de complejidad y recursos a partir del desglose cuantitativo del `indice_maestro.md`.

---

## 1. Resumen Ejecutivo

Esta segunda versión de la especificación técnica profundiza en la estimación de la complejidad del proyecto mediante un análisis cuantitativo de los artefactos definidos en el MDLO v2. Al contar el número de procesos, reglas, entidades e integraciones, podemos construir una **Descomposición de Trabajo (Work Breakdown Structure - WBS)** más precisa, lo que a su vez permite refinar la planificación de fases y la estructura del equipo de desarrollo.

La arquitectura base propuesta (NestJS 11, Prisma, DDD) se mantiene, pero ahora se sustenta con una visión clara de la magnitud de la implementación.

---

## 2. Análisis Cuantitativo del Dominio (Basado en `indice_maestro.md`)

El desglose de los artefactos del MDLO nos da una medida concreta del alcance del proyecto:

-   **Entidades de Dominio (`Anexo B`):** ~27 entidades principales y de soporte.
-   **Procesos de Negocio (PDN - `Anexo C`):** **50** en total.
    -   Otorgamiento (OTG): 7
    -   Mantenimiento (MANT): 17
    -   Corrección (COR): 4
    -   Pagos (PAG): 10
    -   Gestión Financiera (FIN): 4
    -   Reportería (REP): 4
    -   Monitoreo (MON): 8
    -   Gobernanza (GOB): 1
-   **Reglas de Negocio (RDN - `Anexo D`):** **41** en total.
    -   Validación (VALID): 9
    -   Cálculo (CALC): 20 (subdivididas en OTG, PIM, PLI, MANT, REP, FIN)
    -   Mapeo (MAP): 3+
    -   Ciclo de Vida (CICLO): 3
    -   Cumplimiento (CUMP): 6
    -   Comunicación (COMM): 1
-   **Interfaces Externas (`Anexo E`):** **8** sistemas externos principales.
-   **Escenarios de Verificación (`Anexo G`):** 40+ escenarios definidos, que servirán de base para el plan de QA.

---

## 3. Descomposición de Trabajo y Estimación de Complejidad (WBS)

Basándonos en el análisis cuantitativo, podemos asignar una complejidad más informada a los módulos de la solución. (S: Pequeño, M: Mediano, L: Grande, XL: Extra Grande)

| Módulo | Componente MDLO Asociado | Cantidad | Complejidad Estimada | Notas Clave |
| :--- | :--- | :--- | :--- | :--- |
| `ConfigModule` | Anexo J: Snapshots Normativos | 6+ | **M** | Crítico, bloqueador inicial. Debe ser robusto y testeado a fondo. |
| `DatabaseModule`| Anexo B: Entidades | ~27 | **L** | El modelado inicial en Prisma y las migraciones son complejas. Requiere un desarrollador senior. |
| `PecModule` | **Anexo C: PDN (Total)** | **50** | **XL** | **El corazón del sistema.** El alto número permite una gran paralelización del trabajo entre desarrolladores. |
| `PecModule` | **Anexo D: RDN (Total)** | **41** | **XL** | Lógica atómica muy compleja y crítica. Requiere pruebas unitarias exhaustivas para cada regla. |
| `PecModule` | Anexo H: Gobernanza (PDN-GOB) | 1 | **M** | Aunque es un solo proceso, su lógica de intervención humana y manejo de estados de incidentes es compleja. |
| `IntegrationModule`| Anexo E: Interfaces Externas | 8 | **L** | La complejidad varía por interfaz (SFTP vs. API). Puede ser paralelizado. |
| `SchedulerModule`| Anexo C: PDN (MON) | 8 | **M** | Requiere consultas de base de datos eficientes y manejo de concurrencia. |
| `Testing/QA` | Anexo G: Escenarios de Verificación | 40+ | **L** | La automatización de estos escenarios es un proyecto en sí mismo. |

---

## 4. Estimación de Equipo y Fases del Proyecto (Refinada)

La granularidad del WBS nos permite refinar la estructura del equipo y el plan de proyecto.

### 4.1. Roles y Tamaño del Equipo (Estimación Refinada)

-   **1x Tech Lead / Arquitecto de Software:** (Sin cambios) Responsable del diseño general, `ConfigModule` y el orquestador `PdnFactory`.
-   **6-8x Desarrolladores Backend (Senior/Mid-level):** **(Aumento sugerido)**. El alto grado de paralelismo posible (50 PDNs, 41 RDNs, 8 integraciones) justifica un equipo más grande para acortar el cronograma. Se pueden crear "squads" enfocados en dominios específicos (ej. Squad de Otorgamiento, Squad de Pagos).
-   **1x Ingeniero de Datos / DBA:** **(Nuevo rol sugerido)**. Dada la complejidad del `Anexo B` y la importancia de las consultas para los procesos de monitoreo, un especialista en Prisma y optimización de BBDD es altamente recomendable.
-   **1x Ingeniero DevOps:** (Sin cambios).
-   **2x Ingenieros de QA:** **(Aumento sugerido)**. La cantidad de escenarios de verificación y la criticidad de las reglas de cálculo justifican un equipo de QA más robusto desde el inicio.
-   **1x Analista de Negocio (BA) / Experto en Dominio:** (Sin cambios).
-   **1x Jefe de Proyecto / Scrum Master:** (Sin cambios).

### 4.2. Fases del Proyecto (Hoja de Ruta Detallada)

1.  **Fase 0: Fundación Arquitectónica (Sprint 0-2)**
    -   **Objetivo:** Construir el esqueleto de la aplicación y validar los patrones clave.
    -   **Tareas:** Setup del proyecto NestJS, CI/CD, `DatabaseModule` (migración de las ~27 entidades), `ConfigModule` (carga de los 6+ SNAs), implementación del orquestador `PdnFactory`.

2.  **Fase 1: MVP - Flujo de Otorgamiento de Indemnización (Sprint 3-5)**
    -   **Objetivo:** Implementar un flujo de negocio completo de punta a punta.
    -   **Tareas:** Implementar `PDN-OTG-001`, `PDN-OTG-002`, `PDN-OTG-003`. Esto implicará implementar las RDNs asociadas como `CALC-OTG-001` y las validaciones `VALID-OTORG-XXX`.

3.  **Fase 2: Expansión de Procesos Core (Sprint 6-15)**
    -   **Objetivo:** Implementar la mayoría de los procesos de negocio críticos en paralelo.
    -   **Stream 1 (Squad Pagos):** Implementar los **10 PDN de Pagos (PAG)** y sus RDNs asociadas (`CALC-PLI-XXX`).
    -   **Stream 2 (Squad Mantenimiento):** Implementar los **17 PDN de Mantenimiento (MANT)** y sus RDNs (`CICLO-XXX`, `CALC-MANT-XXX`).
    -   **Stream 3 (Squad Financiero/Corrección):** Implementar los **4 PDN de Gestión Financiera (FIN)** y los **4 PDN de Corrección (COR)**.

4.  **Fase 3: Integraciones y Monitoreo (Sprint 16-20)**
    -   **Objetivo:** Conectar el sistema con el mundo exterior y activar la proactividad.
    -   **Tareas:** Implementación en paralelo de las **8 interfaces** del `IntegrationModule`. Implementación de los **8 procesos de monitoreo** (`PDN-MON`) en el `SchedulerModule`.

5.  **Fase 4: Gobernanza y Reportería (Sprint 21-23)**
    -   **Objetivo:** Implementar los flujos de intervención humana y los informes regulatorios.
    -   **Tareas:** Desarrollo del `PDN-GOB-001` y sus interfaces asociadas. Implementación de los **4 PDN de Reportería (REP)**.

6.  **Fase 5: Pruebas End-to-End, UAT y Puesta en Marcha (Sprint 24-26)**
    -   **Objetivo:** Validar el sistema de forma integral y prepararlo para producción.
    -   **Tareas:** Ejecución de los **40+ escenarios de verificación** del `Anexo G` de forma automatizada y manual. Soporte a UAT, corrección de bugs, optimización y despliegue.

---

## 5. Conclusión

El desglose cuantitativo del `indice_maestro.md` revela la verdadera magnitud del proyecto. No es solo un sistema complejo en su lógica, sino también extenso en su funcionalidad. La estimación refinada sugiere la necesidad de un equipo de desarrollo más grande de lo inicialmente previsto para poder abordar el proyecto en un cronograma razonable, aprovechando la alta capacidad de paralelización que ofrece la estructura del dominio.

Esta especificación v2 proporciona una base sólida para que la Jefatura de Proyecto pueda construir un backlog detallado, asignar recursos a los diferentes streams de trabajo y comunicar el alcance del proyecto a los stakeholders con un mayor nivel de confianza.
