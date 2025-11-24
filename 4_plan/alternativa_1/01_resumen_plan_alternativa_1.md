### **Resumen del Plan de Desarrollo: Reemplazo del Sistema iSeries (PEC2)**

#### **1. Introducción y Enfoque**

Este documento presenta el plan para desarrollar el sistema PEC2, cuyo primer objetivo es reemplazar la funcionalidad del sistema iSeries.

Para acelerar la entrega y capitalizar el conocimiento existente, este plan se basa en dos pilares fundamentales:
1.  **Análisis y Migración de Lógica Existente:** Se analizará la lógica de negocio y las especificaciones existentes para acelerar la implementación de una nueva versión limpia y mantenible, especialmente en la transformación de archivos de entidades externas.
2.  **Levantamiento de Procesos de Management Solutions:** Se utilizará como base el detallado levantamiento de procesos de negocio realizado por la consultora Management Solutions, asegurando que la lógica implementada refleje fielmente la operativa definida.

El enfoque del proyecto es de **entregas incrementales y verificables** a través de "etapas" funcionales para mitigar riesgos y validar el progreso de forma continua con el negocio.

Los principios técnicos del nuevo sistema son la **auditabilidad, la trazabilidad y la correcta aplicación de la normativa vigente**, anclando cada cálculo a un `MarcoNormativo` específico.

#### **2. Fases del Proyecto**

*   **Fase 1: Construcción del Núcleo Operativo (funciones actuales de iSeries):**
    *   **Objetivo:** Construir, etapa por etapa, toda la funcionalidad necesaria para operar el día a día, incluyendo la automatización de las ingestas de datos más críticas para eliminar la carga operativa manual.
*   **Fase 2: Evolución del Sistema:**
    *   **Objetivo:** Una vez reemplazado iSeries, implementar las capacidades avanzadas definidas en el modelo de dominio (MDLO) para optimizar y expandir la operación.

---

#### **3. Roadmap de la Fase 1 por Etapas**

*   **Etapa 1: Cimientos y Componente de Ingesta**
    *   **Objetivo:** Establecer la base técnica del sistema, incluyendo un componente genérico y parametrizable para la ingesta y transformación de archivos, diseñado para implementar los nuevos módulos de transformación basados en el análisis de la lógica existente.
    *   **Resultado Verificable:** El equipo cuenta con un entorno de trabajo seguro y un componente listo para ser configurado con los módulos de transformación de cada proveedor.

*   **Etapa 2: Otorgamiento y Ciclo de Vida Básico**
    *   **Objetivo:** Implementar la creación de prestaciones y la gestión de su vigencia.
    *   **Capacidades Clave:** Otorgamiento de la prestación (`PDN-OTG-002`), Procesamiento de archivos del Registro Civil (`INT-REGCIVIL-001`) para la aplicación de ceses y suspensiones (`PDN-MANT-001`, `PDN-MANT-010`).
    *   **Resultado Verificable:** El sistema puede crear prestaciones y gobernar su vigencia (activa, suspendida, cesada) basándose en reglas de negocio y datos externos.

*   **Etapa 3: Ingesta de Haberes y Descuentos Externos**
    *   **Objetivo:** Automatizar la ingesta de todos los archivos de entidades externas que informan haberes y descuentos, para asegurar que el cálculo de la liquidación mensual sea completo y preciso.
    *   **Capacidades Clave:** Implementar los módulos de transformación para los archivos nativos de las siguientes entidades, basados en el análisis de la lógica de mapeo existente:
        *   **IPS:** para la ingesta de la Pensión Garantizada Universal (PGU) y otros beneficios estatales (`INT-IPS-001`).
        *   **SIVEGAM:** para la ingesta de las cargas y tramos de Asignación Familiar (`INT-SIVEGAM-001`).
        *   **FONASA:** para la ingesta de descuentos por préstamos médicos (`INT-FONASA-001`).
        *   **Cajas de Compensación (CCAF):** para la ingesta de descuentos por créditos sociales (`INT-CCAF-001`).
    *   **Resultado Verificable:** El sistema puede procesar automáticamente los archivos de estas cuatro entidades, dejando los datos listos para ser aplicados en el cálculo de la liquidación.

*   **Etapa 4: Gestión de Mantenimientos Críticos**
    *   **Objetivo:** Implementar las capacidades para gestionar cambios y eventos comunes que son críticos para la operación diaria.
    *   **Capacidades Clave:** Reactivación de pensión de orfandad (`PDN-MANT-003`), Gestión de acuerdos de pago como retenciones judiciales (`PDN-MANT-009`), y aplicación de revisión por agravamiento (`PDN-MANT-004`).
    *   **Resultado Verificable:** El sistema puede procesar modificaciones y eventos de mantenimiento comunes sobre una prestación existente.

*   **Etapa 5: Cálculo y Generación de Pagos**
    *   **Objetivo:** Implementar el motor de cálculo de la liquidación mensual y generar los archivos de pago y contabilidad.
    *   **Capacidades Clave:** Cálculo de la liquidación (`PDN-PAG-003`), Generación de archivos para Banco de Chile (`INT-BCH-001`), SAP (`INT-SAP-001`) y PREVIRED (`INT-PREVIRED-001`).
    *   **Resultado Verificable:** Se demuestra el cálculo de una liquidación completa y la generación de todos los archivos de pago y reportería asociados.

*   **Etapa 6: Gestión de Sobrevivencia y Múltiples Beneficiarios**
    *   **Objetivo:** Implementar el caso de negocio donde una pensión se distribuye entre varios beneficiarios.
    *   **Resultado Verificable:** El sistema calcula y ajusta correctamente las pensiones para un grupo de sobrevivencia.

*   **Etapa 7: Reportería Regulatoria Final**
    *   **Objetivo:** Completar la reportería regulatoria necesaria para la operación.
    *   **Capacidades Clave:** Generación del informe GRIS para SUSESO (`PDN-REP-004`).
    *   **Resultado Verificable:** Se genera el informe GRIS validado en formato y contenido.

---

#### **4. Análisis de Cobertura y Siguientes Pasos**

**Funcionalidades Cubiertas por el Núcleo Operativo:**
El plan de la Fase 1 cubre las capacidades centrales para la operación diaria. Se ha reforzado el plan para incluir análisis de riesgos tempranos sobre funcionalidades de Fase 2 y para detallar de forma más precisa el esfuerzo requerido en pruebas y tareas complejas, asegurando una base más robusta.

**Funcionalidades Postergadas a Fase 2:**
*   **Gestión Financiera de Concurrencias (`PDN-FIN-*`):** La funcionalidad de iSeries en este ámbito parece ser parcial. Se requiere un análisis detallado con negocio para definir el alcance completo antes de su implementación en Fase 2.
*   **Correcciones y Reliquidaciones (`PDN-COR-*`):** La alta complejidad de estos procesos justifica su construcción posterior a la entrega del Núcleo Operativo.
*   **Gobernanza de Excepciones (`PDN-GOB-*`):** El manejo formal de casos complejos es una capacidad de madurez que se construirá sobre la base del Núcleo Operativo.

**Próximos Pasos y Definición de Alcance con Negocio:**

1.  **Inicio de la Etapa 1:** El equipo de desarrollo comienza el trabajo sobre los cimientos de calidad y seguridad.
2.  **Clarificación Funcional (Concurrencia):** Sostener una sesión de trabajo con el negocio para dilucidar el comportamiento exacto y la cobertura del proceso de prorrata/concurrencia en el sistema iSeries actual.
3.  **Detalle de la Etapa 2:** Se realiza una sesión de trabajo con el negocio para detallar las pruebas y criterios de aceptación específicos para el "Otorgamiento y Ciclo de Vida Básico".
4.  **Sesión de Priorización de Alcance (Mantenimiento):** Se agendará una reunión con el equipo de negocio para revisar los siguientes procesos de mantenimiento y decidir si deben ser incluidos en la Fase 1 o pueden ser postergados a la Fase 2:
    *   Reevaluación de Incapacidad por un nuevo siniestro (`PDN-MANT-005`).
    *   Gestión de pago a beneficiarios en el extranjero (`PDN-MANT-008`).
    *   Notificación de cese de funciones a empleadores públicos (`PDN-MANT-011`).

---

#### **5. Demostraciones y Puntos de Control**

Para garantizar la visibilidad y alineación continua, **al finalizar cada etapa clave se realizará una demostración funcional sobre el Portal de Analistas** al equipo de negocio. El objetivo es validar tanto la lógica de negocio como la experiencia de usuario en la interfaz real antes de proceder a la siguiente etapa. El primer hito de demostración significativo se realizará al concluir la **Etapa 5**, ya que representa el primer ciclo de cálculo y pago completo del sistema.