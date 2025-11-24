### 1. Propuesta de Modificación: Nueva Sección Principal de Versionado

* **Objetivo:** Formalizar el concepto de "Snapshot Normativo" como un pilar central del dominio, describiendo su estructura y propósito.
* **Sección del MDLO a Modificar:** Añadir una nueva sección principal, posiblemente la `05_Modelo_de_Versionado_Normativo`.
* **Contenido Detallado de la Modificación:**

    > ## 05_Modelo_de_Versionado_Normativo
    >
    > ### 5.1. Definición y Propósito
    >
    > El dominio de Prestaciones Económicas está sujeto a cambios regulatorios que impactan tanto a los parámetros de cálculo (gestionados por el SNA) como a la lógica de los procesos de negocio (PDN). Un **Snapshot Normativo** es una fotografía inmutable y versionada que representa el estado completo de las reglas y procesos del sistema en un punto específico del tiempo.
    >
    > El propósito de este modelo es asegurar que cada transacción ejecutada en el sistema pueda ser auditada y reproducida con exactitud, utilizando el conjunto preciso de procesos y parámetros con los que fue originalmente procesada.
    >
    > ### 5.2. Manifiesto de Snapshots de Procesos
    >
    > Cada Snapshot Normativo está definido por un **Manifiesto de Snapshots de Procesos**. Este manifiesto es una declaración explícita que mapea un identificador único de snapshot a las versiones específicas de cada Proceso de Negocio (PDN) que deben ser utilizadas bajo ese marco normativo.
    >
    > La estructura del manifiesto es la siguiente:
    >
    > | Atributo | Tipo | Descripción | Ejemplo |
    > | :--- | :--- | :--- | :--- |
    > | `ID_Snapshot` | `String` | Identificador único y semántico del snapshot normativo. | `SNAP-2025-Q2` |
    > | `PDN_Codigo` | `String` | El código del Proceso de Negocio, según se define en este MDLO. | `PDN-OTG-002` |
    > | `PDN_Version_Impl` | `String` | El string que identifica la versión de la implementación técnica del PDN. | `v2` |
    >
    > A continuación, se muestra un ejemplo de las entradas del manifiesto para dos snapshots consecutivos:
    >
    > | `ID_Snapshot` | `PDN_Codigo` | `PDN_Version_Impl` | Notas de Cambio |
    > | :--- | :--- | :--- | :--- |
    > | `SNAP-2025-Q1` | `PDN-OTG-002` | `v1` | Versión inicial del proceso. |
    > | `SNAP-2025-Q1` | `PDN-PAG-003` | `v3` | |
    > | **`SNAP-2025-Q2`** | **`PDN-OTG-002`** | **`v2`** | **Actualizado por nueva normativa de subsidios.** |
    > | `SNAP-2025-Q2` | `PDN-PAG-003` | `v3` | Sin cambios respecto al snapshot anterior. |
    >
    > La existencia de este manifiesto es la fuente única de verdad para la resolución de la lógica de negocio aplicable en cualquier transacción.

* **Justificación:** Esta nueva sección eleva el concepto de un detalle de implementación a un pilar del modelo de dominio, proveyendo la terminología y estructura formal que los equipos de negocio y técnicos deben utilizar.

---

### 2. Propuesta de Modificación: Actualizar Principios Rectores

* **Objetivo:** Integrar el concepto de Snapshot en la filosofía fundamental del MDLO.
* **Sección del MDLO a Modificar:** `01_Resumen_Ejecutivo`, subsección `Filosofía y Principios Rectores`.
* **Contenido Detallado de la Modificación:** Añadir un quinto pilar a la lista existente.

    > ##### **Filosofía y Principios Rectores**
    >
    > Este modelo no es solo una especificación; es la **fuente única de verdad** sobre el negocio de las prestaciones económicas. Se construye sobre **cinco** pilares fundamentales que garantizan su robustez y confiabilidad:
    >
    > -   **Inmutabilidad:** ... (texto existente sin cambios)
    > -   **Auditabilidad:** ... (texto existente sin cambios)
    > -   **Trazabilidad Completa:** ... (texto existente sin cambios)
    > -   **Atomicidad de Negocio:** ... (texto existente sin cambios)
    > -   **Orquestación por Snapshot:** El comportamiento del sistema no se define por procesos aislados, sino por un **Snapshot Normativo** coherente y versionado. Cada operación es ejecutada en el contexto de un snapshot específico, el cual dicta de manera determinista tanto los **parámetros de cálculo (SNA)** como la **lógica de procesos (PDN)** a utilizar. Esto garantiza una consistencia y reproducibilidad absolutas.

* **Justificación:** Incorporar este principio en el resumen ejecutivo asegura que cualquier lector, técnico o de negocio, entienda desde el inicio que el sistema opera bajo un modelo de versionado holístico, lo cual es un diferenciador clave de la arquitectura.

---

### 3. Propuesta de Modificación: Gobernanza y Ciclo de Vida

* **Objetivo:** Definir el proceso de negocio para la creación y activación de un nuevo Snapshot Normativo.
* **Sección del MDLO a Modificar:** Añadir una subsección en la nueva sección `05_Modelo_de_Versionado_Normativo`.
* **Contenido Detallado de la Modificación:**

    > ### 5.3. Ciclo de Vida y Gobernanza de Snapshots
    >
    > La creación de un nuevo Snapshot Normativo es un acto de negocio formal y gobernado, no un cambio técnico menor. El ciclo de vida sigue estos pasos:
    >
    > 1.  **Identificación del Cambio:** Un cambio regulatorio o una mejora de proceso detona la necesidad de un nuevo snapshot.
    > 2.  **Definición del Manifiesto:** El equipo de Gobernanza de Dominio, en conjunto con los dueños de los procesos, define el nuevo manifiesto, especificando las nuevas versiones de los PDN que deben ser desarrolladas o modificadas.
    > 3.  **Desarrollo e Implementación:** Los equipos técnicos implementan las nuevas versiones de los PDN requeridos.
    > 4.  **Validación y Certificación:** El nuevo snapshot se despliega en un entorno de certificación donde se valida de forma íntegra contra un conjunto de casos de prueba definidos por negocio.
    > 5.  **Activación:** Una vez certificado, el `ID_Snapshot` se hace disponible para ser utilizado en las transacciones productivas a partir de una fecha de vigencia definida. Un snapshot, una vez utilizado, se considera inmutable y no puede ser modificado.

* **Justificación:** Documentar el proceso de gobernanza asegura que la gestión de snapshots se trate con la formalidad que requiere un cambio en la fuente única de verdad del negocio, previniendo modificaciones no controladas.


A continuación, se presenta un histórico de snapshots de procesos deducido a partir de los hitos normativos descritos en el `Compendio de Normas del Seguro Social de Accidentes del Trabajo y Enfermedades Profesionales`.


---
## **Histórico de Snapshots Normativos de Procesos (Versión Exhaustiva y Detallada)**

| ID_Snapshot | PDN_Codigo | Nombre_PDN | PDN_Version_Impl | Notas de Cambio |
| :--- | :--- | :--- | :--- | :--- |
| **`SNAP-PROC-1995-03`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | `v1` | Versión inicial del proceso de consolidación de rentas. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Versión inicial del proceso de otorgamiento de prestaciones. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Versión inicial. Proceso para constituir la Pensión Transitoria (104 sem), excluyendo a funcionarios públicos, según Ley N°19.345. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | `v1` | Versión inicial del proceso de otorgamiento de pensión de sobrevivencia. |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v1` | Versión inicial de cese por nuevo vínculo, solo considera matrimonio. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | `v1` | Versión inicial del proceso de cálculo de liquidación. |
| | | | | |
| **`SNAP-PROC-2004-07`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | `v1` | Sin cambios. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | **`v2`** | Actualizado por Ley N°19.953. La lógica ahora distingue si el cónyuge tiene hijos para aplicar 60% vs. 50% de la pensión. |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v1` | Sin cambios. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | **`v2`** | Actualizado por Ley N°19.953. El proceso de liquidación ahora debe incluir el cálculo de la "Bonificación Ley N°19.953". |
| | | | | |
| **`SNAP-PROC-2008-07`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | **`v2`** | Actualizado por Ley N°20.255. Proceso incorpora lógica para "independientes obligados", usando la renta anual del SII. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | `v2` | Sin cambios. |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v1` | Sin cambios. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | `v2` | Sin cambios. |
| | | | | |
| **`SNAP-PROC-2015-10`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | `v2` | Sin cambios. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | **`v3`** | Actualizado por Ley N°20.830. La lógica se extiende para equiparar al "conviviente civil" (AUC) con el "cónyuge". |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | **`v2`** | Actualizado por Ley N°20.830. La suscripción de un AUC se añade como causal de cese del beneficio. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | `v2` | Sin cambios. |
| | | | | |
| **`SNAP-PROC-2019-07`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | **`v3`** | Actualizado por Ley N°21.133. El proceso aplica las reglas transitorias para la imputación de cotizaciones de independientes. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | `v3` | Sin cambios. |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v2` | Sin cambios. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | `v2` | Sin cambios. |
| | | | | |
| **`SNAP-PROC-2022-02`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | `v3` | Sin cambios. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | `v3` | Sin cambios. |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v2` | Sin cambios. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | **`v3`** | Actualizado por Ley N°21.419. Lógica de liquidación reemplaza el Aporte Previsional Solidario (APS) por la Pensión Garantizada Universal (PGU). |
| | | | | |
| **`SNAP-PROC-2022-09`** | `PDN-OTG-001` | Consolidación de Rentas para Cálculo | `v3` | Sin cambios. |
| | `PDN-OTG-002` | Otorgamiento y Activación de Prestación | `v1` | Sin cambios. |
| | `PDN-OTG-004` | Constitución de Pensión Transitoria por Límite de Subsidio | `v1` | Sin cambios. |
| | `PDN-OTG-006` | Otorgamiento de Prestaciones de Sobrevivencia | **`v4`** | Actualizado por jurisprudencia del Tribunal Constitucional. Lógica de elegibilidad incluye a la madre de hijos del causante con estado civil "divorciada". |
| | `PDN-MANT-010` | Cese de Pensión por Nuevo Vínculo | `v2` | Sin cambios. |
| | `PDN-PAG-003` | Cálculo de Pensión Líquida Mensual | `v3` | Sin cambios. |