### **Resumen del Plan de Desarrollo (Alternativa 2: Por Capacidades de Negocio)**

#### **1. Introducción y Enfoque**

Este documento presenta el plan para desarrollar el sistema PEC2, cuyo primer objetivo es reemplazar la funcionalidad del sistema iSeries.

El plan organiza el trabajo en **Capacidades de Negocio** (representadas por Épicas), dentro de las cuales se prioriza un conjunto de funcionalidades para un **Release 1 (R1)**, dejando las capacidades avanzadas del MDLO para un **Release 2 (R2)**.

La estrategia de priorización inicial dentro del R1 se denomina **"Camino Feliz"**: se enfoca en construir primero un hilo de funcionalidad completo, aunque simple (otorgamiento y pago básico), para mitigar riesgos y demostrar valor tempranamente.

Los principios técnicos del nuevo sistema son la **auditabilidad, la trazabilidad y la correcta aplicación de la normativa vigente**, anclando cada cálculo a un `MarcoNormativo` específico.

#### **2. Releases del Proyecto**

*   **Release 1 (R1): Núcleo Operativo y Paridad con iSeries:**
    *   **Objetivo:** Implementar las funcionalidades críticas para la operación mensual, alcanzar la paridad con iSeries y habilitar su decomisionamiento. Esto incluye el "camino feliz" de otorgamiento y pago, las integraciones esenciales y una interfaz de usuario funcional para los analistas.
*   **Release 2 (R2): Evolución y Cobertura Total del Dominio:**
    *   **Objetivo:** Una vez reemplazado iSeries, implementar las capacidades avanzadas definidas en el MDLO para transformar y optimizar la operación, como reliquidaciones, gestión de concurrencia y monitores proactivos.

---

#### **3. Roadmap de Épicas del Proyecto**

El plan de desarrollo se desglosa en 13 épicas que representan las grandes capacidades a construir. El Release 1 (R1) se enfoca en un subconjunto funcional de estas épicas para lograr la paridad operativa con iSeries.

*   **Épica 1: Fundamentos Técnicos y Herramientas (R1):** Base técnica, CI/CD y patrones de arquitectura.
*   **Épica 2: Modelo de Datos y Gobierno Normativo (R1):** Implementación de la base de datos y el motor de reglas.
*   **Épica 3: Otorgamiento y Mantenimiento (R1/R2):** Creación y gestión del ciclo de vida de los beneficios.
*   **Épica 4: Ciclo de Pago Mensual (R1/R2):** Orquestación y cálculo del pago masivo mensual.
*   **Épica 5: Integraciones y Reportería (R1/R2):** Conexión con sistemas externos (Banco, SAP, PREVIRED, etc.).
*   **Épica 6: Calidad y Verificación BDD (R1/R2):** Aseguramiento de la calidad a través de pruebas de comportamiento.
*   **Épica 7: Migración y Cutover (R1):** Planificación y ejecución de la migración de datos y salida a producción.
*   **Épica 8: Operación y Observabilidad (R1):** Implementación de telemetría, monitoreo y alertas.
*   **Épica 9: Seguridad y Cumplimiento (R1):** Controles de acceso, cifrado y protección de datos sensibles.
*   **Épica 10: Adopción y Gestión del Cambio (R1):** Capacitación, manuales y soporte para la transición.
*   **Épica 11: Interfaz de Usuario (Frontend) (R1/R2):** Construcción del portal web para los analistas.
*   **Épica 12: Gestión Financiera y Concurrencia (R2):** Ciclo completo de cobros y pagos a otras entidades.
*   **Épica 13: Monitoreo Proactivo y Notificaciones (R2):** Procesos automáticos de vigilancia y comunicaciones regulatorias.

---

#### **4. Análisis de Cobertura y Siguientes Pasos**

**Funcionalidades Cubiertas por Release 1 (R1):**
El R1 cubre las funcionalidades esenciales de Otorgamiento, Pagos e Integraciones para alcanzar la paridad operativa con iSeries, junto con una UI funcional y los fundamentos técnicos y de dominio necesarios para soportar la operación.

**Funcionalidades Postergadas a Release 2 (R2):**
*   Procesos de otorgamiento y mantenimiento avanzados (pensiones transitorias, revisiones por agravamiento, gestión de deudas).
*   Procesos de corrección y reliquidación multi-marco.
*   **Gestión Financiera avanzada**, incluyendo el ciclo completo de concurrencia con otras entidades.
*   **Monitoreo Proactivo y Notificaciones Regulatorias** específicas y automáticas.
*   Gobernanza formal de excepciones y su interfaz de usuario (FVM).
*   Integraciones automáticas con SIVEGAM y reportería regulatoria extendida.

**Próximos Pasos:**

1.  **Ejecutar Épicas de Fundamentos:** El equipo de desarrollo comienza el trabajo sobre los cimientos técnicos y de dominio (Épicas 1 y 2).
2.  **Detallar Camino Feliz:** Sostener una sesión de trabajo con el negocio para detallar y priorizar las historias de usuario de R1 que constituyen el primer flujo de valor completo.

---

#### **5. Demostraciones y Puntos de Control**

Para garantizar la visibilidad y alineación continua, se realizarán demostraciones funcionales **sobre el Portal de Analistas** al equipo de negocio. El primer hito de demostración significativo se realizará al completar el **"Camino Feliz"**, ya que representa el primer ciclo de valor completo del sistema, desde el otorgamiento hasta la generación de un pago calculable, visible en una interfaz de usuario real.