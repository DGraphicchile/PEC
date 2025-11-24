### **Plan de Desarrollo Detallado: Sistema PEC2 (Versión Óptima)**




#### **1. Visión y Principios Rectores**

El sistema PEC2 será la **fuente única de verdad** para el negocio de prestaciones económicas, construido sobre los principios de **inmutabilidad, auditabilidad y trazabilidad**. Cada cálculo será reproducible y estará anclado a un `MarcoNormativo` versionado. La arquitectura seguirá las decisiones clave de los ADRs (CRUD+eventos, AdonisJS 6, BDD) para garantizar una plataforma robusta, mantenible y alineada con el negocio.

#### **2. Fases del Proyecto**

El desarrollo se ejecutará en dos fases estratégicas, entregando valor de forma incremental mediante *épicas* que agrupan *slices verticales* de funcionalidad de negocio.

*   **Fase 1: MVP - Reemplazo Funcional de iSeries:**
    *   **Objetivo:** Alcanzar la paridad funcional con el sistema iSeries para permitir su decomisionamiento. La entrega se realizará por épicas, cada una aportando una capacidad de negocio completa y verificable.
*   **Fase 2: Evolución y Cobertura Total del Dominio:**
    *   **Objetivo:** Una vez reemplazado iSeries, implementar las capacidades avanzadas del MDLO (reliquidaciones complejas, gobernanza de excepciones, monitores proactivos) para transformar la operación.

---

### **3. Plan Detallado por Épicas e Historias de Usuario**

#### **Fase 1: MVP - Reemplazo Funcional de iSeries**

##### **Épica 1: Fundamentos Técnicos y Arquitectura (Core)**
*Esta épica es el prerrequisito técnico para todas las demás.*

*   **HU 1.1:** Configurar el proyecto AdonisJS 6 con la estructura de directorios y módulos de la arquitectura (dominio, aplicación, infraestructura).
*   **HU 1.2:** Implementar el pipeline de CI/CD (ADR-011) con jobs para tests unitarios (SQLite) y E2E (Postgres).
*   **HU 1.3:** Implementar el servicio de `outbox` para la publicación confiable de eventos de dominio.
*   **HU 1.4:** Implementar el middleware de `idempotencia` para operaciones críticas de API (si aplica) y jobs.
*   **HU 1.5:** Implementar el logger de `AppAudit` para registrar la trazabilidad de las operaciones.
*   **HU 1.6:** Ejecutar las migraciones de base de datos para las entidades centrales del MDLO (Anexo B): `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `LiquidacionDePago`, `AcuerdoDePago`, etc.
*   **HU 1.7:** Implementar el `FrameworkResolverService` (ADR-003) que resuelve el `MarcoNormativo` por fecha.
*   **HU 1.8:** Cargar las versiones iniciales del `MarcoNormativo` y del Catálogo de Conceptos de Liquidación (`CCL`) como artefactos versionados.
*   **HU 1.9:** Configurar la plataforma de escenarios de verificación (ADR-012) para la generación de `golden sets` y borradores BDD.

##### **Épica 2: Otorgamiento y Pago de Pensión Simple (Camino Feliz)**
*Cubre el flujo de valor más crítico: constituir un derecho y pagarlo.*

*   **HU 2.1:** Implementar el proceso `PDN-OTG-002` para otorgar una pensión de incapacidad a un trabajador dependiente, creando la entidad `PrestacionEconomica` en estado `Activa`.
*   **HU 2.2:** Implementar la regla `CALC-OTG-001` para calcular el Sueldo Base Mensual y el monto del retroactivo inicial.
*   **HU 2.3:** Implementar el orquestador del ciclo de pago mensual (`PDN-PAG-001`) que selecciona las prestaciones activas para un período.
*   **HU 2.4:** Implementar el motor de cálculo de Pensión Imponible (`PDN-PAG-002`) y Líquida (`PDN-PAG-003`).
*   **HU 2.5:** Implementar las reglas de descuento legal `CALC-PLI-001` (Salud) y `CALC-PLI-002` (Previsión) dentro del motor de pago.
*   **HU 2.6:** Implementar la generación del archivo de nómina para Banco de Chile (`INT-BCH-001`) con los datos de las liquidaciones generadas.
*   **HU 2.7:** Implementar la generación del comprobante contable básico para SAP (`INT-SAP-001`).

##### **Épica 3: Gestión de Asignación Familiar**
*Añade la capacidad de gestionar cargas familiares y su impacto en la liquidación.*

*   **HU 3.1:** Implementar la gestión de la entidad `CausanteAsignacionFamiliar`, permitiendo su creación, actualización y extinción.
*   **HU 3.2:** Integrar la regla de cálculo `CALC-PLI-003` en el motor de pago para añadir el haber de Asignación Familiar.
*   **HU 3.3:** Implementar el proceso de carga de novedades desde SIVEGAM (`INT-SIVEGAM-001`), inicialmente mediante un archivo.
*   **HU 3.4:** Implementar la validación de vigencia de cargas, con especial atención a viudas menores de 45 años.

##### **Épica 4: Mantenimiento del Ciclo de Vida (Ceses y Suspensiones)**
*Dota al sistema de la capacidad de gobernar la vigencia de las prestaciones.*

*   **HU 4.1:** Implementar el proceso de envío y recepción de archivos con el Registro Civil (`INT-REGCIVIL-001`).
*   **HU 4.2:** Implementar la lógica de negocio (`PDN-MON-006`) que procesa la respuesta del Registro Civil para detectar fallecimientos o nuevos vínculos.
*   **HU 4.3:** Implementar el proceso de cese automático por edad (`PDN-MANT-001`) y por nuevo vínculo (`PDN-MANT-010`).
*   **HU 4.4:** Implementar el proceso de suspensión por falta de certificado de estudios (`PDN-MANT-002`) y su posterior reactivación (`PDN-MANT-003`).
*   **HU 4.5:** Implementar la regla `CALC-PLI-009` para calcular los días exactos a pagar en caso de una inactivación a mitad de mes.

##### **Épica 5: Gestión de Sobrevivencia y Prorrata (Art. 50)**
*Cubre el caso de negocio de múltiples beneficiarios por un mismo causante.*

*   **HU 5.1:** Implementar el proceso de otorgamiento de pensión de sobrevivencia (`PDN-OTG-006`), validando la elegibilidad de múltiples beneficiarios.
*   **HU 5.2:** Implementar la regla de prorrateo (`CALC-OTG-002`) que distribuye la pensión del causante entre los beneficiarios.
*   **HU 5.3:** Implementar el proceso de acrecimiento (`PDN-MANT-012`), que re-calcula los porcentajes cuando uno de los beneficiarios cesa su derecho.

##### **Épica 6: Integraciones Críticas y Reportería MVP**
*Completa las interfaces externas necesarias para la operación mensual y el cumplimiento mínimo.*

*   **HU 6.1:** Implementar la generación del archivo de cotizaciones para PREVIRED (`INT-PREVIRED-001`), incluyendo los descuentos de salud y previsión.
*   **HU 6.2:** Implementar el proceso `PDN-REP-004` para generar el informe regulatorio GRIS (`IR-SUSESO-004`).
*   **HU 6.3:** Implementar la gestión de `AcuerdoDePago` para apoderados y retenciones judiciales.
*   **HU 6.4:** Implementar el cálculo de concurrencia (`CALC-FIN-001`) y la generación del archivo de conciliación trimestral.

---

#### **Fase 2: Evolución y Cobertura Total del Dominio**
*Una vez reemplazado iSeries, se abordarán las capacidades avanzadas del MDLO.*

##### **Épica 7: Gestión Avanzada de Correcciones y Deudas**
*   **HU 7.1:** Implementar el proceso de reliquidación por error (`PDN-COR-001`) con ejecución multi-marco.
*   **HU 7.2:** Implementar el proceso de reversión de beneficio (`PDN-COR-003`) y la creación de la entidad `Deuda`.
*   **HU 7.3:** Implementar el proceso para ejecutar dictámenes de entes reguladores (`PDN-COR-002`).

##### **Épica 8: Gobernanza de Excepciones y Casos Complejos**
*   **HU 8.1:** Implementar la entidad `IncidenteDeDominio` y su máquina de estados.
*   **HU 8.2:** Implementar el proceso de negocio `PDN-GOB-001` para la gestión y resolución de incidentes.
*   **HU 8.3:** Implementar la regla de verificación humana `VERF-GOB-001` para la aprobación de planes de acción.

##### **Épica 9: Monitores Proactivos y Automatización**
*   **HU 9.1:** Implementar el monitor de SLAs de otorgamiento (`PDN-MON-001`).
*   **HU 9.2:** Implementar el monitor de plazos de entrega de antecedentes del empleador (`PDN-MON-003`).
*   **HU 9.3:** Implementar la notificación preventiva de cese de pensión por edad (`PDN-MON-004`).

---

#### **4. Próximos Pasos**

1.  **Sprint 1-2:** Ejecutar la **Épica 1** para establecer las bases técnicas y de dominio del proyecto.
2.  **Planificación de Sprints (Fase 1):** Detallar y priorizar las historias de usuario de las Épicas 2 a 6.
3.  **Paralelo:** El equipo de negocio y QA, usando la plataforma de escenarios (ADR-012), comienza a detallar y validar los `features` BDD y `golden sets` para las Épicas 2 y 3.