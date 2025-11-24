### **Plan de Desarrollo: Sistema de Prestaciones Económicas (PEC2)**

#### **1. Visión y Principios Rectores**

El sistema PEC2 será la **fuente única de verdad** para el negocio de prestaciones económicas. Se construirá sobre los principios de **inmutabilidad, auditabilidad y trazabilidad completa**, definidos en el MDLO y la arquitectura. Cada cálculo y decisión será reproducible y estará anclado a un `MarcoNormativo` versionado, garantizando el cumplimiento y la confianza en el sistema.

La arquitectura seguirá las decisiones clave documentadas en los ADRs, principalmente:
*   **ADR-002:** CRUD como system-of-record con publicación de eventos de dominio vía `outbox`.
*   **ADR-003:** Gobierno centralizado de la normativa a través del `FrameworkResolverService`.
*   **ADR-008:** Uso de **AdonisJS 6 (TypeScript)** como stack tecnológico base.
*   **ADR-013:** Adopción de **BDD** para crear una especificación ejecutable y alinear negocio con desarrollo.

#### **2. Fases del Proyecto**

El desarrollo se dividirá en dos fases principales para gestionar el riesgo y entregar valor de forma incremental.

*   **Fase 1: MVP - Reemplazo de iSeries:**
    *   **Objetivo:** Implementar todas las funcionalidades actualmente operativas en el sistema iSeries, logrando paridad funcional para permitir su decomisionamiento. El foco está en la operación mensual crítica: cálculo, liquidación, pago e integraciones esenciales.
    *   **Alcance:** Las épicas y HU de esta fase se derivan directamente de la `especificacion_iSeries_cursor.md`.

*   **Fase 2: Evolución y Cobertura Total del Dominio:**
    *   **Objetivo:** Implementar las capacidades avanzadas definidas en el MDLO que no existen o son manuales en iSeries. Esto incluye la gobernanza de excepciones complejas, monitores proactivos, y procesos de corrección y reliquidación más sofisticados.
    *   **Alcance:** Las épicas y HU de esta fase cubren los PDN y RDN del MDLO no incluidos en la Fase 1.

---

#### **3. Plan de Desarrollo Detallado por Épicas**

A continuación se desglosan las épicas del proyecto, indicando qué historias de usuario (HU) pertenecen a cada fase.

---

##### **Épica 0: Fundamentos Técnicos y Arquitectura (Core)**
*Esta épica es un prerrequisito y se ejecuta al inicio de la Fase 1.*

*   **HU 0.1:** Configurar el proyecto AdonisJS 6 con la estructura de directorios alineada a la arquitectura (módulos de dominio, aplicación, infraestructura).
*   **HU 0.2:** Implementar el pipeline de CI/CD con la estrategia de pirámide de tests (ADR-011), incluyendo jobs para tests unitarios (SQLite) y E2E (Postgres).
*   **HU 0.3:** Implementar los patrones transversales definidos en los ADRs: servicio de outbox para eventos, middleware de idempotencia, y logger de auditoría (`AppAudit`).
*   **HU 0.4:** Configurar la plataforma de escenarios de verificación (ADR-012) para generar los primeros `golden sets` y borradores BDD.

---

##### **Épica 1: Modelo de Datos y Gobierno Normativo (Core)**
*Esta épica es un prerrequisito y se ejecuta al inicio de la Fase 1.*

*   **HU 1.1:** Implementar las migraciones de base de datos para las entidades centrales del MDLO v1 (Anexo B): `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `LiquidacionDePago`, `AcuerdoDePago`, etc.
*   **HU 1.2:** Implementar el `FrameworkResolverService` (ADR-003) que, dada una fecha, resuelve el `MarcoNormativo` (parámetros + directiva) a utilizar.
*   **HU 1.3:** Cargar las versiones iniciales del `MarcoNormativo` y del Catálogo de Conceptos de Liquidación (CCL) como artefactos versionados.

---

##### **Épica 2: Otorgamiento y Mantenimiento de Prestaciones**
*Esta épica cubre la creación y gestión de los derechos de los beneficiarios.*

*   **Fase 1 (Reemplazo iSeries):**
    *   **HU 2.1:** Implementar el proceso de otorgamiento de pensión (`PDN-OTG-002`), incluyendo el cálculo de monto mensual y retroactivo.
    *   **HU 2.2:** Implementar la gestión de Asignación Familiar: alta, baja y modificación de cargas (`CausanteAsignacionFamiliar`).
    *   **HU 2.3:** Implementar la gestión de cobrantes (`AcuerdoDePago` para apoderados/curadores) y retenciones judiciales.
    *   **HU 2.4:** Implementar las inactivaciones y reactivaciones básicas de pensiones (p. ej., por presentación de certificado de estudios, `PDN-MANT-002`/`003`).

*   **Fase 2 (Evolución):**
    *   **HU 2.5:** Implementar los procesos de otorgamiento complejos (múltiples empleadores `PDN-OTG-005`, pensiones transitorias `PDN-OTG-004`).
    *   **HU 2.6:** Implementar los procesos de mantenimiento avanzados como revisiones por agravamiento (`PDN-MANT-004`) y regularización de sobrevivencia (`PDN-MANT-012`).
    *   **HU 2.7:** Implementar el proceso formal de gobernanza de excepciones (`PDN-GOB-001`) para casos que requieren intervención experta.

---

##### **Épica 3: Ciclo de Pago Mensual**
*El corazón del sistema: el proceso masivo de liquidación y pago.*

*   **Fase 1 (Reemplazo iSeries):**
    *   **HU 3.1:** Implementar el orquestador del ciclo de pago mensual (`PDN-PAG-001`) siguiendo la estrategia de ejecución masiva (ADR-010).
    *   **HU 3.2:** Implementar el motor de cálculo de Pensión Imponible y Líquida (`PDN-PAG-002`, `PDN-PAG-003`), aplicando las reglas del CCL.
    *   **HU 3.3:** Implementar el cálculo de prorrata por concurrencia (`CALC-FIN-001`).
    *   **HU 3.4:** Implementar los cálculos de reajuste por IPC y variaciones anuales (`CALC-MANT-001`).
    *   **HU 3.5:** Implementar la aplicación del artículo 50 para el tope de pago en pensiones de sobrevivencia.

*   **Fase 2 (Evolución):**
    *   **HU 3.6:** Implementar la orquestación de pagos especiales como aguinaldos y bonos (`PDN-PAG-005`).
    *   **HU 3.7:** Implementar los procesos de reliquidación multi-marco (`PDN-COR-001`), permitiendo corregir pagos históricos con la normativa de su época.

---

##### **Épica 4: Integraciones y Reportería**
*Comunicación con el ecosistema externo.*

*   **Fase 1 (Reemplazo iSeries):**
    *   **HU 4.1:** Generar el archivo plano de pagos para Banco de Chile (`INT-BCH-001`).
    *   **HU 4.2:** Generar el archivo de cotizaciones para PREVIRED (`INT-PREVIRED-001`).
    *   **HU 4.3:** Generar el comprobante contable para la integración con SAP (`INT-SAP-001`).
    *   **HU 4.4:** Generar el reporte regulatorio GRIS para SUSESO (`PDN-REP-004`).
    *   **HU 4.5:** Implementar el proceso de consulta masiva y procesamiento de respuesta del Registro Civil (`INT-REGCIVIL-001`).

*   **Fase 2 (Evolución):**
    *   **HU 4.6:** Implementar las integraciones automáticas con SIVEGAM para Asignación Familiar (`INT-SIVEGAM-001`).
    *   **HU 4.7:** Implementar la generación del resto de informes regulatorios para SUSESO e IPS (`PDN-REP-001`, `PDN-REP-002`, etc.).
    *   **HU 4.8:** Implementar los monitores proactivos (`PDN-MON-*`) que vigilan plazos y condiciones para gatillar eventos automáticamente.

#### **4. Próximos Pasos**

1.  **Sprint 0:** Ejecutar las HU de la **Épica 0** para establecer las bases técnicas del proyecto.
2.  **Sprint 1-2:** Ejecutar las HU de la **Épica 1** para modelar el dominio y la normativa.
3.  **Siguientes Sprints (Fase 1):** Abordar las HU de la Fase 1 de las Épicas 2, 3 y 4 en paralelo, priorizando el flujo crítico de pago mensual.
4.  **Paralelo:** El equipo de negocio y QA, usando la plataforma de escenarios (ADR-012), comienza a escribir y validar los `features` BDD para las HU priorizadas.