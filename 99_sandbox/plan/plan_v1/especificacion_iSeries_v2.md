# Especificación Funcional del Sistema iSeries (Legado) - Versión Detallada Final

*Propósito: Este documento traduce la funcionalidad del sistema iSeries, descrita en la reunión del 2025-08-08 y refinada con la retroalimentación de expertos, a la terminología y estructura del Manual del Dominio Lógico y Operacional (MDLO). Su objetivo es identificar claramente qué procesos de negocio, reglas y entidades están soportados por el sistema actual, incluyendo los puntos de fricción operacional y las lógicas manuales implícitas.*

---

## 1. Resumen Ejecutivo y Filosofía del Sistema

El sistema iSeries es el soporte operacional histórico para la gestión de pensiones. A diferencia de la filosofía del MDLO (Inmutabilidad, Auditabilidad, Trazabilidad), iSeries opera con un enfoque pragmático, centrado en la ejecución de pagos mensuales.

Su diseño refleja una era de menor integración, caracterizada por:
- **Procesos Manuales Intensivos:** Muchas tareas críticas, como la carga de datos desde sistemas externos, la validación de archivos y la gestión de excepciones, dependen de la intervención de analistas.
- **Flexibilidad sobre Rigidez:** El sistema permite la continuación de flujos de trabajo incluso con información incompleta para no detener la operación. El caso más común y crítico de esta filosofía es la decisión de **continuar con el pago de pensiones aun sin haber recibido el archivo de confirmación de supervivencia del Registro Civil**.
- **Trazabilidad Basada en Documentos:** La auditoría se apoya en la generación y archivo de documentos (PDFs, informes) y en la gestión documental de sistemas como **SharePoint y carpetas compartidas**. La justificación de una acción depende de encontrar el documento de respaldo, no de una pista de auditoría interna en la base de datos.
- **Integración Exclusiva por Archivos Planos:** La comunicación con sistemas clave se realiza únicamente mediante la generación y transferencia de archivos. Este método es una fuente constante de fricción, requiriendo la **validación y corrección manual de archivos**, especialmente aquellos con formatos o nombres inconsistentes.

---

## 2. Capacidades del Sistema (Procesos de Negocio Soportados)

A continuación, se detallan los Procesos de Negocio (PDN) del MDLO que tienen un soporte, total o parcial, en el sistema iSeries.

### 2.1. Procesos de Otorgamiento (OTG) - Soporte Parcial

iSeries interviene principalmente en la fase de cálculo y formalización, mientras que las etapas iniciales son manuales y documentales.

- **PDN-OTG-001: Consolidación de Rentas para Cálculo:** **Soportado.**
- **PDN-OTG-002: Otorgamiento y Activación de Prestación:** **Soportado.**
- **PDN-OTG-006: Otorgamiento de Prestaciones de Sobrevivencia:** **Soportado.**

### 2.2. Procesos de Mantenimiento (MANT) - Soporte Parcial y Manual

La mayoría de los procesos de mantenimiento son gatillados y ejecutados manualmente por analistas.

- **PDN-MANT-001 / PDN-MANT-010: Cese de Pensión (Edad, Nuevo Vínculo, Fallecimiento):** **Soportado.** El sistema permite inactivar pensiones. El gatillador es un proceso manual basado en la información recibida del Registro Civil (`INT-REGCIVIL-001`).
- **PDN-MANT-002 / PDN-MANT-003: Suspender/Reactivar Pensión de Orfandad:** **Soportado.** Un analista ejecuta manualmente la suspensión o reactivación en iSeries tras recibir (o no) el certificado de estudios. El sistema calcula el pago retroactivo si corresponde.
- **PDN-MANT-009: Gestionar Acuerdo de Pago:** **Soportado.**
- **PDN-MANT-012: Regularización de Pensiones de Sobrevivencia (Art. 50):** **Soporte Parcial y de Alto Riesgo Manual.** El sistema **no** calcula ni propone los nuevos porcentajes de pensión. El analista debe **calcularlos manualmente** y luego ingresarlos en iSeries. Este proceso es especialmente propenso a errores en casos con múltiples beneficiarios y requiere ajustes manuales significativos.
- **PDN-MANT-016: Gestionar Ajustes Manuales de Liquidación:** **Soportado** a través de la funcionalidad de "pagos extraordinarios/no formulables".

### 2.3. Procesos de Pagos (PAG) - Soporte Fuerte

Esta es la capacidad central y más robusta de iSeries.

- **PDN-PAG-001: Ciclo de Pago Mensual (Orquestador):** **Soportado.**
- **PDN-PAG-002 / PDN-PAG-003: Cálculo de Pensión Imponible y Líquida:** **Soportado.**
- **PDN-PAG-004: Aplicación Masiva de Reajuste por IPC:** **Soportado (Iniciado Manualmente).** El sistema realiza el reajuste masivo, pero el proceso debe ser iniciado y supervisado por un analista; no se ejecuta de forma 100% autónoma en una fecha fija.
- **PDN-PAG-008: Generación de Nómina de Pago a Banco:** **Soportado.**
- **PDN-PAG-009: Generación de Archivo de Cotizaciones a PREVIRED:** **Soportado.**
- **PDN-PAG-010: Generar Comprobante de Contabilización SAP:** **Soportado.**

### 2.4. Procesos de Gestión Financiera (FIN) - Soporte Débil

- **PDN-FIN-001 / PDN-FIN-002: Gestión de Concurrencia:** **Soporte Parcial.** iSeries solo almacena el resultado (porcentaje) de la prorrata. La lógica de cálculo reside en una plataforma externa.

### 2.5. Procesos de Reportería (REP) - Soporte Parcial

- **PDN-REP-003: Generación y Envío de Informe Financiero SIVEGAM:** **Soportado.**
- **PDN-REP-004: Generación y Envío de Informe GRIS R01:** **Soportado.**

### 2.6. Procesos de Monitoreo (MON) - Soporte Híbrido (Manual-Batch)

Contrario a la impresión inicial, iSeries sí cuenta con procesos batch automáticos para tareas como la inactivación por edad o el cierre de asignación familiar. Sin embargo, estos no son completamente autónomos; se ejecutan tras una validación y cierre manual por parte de un analista.

- **PDN-MON-005 / PDN-MON-006: Cruce con Registro Civil:** **Soportado (Manual).**
- **PDN-MON-007: Monitoreo de Edad para Ajuste de Pensión Mínima:** **Soportado.**

---

## 3. Lógica de Negocio y Entidades Gestionadas

### 3.1. Reglas de Negocio (RDN) Implementadas

- **Cálculo de Retroactivo:** `CALC-OTG-001` (implícito).
- **Cálculo Detallado de Retroactivos:** En casos complejos, el sistema calcula automáticamente el desglose mes a mes del monto retroactivo, proveyendo el detalle para la revisión del analista.
- **Cálculo de Asignación Familiar por Tramo:** `CALC-PLI-003`.
- **Cálculo Prorrata (Concurrencia):** `CALC-FIN-001` (parcial, el dato se almacena).
- **Cálculo de Descuentos Legales:** `CALC-PLI-001` (Salud), `CALC-PLI-002` (Previsión).
- **Recálculo por Cese de Beneficiario (Art. 50):** `CALC-MANT-003` (parcial, ver sección 2.2).
- **Reajuste por IPC:** `CALC-MANT-001`.

### 3.2. Entidades de Dominio Gestionadas

- `Persona` / `FichaPersona`, `PrestacionEconomica`, `CausanteAsignacionFamiliar`, `LiquidacionDePago`, `AcuerdoDePago`.

### 3.3. Gestión de Parámetros Históricos (Análogo a Snapshot Normativo)

A diferencia de la suposición inicial, iSeries sí cuenta con una capacidad para manejar la evolución normativa de los parámetros de cálculo. El sistema mantiene un "mantenedor" donde se almacenan los valores históricos (ej. topes imponibles, pensiones mínimas). Cuando se realiza un cálculo, el sistema utiliza el parámetro vigente para el mes correspondiente al evento, asegurando que los cálculos retroactivos se ejecuten con los valores correctos de su época. Esta funcionalidad es análoga en su propósito al `SnapshotNormativo` (SNA) del MDLO.

---

## 4. Interfaces, Excepciones y Puntos de Fricción Operacional

### 4.1. Interfaces Externas y Fricción Operacional

Se confirma que **todas y cada una** de las integraciones con sistemas externos se realizan **exclusivamente** a través del intercambio de archivos planos (TXT, CSV), requiriendo intervención manual o semi-manual. No existen conexiones directas tipo API ni consultas en línea a bases de datos externas.

- **Tarea Manual Frecuente:** La validación y corrección de estos archivos es una de las tareas manuales más recurrentes y problemáticas para los analistas.
- **Fuente de Rechazos:** El archivo de integración con las **Cajas de Compensación de Asignación Familiar (CCAF)** es el que más frecuentemente genera rechazos o requiere correcciones manuales, principalmente por problemas de formato y nombres inconsistentes.

### 4.2. Gestión de Excepciones y Riesgo Operacional

La gestión de excepciones en iSeries es un reflejo de su filosofía de priorizar la continuidad del pago, lo que introduce riesgos significativos y desafíos de auditoría:

- **Inexistencia de `IncidenteDeDominio`:** No hay un registro sistémico de excepciones. Se depende de la recomendación de levantar un "caso formal" documental para la trazabilidad.
- **Riesgo por Flexibilidad (Caso Crítico):** El sistema no impide operaciones riesgosas. El caso más crítico es **continuar pagando pensiones sin tener la confirmación de supervivencia del Registro Civil**. La posterior regularización de pagos a personas ya fallecidas es descrita como el proceso más **doloroso y propenso a errores**.
- **Desafío de Auditoría:** La pregunta más difícil de responder en una auditoría es **justificar los pagos realizados sin documentación completa**, especialmente cuando se pagó a personas fallecidas. La trazabilidad depende enteramente de encontrar los documentos que respalden la excepción formal, lo cual es un proceso manual y falible.

---

## 5. Conclusiones: Brechas y Cobertura del MDLO

El sistema iSeries provee un soporte robusto para el **corazón del proceso de pago (`PDN-PAG`)**. Sin embargo, presenta brechas significativas en las áreas que el MDLO busca fortalecer:

1.  **Automatización y Monitoreo:** Muchos procesos de monitoreo (`PDN-MON`) y mantenimiento (`PDN-MANT`) dependen de un modelo híbrido que requiere intervención manual para iniciar o validar, en lugar de ser completamente autónomos. Además, procesos críticos como el recálculo del Art. 50 siguen siendo manuales.
2.  **Gobernanza de Datos:** La gestión de excepciones es laxa y su dependencia de la intervención manual para regularizar pagos a fallecidos representa un **riesgo operacional y de auditoría material**.
3.  **Integración:** La dependencia **exclusiva** de archivos planos genera una **alta carga operativa** en la validación y corrección manual, siendo una fuente constante de errores, especialmente con las CCAF.
4.  **Trazabilidad y Auditabilidad:** Si bien el sistema maneja correctamente los **parámetros normativos históricos** (de forma análoga al `SnapshotNormativo`), la trazabilidad de los **cambios operativos manuales** (quién, cuándo, por qué) y de **decisiones críticas** (como continuar un pago sin evidencia de supervivencia) sigue siendo documental y no a nivel de base de datos, a diferencia de lo que prescribe el MDLO para la auditoría de acciones.
5.  **Visión 360:** La información está fragmentada y muchos procesos de validación (legal, médica) ocurren fuera del sistema, impidiendo una visión consolidada como la que propone la `FichaPersona`.
