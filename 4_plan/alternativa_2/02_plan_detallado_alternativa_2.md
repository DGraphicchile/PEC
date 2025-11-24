# Plan de Desarrollo Detallado (Versión 3.0 - Estructura Mejorada)

**Fecha:** 2025-08-12

---

## 1. Resumen Ejecutivo y Estrategia

Este documento presenta una alternativa de plan de desarrollo para el sistema PEC2, estructurado en torno a **Capacidades de Negocio** (Épicas) para alinear el backlog directamente con las áreas funcionales de la empresa.

La ejecución se guiará por una **metodología Agile (Scrum)**.

### Estrategia de Priorización: El "Camino Feliz"

Dentro de **Release 1 (R1)**, la priorización inicial seguirá la estrategia del **"Camino Feliz"**: construir primero un hilo de funcionalidad completo (otorgamiento y pago simple) para mitigar riesgos y demostrar valor tempranamente. En este contexto, el "Camino Feliz" es un flujo end-to-end (de punta a punta) mínimo pero operable que permite demostrar valor con usuarios reales antes de cubrir todas las variantes.

> **Nota sobre Cobertura del Alcance de iSeries:** Este plan de desarrollo ha sido diseñado para cubrir la totalidad del alcance funcional del sistema iSeries existente. Sin embargo, en línea con la estrategia del "Camino Feliz", varias funcionalidades complejas o de menor frecuencia se han priorizado para el **Release 2 (R2)** para asegurar una entrega de valor temprana y controlada.
> Las principales capacidades de iSeries que se abordarán en R2 incluyen:
> - El cálculo y pago de **retroactivos iniciales** con su **finiquito** (HU 3.10).
> - La generación de archivos para **pagos a terceros en el extranjero** (HU 5.11).
> - La emisión del **Detalle de Cobro de Concurrencia** para conciliación (HU 5.12).
> - Reportes regulatorios adicionales como **capitales vigentes** para el IPS (HU 5.14).
> - Reportes de soporte para la actualización manual en **SUSESO-PIES** (HU 5.13).

---

## 2. Plan de Releases y Objetivos de Negocio

### 2.1. Objetivos de Releases y KPIs de éxito

- **R1 — Objetivo**: habilitar otorgamiento simple y ciclo de pago mensual completo, con generación de artefactos externos (Banco, PREVIRED, SAP, GRIS), cierre AF operativo, motor regulariza con evidencias y primeras integraciones (Registro Civil, IPS/PGU, Fonasa, CCAF).
  - **KPIs/Criterios**: cálculo E2E en ventana operativa; artefactos generados y validados; telemetría PDN→EDN/RDN disponible; idempotencia y bloqueos por cierre activos; UAT concluida.
- **R2 — Objetivo**: variantes y reportería extendida (nupcias/bono, retroactivo inicial formalizado, reliquidaciones multi‑marco, pagos exterior, detalle de concurrencia, SIVEGAM y reportes IPS adicionales), gobernanza de excepciones avanzada.
  - **KPIs/Criterios**: aceptación de variantes por negocio; reportería completa; performance estable; operación y soporte con tableros/alertas.

### 2.2. Hilos de Negocio E2E por Release

- **R1 — Otorgamiento y Pago Simple**: desde el cálculo de pensión inicial y enlace, mantenimiento básico (AF, cobrantes/retenciones), automatizaciones de regulariza y cálculo de liquidaciones, hasta la emisión de archivos externos y contables.
- **R2 — Variantes y Reportería**: incorporación de nuevas nupcias y bono, retroactivo inicial con finiquito, reliquidaciones multi‑marco, concurrencia y reportería extendida.

### 2.3. Mapa de Capacidades por Release

| Épica/Capacidad | R1 | R2 | Nota de valor |
| :--- | :---: | :---: | :--- |
| 1. Fundamentos | ✔ | — | Base técnica y productividad del equipo |
| 2. Normativa | ✔ | — | MarcoNormativo versionado y auditable |
| 3. Otorgamiento/Mantenimiento | ✔ | △ | Habilita alta/mantención; variantes quedan en R2 |
| 4. Pagos | ✔ | △ | Pago mensual operando; reliquidaciones en R2 |
| 5. Integraciones/Reportes | ✔ | △ | Artefactos críticos en R1; extendidos en R2 |
| 6. Calidad/BDD | ✔ | — | Salud y cobertura mínima en R1 |

Leyenda: ✔ entregado, △ extendido, — no aplica.

---

## 3. Desglose Detallado por Épicas

### 3.1. Épica 1: Fundamentos Técnicos y Herramientas
*Esta épica se centra en construir una base de desarrollo sólida y productiva. Abarca la configuración inicial del proyecto, la implementación de un pipeline de integración y despliegue continuo (CI/CD), y el establecimiento de los patrones arquitectónicos transversales como la idempotencia y la auditoría. Además, incluye la creación de herramientas de scaffolding para acelerar y estandarizar el desarrollo, asegurando la consistencia desde el inicio. En resumen, esta épica prepara la “pista de aterrizaje” para que las demás épicas puedan despegar con seguridad.*

-   **HU 1.1 (R1):** Configurar el proyecto AdonisJS 6.
-   **HU 1.2 (R1):** Implementar el pipeline de CI/CD (ADR-011).
-   **HU 1.3 (R1):** Implementar los patrones transversales (outbox, idempotencia, auditoría).
-   **HU 1.4 (R1):** Configurar la plataforma de escenarios de verificación (ADR-012).
-   **HU 1.5:** Como *Desarrollador*, quiero los comandos **`make:action`, `make:listener`, `make:rule` y `make:builder` (`ADR-018`)**, para acelerar el desarrollo de nuevos componentes de negocio de forma consistente.
-   **HU 1.6:** Como *Desarrollador*, quiero configurar el proyecto AdonisJS con el **adaptador de Inertia.js** y la estructura base de React, para habilitar el desarrollo del portal de analistas.
-   **HU 1.7:** Como *Diseñador UX/UI*, quiero crear un **prototipo navegable de alta fidelidad** para las 3 pantallas principales (Bandeja, FichaPersona, FVM), para validar el flujo de usuario con el equipo de pensiones antes de la construcción.
-   **HU 1.8:** Como *Arquitecto*, quiero implementar un **`RuleExecutorService`** genérico que pueda instanciar y ejecutar dinámicamente cualquier Regla de Negocio (RDN) registrada, para desacoplar la orquestación de la lógica.
-   **HU 1.9 (R1):** Como *Arquitecto*, quiero definir el **catálogo de DomainEvents** y la **telemetría PDN→EDN/RDN** (emisión vía outbox, idempotencia y correlación con `marcoNormativoId`), para soportar evidencias y reportería operacional de los procesos (p. ej., `pension:inactivada`, `archivo_banco:generado`).

### 3.2. Épica 2: Modelo de Datos y Gobierno Normativo
*Esta épica establece la "fuente única de verdad" del sistema. Se implementará el esquema completo de la base de datos según el Modelo de Dominio (MDLO) y se construirá el servicio central para gobernar el `MarcoNormativo`. Esto garantiza que cada cálculo sea auditable y se ejecute contra la versión correcta de la normativa, cumpliendo con un requisito fundamental del proyecto. Es la “columna vertebral” de datos y reglas que el resto del sistema consume.*

-   **HU 2.1 (R1):** Implementar las migraciones de base de datos del MDLO.
-   **HU 2.2 (R1):** Implementar el `FrameworkResolverService` (ADR-003).
-   **HU 2.3 (R1):** Cargar artefactos normativos (Marcos y CCL).
-   **HU 2.4 (Spike de Análisis):** Como *Arquitecto*, quiero **analizar y validar el modelo de datos contra un escenario de corrección retroactiva (`PDN-COR-001`)**, para asegurar que el diseño de R1 soportará las reliquidaciones de R2.

### 3.3. Épica 3: Otorgamiento y Mantenimiento de Prestaciones
*Aquí se construye la primera capacidad de negocio clave: la creación y gestión del ciclo de vida de los beneficios. El trabajo se enfocará en implementar los procesos de punta a punta para otorgar una pensión, administrar asignaciones familiares (AF), gestionar acuerdos de pago (cobrantes, retenciones) y manejar los estados básicos de un beneficio, como suspensiones y reactivaciones. Esta épica asegura que los casos “existan” correctamente y puedan evolucionar en el tiempo.*

-   **HU 3.1 (R1):** Implementar el proceso de otorgamiento de pensión simple. **[PDN: PDN-OTG-002]**
    -   **Sub-Tarea 3.1.1:** Implementar la RDN de validación **`VALID-OTG-001`** (Validar Cotizaciones al Día), incluyendo su repositorio de datos.
    -   **Sub-Tarea 3.1.2:** Implementar la RDN de cálculo **`CALC-OTG-001`** (Calcular Sueldo Base), incluyendo su repositorio y el consumo de parámetros normativos.
    -   **Sub-Tarea 3.1.3:** Implementar la RDN de cálculo **`CALC-OTG-003`** para determinar el monto final de la pensión.
    -   **Sub-Tarea 3.1.4:** Implementar la clase **`OtorgarPensionAction`** que orqueste la ejecución de las RDNs anteriores.
    -   **Sub-Tarea 3.1.5:** Implementar el **`Listener`** para el evento `pension:otorgada`.
-   **HU 3.2 (R1):** Implementar gestión de Asignación Familiar. **[PDN: PDN-MANT-007 | RDN: CALC-PLI-003, CUMP-ASIGFAM-001]**
-   **HU 3.3 (R1):** Implementar gestión de cobrantes y retenciones judiciales. **[PDN: PDN-MANT-009 | RDN: VALID-ACUERDO-*, CALC-PLI-007]**
-   **HU 3.4 (R1):** Implementar inactivaciones y reactivaciones básicas. **[PDN: PDN-MANT-002, PDN-MANT-003 | RDN: VALID-MANT-001]**
-   **HU 3.5 (R2):** Implementar otorgamientos complejos.
-   **HU 3.6 (R2):** Implementar mantenimientos avanzados.
-   **HU 3.7 (R2):** Implementar gobernanza de excepciones. **[PDN: PDN-GOB-001 | RDN: VERF-GOB-001]**
-   **HU 3.8 (R1):** Implementar **cierre de Asignación Familiar** (foto/lock por periodo) y congelamiento de cambios post-cierre. **[PDN: PDN-MANT-007]**
-   **HU 3.9 (R2):** Implementar **nuevas nupcias (viudez)** con cese y **pago de bono por matrimonio** (pago único) con sus evidencias. **[PDN: PDN-MANT-010 | PDN-PAG-*]**
-   **HU 3.10 (R2):** Implementar **retroactivo inicial de otorgamiento** con generación de **finiquito** (detalle de cálculo) y flujo de **liberación a pago** (vale vista) como artefactos y evidencias. **[PDN: PDN-OTG-*]**
-   **HU 3.11 (R2):** Implementar **bypass controlado por excepción** (cuando falta insumo externo crítico) con registro de **EXD/VERF** y obligación de regularizar a posteriori. **[PDN: PDN-GOB-001]**
-   **HU 3.12 (R2):** Como *Analista*, quiero **gestionar los Beneficios Previsionales Externos** de una persona para registrar información clave de otras instituciones (AFP, IPS) y poder determinar incompatibilidades (`PDN-MANT-006`).
-   **HU 3.13 (R2):** Como *Analista*, quiero **gestionar el ciclo de vida de una Deuda**, incluyendo su creación (ej. por reversión), la configuración de planes de pago y su eventual condonación, para un manejo financiero correcto. **[PDN: PDN-COR-003]**

### 3.4. Épica 4: Ciclo de Pago Mensual
*Esta épica representa el corazón financiero del sistema. Se construirá el motor responsable de orquestar el ciclo de pago masivo mensual. Esto incluye el cálculo detallado de cada liquidación individual con todas sus reglas (incluyendo RDN de haberes/descuentos), la aplicación de reajustes y topes legales, y la optimización del proceso para que se ejecute de manera eficiente dentro de la ventana operativa requerida. Es donde “el dinero se mueve” con control y trazabilidad.*

-   **HU 4.0 (R1, Gating):** Definir gobernanza de `regulariza` (orden de reglas, re-ejecución idempotente, locks por cierre, evidencias PDF y periodos de retención) y su telemetría mínima.
-   **HU 4.1 (R1):** Implementar orquestador del ciclo de pago masivo (ADR-010). **[PDN: PDN-PAG-001]**
-   **HU 4.2 (Desglosada):**
    -   **HU 4.2.1:** Como *Sistema*, quiero implementar el **cálculo de una liquidación individual**, aplicando haberes y descuentos para una única prestación. **[PDN: PDN-PAG-003 | RDN: CALC-PIM-*, CALC-PLI-*]**
        -   ***Criterio de Aceptación Clave:*** *La lógica debe ser probada contra el `MarcoNormativo` vigente y, al menos, un `MarcoNormativo` histórico relevante.*
    -   **HU 4.2.2:** Como *Sistema*, quiero implementar el **orquestador de ejecución masiva** que procese todas las prestaciones activas. **[PDN: PDN-PAG-001]**
    -   **HU 4.2.3:** Como *Desarrollador*, quiero **optimizar el rendimiento del lote de pago mensual** para cumplir con la ventana operativa.
-   **HU 4.3 (R1):** Implementar cálculo de prorrata por concurrencia. **[PDN: PDN-FIN-001, PDN-FIN-004 | RDN: CALC-FIN-001]**
-   **HU 4.4 (R1):** Implementar cálculos de reajuste por IPC. **[PDN: PDN-PAG-004 | RDN: CALC-MANT-001]**
-   **HU 4.5 (R1):** Implementar aplicación de tope del Art. 50. **[RDN: CALC-PLI-013]**
-   **HU 4.6 (R2):** Implementar pagos especiales (aguinaldos). **[PDN: PDN-PAG-005]**
-   **HU 4.7 (R2):** Implementar reliquidaciones multi-marco. **[PDN: PDN-COR-001, PDN-COR-002]**
-   **HU 4.8 (R1):** Implementar **motor de automatizaciones `regulariza`** (inactivaciones/reactivaciones/categorizaciones por edad, estado civil, estudios, mínimos, conversión a vitalicia), con **evidencias PDF/logs** por subproceso. **[PDN: PDN-PAG-*]**
-   **HU 4.9 (R1):** Implementar **preliquidación** como artefacto formal (resumen PDF y datos), con flujo de **revisión** y trazabilidad. **[PDN: PDN-PAG-003]**
-   **HU 4.10 (R1):** Implementar **re-ejecución idempotente** de preliquidación/lote y **bloqueos por cierre** de periodo (cambios post-cierre se difieren). **[PDN: PDN-PAG-001/003]**
-   **HU 4.11 (R1):** Parametrizar **calendario de cierres operativos** (AF y pagos) y **reglas de adelanto** en meses con aguinaldo, con controles de validación previos. **[PDN: PDN-PAG-* | PDN-MANT-007]**
-   **HU 4.12 (R1, Gating):** Definir SLO/SLI de ventana operativa y diseñar/ejecutar pruebas de rendimiento con criterios de aceptación (p95/p99, throughput, volumen de periodo).

### 3.5. Épica 5: Integraciones y Reportería
*El objetivo de esta épica es asegurar que el sistema se comunique correctamente con su ecosistema externo. Se implementará la generación de todos los archivos críticos para la operación (banco, PREVIRED, SAP), la ingesta de insumos regulatorios (IPS/PGU, Registro Civil, Fonasa/CCAF) y la emisión de reportes obligatorios (GRIS SUSESO). Esta épica “conecta” el sistema con el mundo real y regulatorio.*

-   **HU 5.0 (R1, Gating):** Definir **contratos y esquemas de integración** para Registro Civil, IPS/PGU, Fonasa, CCAF, Banco, PREVIRED, SAP y SUSESO/GRIS (layout, encoding, separadores decimales, PII, transporte SFTP/HTTPS, claves de idempotencia, acuse/conciliación).
-   **HU 5.1 (R1):** Generar archivo de pago para Banco de Chile. **[PDN: PDN-PAG-008]**
-   **HU 5.2 (R1):** Generar archivo de cotizaciones para PREVIRED. **[PDN: PDN-PAG-009]**
-   **HU 5.3 (R1):** Generar comprobante contable para SAP. **[PDN: PDN-PAG-010]**
-   **HU 5.4 (R1):** Generar reporte regulatorio GRIS para SUSESO. **[PDN: PDN-REP-004 | RDN: CALC-REP-001, MAP-REP-001]**
-   **HU 5.5 (R1):** Implementar integración con Registro Civil. **[Habilita: PDN-MANT-001, PDN-MANT-010 | RDN: CICLO-CESE-001]**
-   **HU 5.6 (R2):** Implementar integración automática con SIVEGAM. **[PDN: PDN-REP-003]**
-   **HU 5.7 (R2):** Implementar reportería regulatoria extendida.
-   **HU 5.8 (R1):** Implementar **ingesta de IPS/PGU** (PGU, aguinaldos, bono invierno) a tablas temporales y aplicación en cálculo. **[Habilita: PDN-PAG-003/004]**
-   **HU 5.9 (R1):** Implementar **ingesta de Fonasa** (préstamos) y **CCAF** (créditos) para descuentos. **[Habilita: PDN-PAG-003]**
-   **HU 5.10 (R2):** Implementar **pago a terceros en el extranjero** (Tesorería/Western Union) y su archivo de salida. **[PDN: PDN-PAG-*]**
-   **HU 5.11 (R2):** Implementar **Detalle de Cobro de Concurrencia** para conciliación trimestral con otras entidades. **[PDN: PDN-FIN-*]**
-   **HU 5.12 (R2):** Implementar **reportes de sugerencias SUSESO-PIES** (actualizaciones manuales de cargas familiares) a partir de cambios detectados. **[PDN: PDN-REP-* | PDN-MANT-007]**
-   **HU 5.13 (R2):** Implementar **reportes adicionales a IPS** (p. ej., capitales vigentes, listados art. 53), según especificación vigente. **[PDN: PDN-REP-*]**
-   **HU 5.14 (R1):** Diseñar **contingencias/rollback** por integración (Banco, PREVIRED, SAP, GRIS): criterios de activación, procedimientos, y pruebas de validación.

### 3.6. Épica 6: Calidad y Verificación BDD
*Esta épica se dedica a garantizar la correctitud del sistema mediante un enfoque de calidad moderno. Utilizando la metodología de Desarrollo Guiado por el Comportamiento (BDD), se crearán especificaciones ejecutables a partir de escenarios de negocio reales, junto con la telemetría PDN→EDN/RDN para cobertura. Esto permite verificar formalmente que la implementación se alinea con los requerimientos y que los cambios no rompen comportamientos ya validados.*

-   **(Las HUs de esta épica se derivan de las historias funcionales de otras épicas, ej: "Desarrollar BDD para HU 3.1")**

### 3.7. Épica 7: Migración y Cutover
*Planificar y ejecutar la transición desde iSeries al nuevo sistema, garantizando integridad de datos y continuidad operativa.*

-   **HU 7.1 (R1, Gating):** Definir **estrategia de migración de datos** (alcance, mapeos, reglas de calidad, reconciliación).
-   **HU 7.2 (R1, Gating):** Ejecutar **dress rehearsal** (ensayo general) de migración con dataset representativo y métricas de éxito.
-   **HU 7.3 (R1, Gating):** Elaborar **plan de cutover** (ventana, pasos, roles, comunicación) coordinado con operación.
-   **HU 7.4 (R1, Gating):** Definir **plan de backout** (reversa) con criterios, tiempos y validaciones de retorno seguro.
-   **HU 7.5 (R1, Gating):** Diseñar y ejecutar **validación post-cutover** (conciliación contable, liquidaciones, integraciones) con criterios de aceptación.

### 3.8. Épica 8: Operación y Observabilidad
*Asegurar visibilidad del sistema en producción y capacidad de respuesta ante incidentes.*

-   **HU 8.1 (R1):** Implementar **telemetría centralizada** (logs, métricas, trazas) y tableros de seguimiento (incluye EDN/RDN ejecutadas por proceso).
-   **HU 8.2 (R1):** Configurar **alertas** (SLO breach, fallas de lote, integraciones, outbox/colas) con políticas de escalamiento.
-   **HU 8.3 (R1):** Documentar **runbooks operativos** (procedimientos estándar y de contingencia).
-   **HU 8.4 (R1):** Monitorear **idempotencia y outbox** (reintentos, duplicados, atascos) con reportes periódicos.

### 3.9. Épica 9: Seguridad y Cumplimiento
*Proteger PII, asegurar cumplimiento regulatorio y custodiar evidencias.*

-   **HU 9.1 (R1):** Definir **política de PII y clasificación de datos**; aplicar principios de minimización y enmascaramiento.
-   **HU 9.2 (R1):** Implementar **cifrado en tránsito y en reposo** para datos sensibles y artefactos.
-   **HU 9.3 (R1):** Aplicar **controles de acceso** por rol (least privilege) y auditoría de accesos.
-   **HU 9.4 (R1):** Establecer **custodia WORM** para evidencias y reportes requeridos por auditoría/regulador.

### 3.10. Épica 10: Adopción y Gestión del Cambio
*Preparar a los equipos usuarios/operación para la adopción del sistema.*

-   **HU 10.1 (R1):** Elaborar **manuales y guías de operación** (incluye checklists de cierre y revisión).
-   **HU 10.2 (R1):** Ejecutar **capacitaciones y UAT guiado** con scripts de demo y criterios de aceptación.
-   **HU 10.3 (R1):** Planificar **comunicación de cambios y soporte** (canales, horarios, flujo de incidencias).

### 3.11. Épica 11: Construcción de Interfaz de Usuario (Frontend)
*Esta épica agrupa todo el trabajo de desarrollo necesario para construir las interfaces de usuario definidas en el documento de Experiencia de Usuario y validadas a través del prototipo (HU 1.7). Transforma el diseño en una aplicación funcional, conectada a los servicios del backend.*

-   **HU 11.1 (R1):** Como *Desarrollador Frontend*, quiero construir una **librería de componentes reutilizables** (Tablas, Formularios, Modales, Botones) basados en el prototipo, para asegurar consistencia visual y acelerar el desarrollo de las vistas.
-   **HU 11.2 (R1):** Como *Analista*, quiero una **estructura de aplicación principal navegable** (layout, menú, enrutamiento) para moverme entre las diferentes secciones del sistema.
-   **HU 11.3 (R1):** Como *Usuario*, quiero una pantalla de **`Dashboard` y `Búsqueda Global`** funcionales para tener un punto de partida y encontrar beneficiarios rápidamente.
-   **HU 11.4 (R1):** Como *Analista*, quiero la **`Bandeja de Tareas`** implementada y conectada a los datos para poder gestionar mi carga de trabajo.
-   **HU 11.5 (R1):** Como *Analista*, quiero la **`Vista FichaPersona`** implementada para consultar la información 360° de un beneficiario.
-   **HU 11.6 (R1):** Como *Analista*, quiero la **`Vista Detalle de Expediente`** implementada para analizar los casos del "camino feliz" de R1.
-   **HU 11.7 (R2):** Como *Supervisor*, quiero la **`Vista Detalle de Incidente (FVM)`** implementada para gestionar las excepciones de dominio.
-   **HU 11.8 (R1):** Como *Operador de Pagos*, quiero la **`Vista de Procesos Masivos`** implementada para poder ejecutar y monitorear los ciclos de pago.
-   **HU 11.9 (R1):** Como *Analista*, quiero que la **`Bandeja de Tareas` implemente el algoritmo de Índice de Prioridad de Tarea (IPT)** para que los casos más críticos se ordenen automáticamente al principio.
-   **HU 11.10 (R2):** Como *Analista*, quiero las **pantallas de administración para Beneficios Externos y Deudas** para poder gestionar estos datos maestros de forma eficiente.

### 3.12. Épica 12: Gestión Financiera y Concurrencia
*Esta épica cubriría los procesos para solicitar y procesar pagos hacia y desde otras entidades (mutuales, IPS) cuando una prestación es de responsabilidad compartida, cubriendo los procesos PDN-FIN.*

-   **HU 12.1 (R2):** Como *Operador Financiero*, quiero **generar y enviar cobros de concurrencia** a otros organismos para recuperar los fondos que nos corresponden (`PDN-FIN-001`).
-   **HU 12.2 (R2):** Como *Operador Financiero*, quiero una interfaz para **recibir, validar y procesar solicitudes de concurrencia** de otros organismos, para cumplir con nuestras obligaciones de pago (`PDN-FIN-002`).
-   **HU 12.3 (R2):** Como *Sistema*, quiero ejecutar el proceso de **compensación trimestral** de deudas y créditos por concurrencia para saldar cuentas (`PDN-FIN-004`).

### 3.13. Épica 13: Monitoreo Proactivo y Notificaciones Regulatorias
*Esta épica se centraría en los procesos automatizados que vigilan eventos futuros y en la generación de comunicaciones formales y notificaciones específicas gatilladas por eventos del dominio.*

-   **HU 13.1 (R2):** Como *Sistema*, quiero **monitorear la proximidad de cese de beneficios** para notificar preventivamente a los beneficiarios y reducir la incertidumbre (`PDN-MON-004`).
-   **HU 13.2 (R2):** Como *Sistema*, quiero generar y enviar **notificaciones formales y automáticas a empleadores y AFPs** cuando se otorga una pensión que requiere acciones de su parte (`NOTIF-EMP-001`, `NOTIF-AFP-001`).
-   **HU 13.3 (R2):** Como *Sistema*, quiero generar **informes regulatorios específicos y no masivos** gatillados por eventos, como la notificación a SUSESO por suspensión de subsidio (`IR-SUSESO-004`).

---

## 4. Dependencias y Ruta Crítica

---

## 4. Dependencias y Ruta Crítica

- **Contratos de Integración primero (R1)**: antes de construir ingestas y archivos de salida se deben cerrar los contratos (layout, encoding, PII, transporte, idempotencia) con Registro Civil, IPS/PGU, Fonasa, CCAF, Banco, PREVIRED, SAP y SUSESO/GRIS. Esto habilita las HUs de Integraciones y el ciclo de Pago. [Dep: Épica 5 ➜ Épica 4]
- **Gobernanza de Regulariza antes de implementación (R1)**: el orden de reglas, estrategia de re-ejecución y generación/retención de evidencias se definen antes de construir el motor y el orquestador de pagos. [Dep: Épica 4 (diseño) ➜ Épica 4 (motor/orquestador)]
- **SLOs de ventana operativa como puerta de salida (R1)**: los criterios de rendimiento (p95/p99, throughput, volumen) deben cumplirse antes de UAT y Go/No-Go del release. [Dep: Épica 4 ➜ UAT/Go-NoGo]
- **Migración y Cutover (R1)**: se ejecuta como paquete de cierre con ensayo general (dress rehearsal), plan de cutover y backout, más conciliación post-productivo. Es gating para salida de R1. [Dep: Todas ➜ Épica 7]
- **Contingencias por integración (R1)**: cada integración crítica requiere plan de rollback y degradación controlada para evitar bloqueos del lote mensual. [Dep: Épica 5]

---

## 5. Glosario

- **PDN (Proceso de Negocio)**: flujo de trabajo de alto nivel que resuelve un objetivo del negocio (por ejemplo, Pago Mensual) y que agrupa etapas y reglas.
- **EDN (Etapa de Negocio)**: paso intermedio dentro de un PDN que estructura la ejecución, facilita la trazabilidad y define puntos de control.
- **RDN (Regla de Negocio)**: unidad atómica de lógica (validación o cálculo) aplicada por el sistema de forma auditable y versionable.
- **BDD (Behavior-Driven Development)**: enfoque de calidad basado en escenarios ejecutables que describen el comportamiento esperado con Given/When/Then.
- **CI/CD (Integración y Despliegue Continuos)**: prácticas y pipeline para integrar cambios y desplegarlos de manera segura y repetible.
- **UAT (User Acceptance Testing)**: pruebas de aceptación realizadas por usuarios para validar que un incremento cumple objetivos de negocio.
- **DoD (Definition of Done)**: criterio acordado para considerar una historia, épica o release como “hecha”, incluyendo pruebas, documentación y trazabilidad.
- **E2E (End-to-End)**: validación de extremo a extremo que cubre el flujo completo de uso desde la entrada de datos hasta la salida operativa.
- **AF (Asignación Familiar)**: subsidio estatal asociado a cargas familiares; interviene en el mantenimiento y el pago mensual.
- **IPS (Instituto de Previsión Social)**: entidad estatal que provee información como PGU, aguinaldos y otros insumos regulatorios.
- **PGU (Pensión Garantizada Universal)**: beneficio estatal que complementa pensiones de bajo monto y que se incorpora como haber en la liquidación.
- **PREVIRED**: plataforma para pago y declaración de cotizaciones previsionales; recibe archivos de salida desde el sistema.
- **CCAF (Cajas de Compensación de Asignación Familiar)**: entidades que administran beneficios y créditos; originan descuentos en las liquidaciones.
- **SUSESO (Superintendencia de Seguridad Social)**: regulador que exige reportes como GRIS y, en algunos casos, SIVEGAM.
- **GRIS**: estándar de reporte regulatorio exigido por SUSESO para unificar la información de pensiones entre entidades.
- **SIVEGAM**: sistema de SUSESO para reportería específica; su integración puede planificarse en releases posteriores.
- **SAP**: sistema ERP utilizado para contabilidad; recibe comprobantes (por ejemplo, PRP) generados por el sistema.
- **IPC (Índice de Precios al Consumidor)**: indicador usado para reajustar pensiones y parámetros en fechas definidas o por umbral acumulado.
- **MDLO (Manual del Dominio Lógico y Operacional)**: documentación que define el modelo de dominio, entidades, procesos y reglas del negocio.
- **ADR (Arquitectural Decision Record)**: registro de decisiones arquitectónicas que justifican elecciones técnicas y de diseño.
- **HU (Historia de Usuario)**: unidad de planificación que describe una necesidad de usuario/negocio y su resultado esperado.
- **R1 / R2 (Release 1 / Release 2)**: olas de entrega que agrupan HUs de varias épicas para habilitar valor end-to-end en etapas sucesivas.