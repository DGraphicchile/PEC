# Plan de Desarrollo Detallado: Proyecto PEC2

**Versión:** 1.2 (Mejorada)
**Fecha:** 2025-08-10
**Autor:** Gemini

---

## 1. Resumen Ejecutivo

Este documento presenta el plan de desarrollo detallado para el sistema de Prestaciones Económicas (PEC2). El objetivo principal de la Fase 1 es lograr un reemplazo funcional robusto y auditable del sistema iSeries actual, sentando las bases para futuras evoluciones.

El plan está estructurado en **Épicas** que representan grandes bloques de funcionalidad de negocio. Cada épica se desglosa en **Historias de Usuario** específicas, que constituirán los elementos de trabajo del equipo de desarrollo.

La ejecución se guiará por una **metodología Agile (Scrum)**, con entregas incrementales al final de cada sprint para permitir la validación continua y la adaptación del plan.

---

## 2. Roles y Metodología

### 2.1. Roles del Equipo

-   **Product Owner:** Responsable de definir y priorizar el backlog, representar a los stakeholders del negocio y validar que las entregas cumplen con los criterios de aceptación.
-   **Scrum Master:** Facilita el proceso Agile, elimina impedimentos y asegura que el equipo pueda trabajar de la manera más eficiente posible.
-   **Tech Lead / Arquitecto:** Responsable de las decisiones técnicas, la calidad del código, la coherencia de la arquitectura y de guiar al equipo de desarrollo.
-   **Equipo de Desarrollo:** Equipo multifuncional responsable de analizar, diseñar, implementar y probar las historias de usuario.

### 2.2. Metodología de Trabajo

-   **Framework:** Scrum.
-   **Duración del Sprint:** 2 semanas.
-   **Ceremonias Clave:**
    -   **Sprint Planning:** Al inicio de cada sprint, para seleccionar y comprometer las historias de usuario a desarrollar.
    -   **Daily Standup:** Reunión diaria de 15 minutos para sincronizar al equipo.
    -   **Sprint Review:** Al final del sprint, para demostrar la funcionalidad completada a los stakeholders.
    -   **Sprint Retrospective:** Al final del sprint, para que el equipo reflexione y mejore su proceso de trabajo.

---

## 3. Roadmap de Desarrollo por Épicas

El proyecto se organiza en las siguientes épicas, que agrupan funcionalmente los objetivos del MVP. Se añade una épica transversal para la Calidad y Verificación.

-   **Épica 1: Fundación y Cimientos Técnicos**
-   **Épica 2: Ciclo de Vida Básico del Beneficio**
-   **Épica 3: Ingesta y Procesamiento de Datos Externos**
-   **Épica 4: Gestión de Mantenimientos Críticos**
-   **Épica 5: Motor de Cálculo y Generación de Pagos (Desglosada)**
-   **Épica 6: Gestión de Sobrevivencia y Múltiples Beneficiarios**
-   **Épica 7: Reportería Regulatoria Esencial**
-   **Épica 8 (Nueva): Calidad y Verificación BDD**

---

## 4. Desglose de Épicas en Historias de Usuario (Con Mejoras)

*Nota sobre la implementación: Con la adopción de `ADR-017`, el trabajo para implementar una historia de usuario de negocio implicará la orquestación de varios patrones. Típicamente, esto incluirá la creación o modificación de una clase `Action` para la lógica principal, la emisión de un `Evento` de dominio, y la creación de `Listeners` para manejar los efectos secundarios. Las herramientas de scaffolding (`ADR-018`) están diseñadas para facilitar este flujo de trabajo.*

### Épica 1: Fundación y Cimientos Técnicos

*Objetivo: Construir la infraestructura, seguridad y patrones de código base sobre los cuales se desarrollará el resto del sistema.*

-   **HU-001:** Como *Tech Lead*, quiero configurar el pipeline de **Integración Continua y Despliegue Continuo (CI/CD)**, para asegurar que cada cambio sea probado y desplegado de forma automática y segura.
-   **HU-002:** Como *Desarrollador*, quiero implementar el **esquema inicial de la base de datos** con las entidades principales del dominio (Persona, PrestacionEconomica, etc.), para tener la estructura de persistencia lista.
-   **HU-003:** Como *Arquitecto*, quiero implementar el **FrameworkResolverService (`ADR-003`)**, para asegurar que todo cálculo futuro pueda anclarse a un `MarcoNormativo` versionado.
-   **HU-004:** Como *Desarrollador*, quiero establecer el **patrón de idempotencia (`ADR-006`)** y el servicio de **registro de evidencias (`ADR-007`)**, para garantizar la robustez y auditabilidad de las operaciones desde el inicio.
-   **HU-005:** Como *Desarrollador*, quiero un comando `make:action` para generar el esqueleto de un Proceso de Negocio (PDN), para acelerar el desarrollo y asegurar consistencia.
-   **HU-006:** Como *Desarrollador*, quiero un comando `make:listener` para generar clases suscritas a eventos, para implementar efectos secundarios de forma estandarizada.
-   **HU-007:** Como *Desarrollador*, quiero comandos `make:rule` y `make:builder` para generar Reglas de Negocio y Builders, para reducir el código repetitivo y minimizar errores.

### Épica 2: Ciclo de Vida Básico del Beneficio

*Objetivo: Implementar la capacidad de crear una prestación y gestionar sus estados más comunes (activo, cesado, suspendido).*

-   **HU-101:** Como *Analista de Negocio*, quiero que el sistema pueda **otorgar una nueva prestación económica (`PDN-OTG-002`)** con sus datos iniciales, para registrar un nuevo beneficio en el sistema.
-   **HU-102:** Como *Operador*, quiero que el sistema procese automáticamente el archivo del **Registro Civil (`INT-REGCIVIL-001`)** para **cesar las pensiones por fallecimiento**, para mantener la data de beneficiarios actualizada y evitar pagos indebidos.
-   **HU-103:** Como *Operador*, quiero que el sistema utilice el archivo del Registro Civil para **cesar pensiones de viudez por nuevo vínculo (`PDN-MANT-010`)**, para cumplir con la normativa vigente.
-   **HU-104 (Nueva - Spike de Análisis):** Como *Arquitecto*, quiero **analizar y validar el modelo de datos de `PrestacionEconomica` y `LiquidacionDePago` contra un escenario de corrección retroactiva (`PDN-COR-001`)**, para asegurar que el diseño de la Fase 1 soportará las reliquidaciones de la Fase 2.

### Épica 3: Ingesta y Procesamiento de Datos Externos

*Objetivo: Automatizar la carga de archivos de entidades externas que son necesarios para el cálculo de la liquidación mensual.*

-   **HU-201:** Como *Sistema*, quiero ingestar y transformar el archivo del **IPS (`INT-IPS-001`)**, para incorporar los datos de la PGU y otros beneficios estatales a la ficha de la persona.
-   **HU-202:** Como *Sistema*, quiero ingestar y transformar el archivo de **SIVEGAM (`INT-SIVEGAM-001`)**, para actualizar las cargas y tramos de Asignación Familiar.
-   **HU-203:** Como *Sistema*, quiero ingestar y transformar el archivo de **FONASA (`INT-FONASA-001`)**, para registrar los descuentos por préstamos médicos.
-   **HU-204:** Como *Sistema*, quiero ingestar y transformar los archivos de las **CCAF (`INT-CCAF-001`)**, para registrar los descuentos por créditos sociales.

### Épica 4: Gestión de Mantenimientos Críticos

*Objetivo: Dotar al sistema de la capacidad de gestionar cambios y eventos comunes en la vida de una prestación que son críticos para la operación.*

-   **HU-401:** Como *Operador*, quiero **reactivar una pensión de orfandad (`PDN-MANT-003`)** cuando se recibe un certificado de estudios válido, para reanudar los pagos suspendidos.
-   **HU-402:** Como *Analista Legal*, quiero registrar y aplicar **acuerdos de pago como retenciones judiciales (`PDN-MANT-009`)**, para cumplir con las órdenes de los tribunales.
-   **HU-403:** Como *Analista Médico*, quiero aplicar una **revisión de incapacidad por agravamiento (`PDN-MANT-004`)**, para ajustar el monto de un beneficio según la nueva condición del paciente.

### Épica 5: Motor de Cálculo y Generación de Pagos (Anteriormente Épica 4)

*Objetivo: Implementar el corazón financiero del sistema. **Se desglosa la HU principal para reflejar su complejidad real.***

-   **HU-501 (Antes HU-301, ahora desglosada):**
    -   **HU-501.1:** Como *Sistema*, quiero implementar el **cálculo de una liquidación individual (`PDN-PAG-003`)**, aplicando haberes y descuentos para una única prestación.
        -   ***Criterio de Aceptación Clave:*** *La lógica debe ser probada contra el `MarcoNormativo` vigente y, al menos, un `MarcoNormativo` histórico relevante para validar la correcta resolución de versiones.*
    -   **HU-501.2:** Como *Sistema*, quiero implementar el **orquestador de ejecución masiva (`PDN-PAG-001`)** que procese todas las prestaciones activas, gestionando checkpoints y reintentos para casos fallidos.
    -   **HU-501.3:** Como *Desarrollador*, quiero **optimizar el rendimiento del lote de pago mensual** para asegurar que se complete dentro de la ventana operativa definida (ver NFRs).
-   **HU-502 (Antes HU-302):** Como *Sistema*, quiero generar el **archivo de nómina de pago para el Banco de Chile (`INT-BCH-001`)**.
-   **HU-503 (Antes HU-303):** Como *Sistema*, quiero generar el **archivo de cotizaciones para PREVIRED (`INT-PREVIRED-001`)**.
-   **HU-504 (Antes HU-304):** Como *Sistema*, quiero generar el **comprobante de contabilización para SAP (`INT-SAP-001`)**.

### Épica 6: Gestión de Sobrevivencia y Múltiples Beneficiarios

*Objetivo: Implementar la lógica para distribuir una pensión entre varios beneficiarios, como en el caso de una viuda e hijos.*

-   **HU-501:** Como *Sistema*, quiero **calcular y distribuir una pensión de sobrevivencia (`PDN-OTG-006`)** entre múltiples beneficiarios, aplicando los porcentajes de prorrata correctos según la ley.
-   **HU-502:** Como *Sistema*, quiero **recalcular y ajustar los porcentajes (`PDN-MANT-012`)** de las pensiones de un grupo de sobrevivencia cuando uno de los beneficiarios cesa en su derecho.

### Épica 7: Reportería Regulatoria Esencial

*Objetivo: Cumplir con las obligaciones de reportería mínimas para poder operar legalmente.*

-   **HU-601:** Como *Analista de Cumplimiento*, quiero que el sistema genere el **informe regulatorio GRIS R01 para SUSESO (`PDN-REP-004`)**, para informar sobre las pensiones vigentes.

### Épica 8 (Nueva): Calidad y Verificación BDD

*Objetivo: Asegurar que la funcionalidad desarrollada se alinee con la especificación ejecutable (BDD) y los requisitos del dominio.*

-   **HU-801:** Como *Analista de QA*, quiero **desarrollar los artefactos BDD (feature, manifest, golden sets) para el otorgamiento de prestación (HU-101)**, para validar el cumplimiento del escenario `OTG-EVP-001`.
-   **HU-802:** Como *Analista de QA*, quiero **desarrollar los artefactos BDD para el cálculo de liquidación individual (HU-501.1)**, cubriendo los escenarios `PAGO-EVP-001` y `CESE-EVL-001`.
-   **(Nota:** Se añadirán historias similares para cada HU funcional clave, asegurando que el esfuerzo de crear y mantener estos artefactos de prueba esté planificado y sea visible).

### Épica 9 (Nueva): Implementación del Portal de Analistas (UI)

*Objetivo: Construir la interfaz de usuario para que los analistas y supervisores puedan operar el sistema de forma eficiente.*

-   **HU-901:** Como *Supervisor*, quiero una **Bandeja de Tareas** interactiva para visualizar, filtrar y asignar incidentes de dominio.
-   **HU-902:** Como *Analista*, quiero un **Formulario de Acuerdos de Pago** que me permita registrar y modificar apoderados y retenciones judiciales.
-   **HU-903:** Como *Analista*, quiero una **Vista 360° de la FichaPersona** para consultar toda la información de un beneficiario de forma consolidada.

---

## 5. Estimación de Esfuerzo

La estimación total para la construcción del Núcleo Operativo (Fase 1) es de **250 Puntos de Complejidad de Componente (PCC)**.

El desglose detallado de cada historia de usuario, junto con su estimación de complejidad (Lógica, Dependencias, Testing), se mantiene en el archivo `wbs_alternativa_1.csv`. Este archivo actúa como la fuente única de verdad para la planificación y seguimiento del esfuerzo, evitando inconsistencias entre documentos.

---

## 6. Requisitos No Funcionales

Además de la funcionalidad descrita, el sistema deberá cumplir con los siguientes atributos de calidad:

-   **Auditabilidad:** Cada acción que modifique datos o genere un pago debe quedar registrada, indicando el qué, quién, cuándo y por qué.
-   **Rendimiento:** El ciclo de pago mensual masivo debe completarse en una ventana operativa de menos de 4 horas. Las consultas de usuario deben responder en menos de 3 segundos.
-   **Seguridad:** La información sensible (PII) debe estar cifrada en reposo y en tránsito. El acceso al sistema se basará en roles y permisos.
-   **Mantenibilidad:** El código debe seguir las convenciones definidas, estar bien documentado y tener una alta cobertura de pruebas automatizadas.
-   **Observabilidad:** El sistema debe generar logs, métricas y trazas que permitan monitorear su salud y diagnosticar problemas en producción.
