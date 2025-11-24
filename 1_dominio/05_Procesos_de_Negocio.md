# Anexo C: Procesos de Negocio (PDN)

*Propósito: Describir los flujos de trabajo de alto nivel del dominio. Cada proceso se define por su Identificador de Negocio, un conjunto de Etiquetas Técnicas que guían su implementación, y el desglose de sus Etapas de Negocio (EDN) principales.*

---

## 1. Procesos de Otorgamiento (OTG)
*Flujos de trabajo relacionados con la iniciación y concesión de nuevos beneficios.*

- **PDN-OTG-001: Consolidación de Rentas para Cálculo:** Recopila y calcula el sueldo base de un siniestro para determinar el monto del beneficio.
- **PDN-OTG-002: Otorgamiento y Activación de Prestación:** Formaliza y activa un beneficio económico que ha sido aprobado.
- **PDN-OTG-003: Denegación de Prestación:** Rechaza formalmente una solicitud de beneficio que no cumple los requisitos.
- **PDN-OTG-004: Constitución de Pensión Transitoria por Límite de Subsidio:** Otorga una "Pensión de Invalidez Total Transitoria" (estado `Activa_Transitoria`) al agotarse el subsidio por incapacidad laboral (104 semanas), según lo define el Compendio Normativo.
- **PDN-OTG-005: Otorgamiento para Múltiples Empleadores:** Gestiona el otorgamiento de un beneficio para un trabajador con varios empleadores simultáneos.
- **PDN-OTG-006: Otorgamiento de Prestaciones de Sobrevivencia:** Otorga pensiones a los beneficiarios de un causante fallecido, validando su elegibilidad.

---

## 2. Procesos de Mantenimiento del Ciclo de Vida (MANT)
*Flujos de trabajo que gestionan los cambios y eventos esperados en un beneficio a lo largo de su vida.*

- **PDN-MANT-001: Cese de Pensión por Edad de Vejez:** Finaliza una pensión de invalidez cuando el beneficiario alcanza la edad legal de jubilación.
- **PDN-MANT-002: Suspender Pensión de Orfandad por Falta de Acreditación:** Detiene temporalmente el pago de una pensión de orfandad por no presentar un certificado de estudios.
- **PDN-MANT-003: Reactivar Pensión de Orfandad por Acreditación:** Reanuda el pago de una pensión de orfandad suspendida tras recibir un certificado de estudios válido.
- **PDN-MANT-004: Aplicar Revisión de Incapacidad (Agravamiento):** Modifica el monto de una pensión existente debido a un agravamiento de la incapacidad.
- **PDN-MANT-005: Aplicar Reevaluación de Incapacidad (Nuevo Siniestro):** Evalúa una nueva incapacidad para un beneficiario que ya recibe una pensión por un siniestro anterior.
- **PDN-MANT-006: Gestionar Suspensión de Pensión Concurrente (D.L. 3.500):** Suspende el pago de la pensión de la Ley 16.744 si es incompatible con una del sistema de AFP.
- **PDN-MANT-007: Sincronización Masiva de Vigencia de Causantes (SIVEGAM):** Actualiza masivamente el estado de las cargas familiares consultando el sistema SIVEGAM.
- **PDN-MANT-008: Gestionar Exportación de Pensión:** Adapta y gestiona el pago de una pensión a un beneficiario que reside en el extranjero.
- **PDN-MANT-009: Gestionar Acuerdo de Pago (Apoderados, Retenciones, etc.):** Crea o modifica acuerdos que alteran el pago, como apoderados, cuentas bancarias o retenciones.
- **PDN-MANT-010: Cese de Pensión por Nuevo Vínculo:** Finaliza una pensión de viudez cuando el beneficiario contrae matrimonio o Acuerdo de Unión Civil.
- **PDN-MANT-011: Notificación de Cese de Funciones por Pensión (Sector Público):** Informa al empleador público que un funcionario debe cesar sus funciones por obtener una pensión.
- **PDN-MANT-012: Regularización de Pensiones de Sobrevivencia (Art. 50):** Recalcula y ajusta los porcentajes de las pensiones de sobrevivencia cuando uno de los beneficiarios cesa.
- **PDN-MANT-013: Inactivar Cargas Familiares por Cese de Beneficio Principal:** Da de baja las cargas familiares asociadas a un beneficio principal que ha finalizado.
- **PDN-MANT-014: Gestionar Cambio de Entidad Previsional (AFP):** Actualiza la información de la AFP de un pensionado para el correcto pago de sus cotizaciones.
- **PDN-MANT-015: Gestionar Cambio de Sistema de Salud (Fonasa/Isapre):** Actualiza la información del sistema de salud de un pensionado para el correcto pago de sus cotizaciones.
- **PDN-MANT-016: Gestionar Ajustes Manuales de Liquidación:** Permite a un analista ingresar haberes o descuentos específicos en una liquidación de pago.
- **PDN-MANT-017: Solicitar Intervención Manual de Prestación:** Gatilla la creación de un incidente de dominio para que un caso sea revisado por un experto.
- **PDN-MANT-018: Evaluar Fin de Pensión Transitoria:** Inicia la evaluación final de una pensión otorgada por límite de subsidio para determinar si se convierte en definitiva o cesa.
- **PDN-MANT-019: Convertir Pensión Transitoria a Definitiva:** Transiciona una prestación del estado `Activa_Transitoria` a `Activa`, tras una evaluación favorable.
- **PDN-MANT-020: Cesar Pensión Transitoria sin Conversión:** Transiciona una prestación del estado `Activa_Transitoria` a `Cesada`, tras una evaluación no favorable.

---

## 3. Procesos de Corrección (COR)
*Flujos de trabajo diseñados para rectificar errores, procesar dictámenes o manejar situaciones excepcionales.*

- **PDN-COR-001: Reliquidación de Beneficio por Error:** Corrige y recalcula retroactivamente un beneficio debido a un error detectado.
- **PDN-COR-002: Procesar y Ejecutar Dictamen de Ente Regulador:** Aplica las instrucciones de un dictamen emitido por SUSESO o la COMERE.
- **PDN-COR-003: Gestionar Reversión de Beneficio con Deuda:** Anula un beneficio mal otorgado y gestiona la deuda generada por los pagos indebidos.
- **PDN-COR-004: Corrección de Rechazos de Informe Financiero SIVEGAM:** Gestiona y corrige los errores reportados por SIVEGAM en los informes financieros enviados.

---

## 4. Procesos de Pagos (PAG)
*Flujos de trabajo que orquestan el cálculo y la emisión de pagos y documentos financieros.*

- **PDN-PAG-001: Ciclo de Pago Mensual (Orquestador):** Orquesta la ejecución de todos los procesos necesarios para el pago masivo mensual de pensiones.
- **PDN-PAG-002: Cálculo de Pensión Imponible Mensual:** Calcula el monto base imponible para la liquidación de cada pensión en un período.
- **PDN-PAG-003: Cálculo de Pensión Líquida Mensual:** Aplica haberes y descuentos al monto imponible para obtener el valor líquido a pagar.
  - **Etapas (EDN):**
    1. Calcular monto imponible del período (`CALC-PIM-*`).
    2. Aplicar haberes y descuentos legales y convenidos (`CALC-PLI-001` a `CALC-PLI-011`).
    3. Ejecutar redondeo del monto final líquido conforme a **`CALC-PLI-012`**.
- **PDN-PAG-004: Aplicación Masiva de Reajuste por IPC:** Actualiza masivamente los montos de las pensiones según la variación del Índice de Precios al Consumidor.
- **PDN-PAG-005: Orquestación de Pago de Aguinaldos y Bonos:** Gestiona el pago masivo de beneficios especiales como aguinaldos o bonos de ley.
- **PDN-PAG-006: Gestionar Reembolso a Entidad Pública:** Procesa y paga las solicitudes de reembolso de subsidios a empleadores del sector público.
- **PDN-PAG-007: Aplicación de Acuerdos en Liquidación Mensual:** Aplica los acuerdos de pago vigentes (apoderados, retenciones) en la liquidación mensual.
- **PDN-PAG-008: Generación de Nómina de Pago a Banco de Chile:** Genera el archivo para el banco con la nómina de pagos a realizar a los beneficiarios.
- **PDN-PAG-009: Generación de Archivo de Cotizaciones a PREVIRED:** Genera el archivo para PREVIRED con el detalle de las cotizaciones de salud y previsión a pagar.
- **PDN-PAG-010: Generar Comprobante de Contabilización SAP:** Genera el archivo para la contabilización de los pagos en el sistema SAP.

---

## 5. Procesos de Gestión Financiera (FIN)
*Flujos de trabajo relacionados con la administración de flujos de dinero entre instituciones.*

- **PDN-FIN-001: Solicitar Cobro de Concurrencia a Otros Organismos:** Emite el cobro a otras mutualidades por la parte de una pensión que les corresponde pagar.
- **PDN-FIN-002: Procesar Solicitud de Concurrencia Recibida:** Gestiona y paga las solicitudes de cobro de concurrencia recibidas de otras mutualidades.
- **PDN-FIN-003: Iniciar Cobranza por Deuda Previsional del Empleador:** Inicia el proceso de cobranza judicial a un empleador por cotizaciones no pagadas.
- **PDN-FIN-004: Compensación Trimestral de Concurrencias de Pensiones:** Realiza el balance y compensación de deudas por concurrencia con otras mutualidades.

---

## 6. Procesos de Reportería Regulatoria (REP)
*Flujos de trabajo dedicados a cumplir con las obligaciones de información a entes reguladores.*

- **PDN-REP-001: Generar Informe Mensual de Otorgamientos a SUSESO:** Genera y envía el informe mensual de nuevos beneficios otorgados a SUSESO.
- **PDN-REP-002: Generar Informes de Rebajas y Exenciones para IPS:** Genera y envía los informes para el IPS relacionados con beneficios de salud para pensionados.
- **PDN-REP-003: Generación y Envío de Informe Financiero SIVEGAM:** Genera y envía el informe financiero de asignación familiar al sistema SIVEGAM.
- **PDN-REP-004: Generación y Envío de Informe GRIS R01 - Pensiones Vigentes:** Genera y envía el informe GRIS R01 con el detalle de las pensiones vigentes a SUSESO.

---

## 7. Procesos de Monitoreo (MON)
*Flujos de trabajo proactivos y automatizados que observan condiciones para anticipar o disparar otros procesos.*

- **PDN-MON-001: Monitoreo de Plazo de Otorgamiento (SLA):** Vigila el cumplimiento de los plazos legales para otorgar los diferentes beneficios.
- **PDN-MON-002: Monitoreo de Reajuste por IPC:** Vigila la variación del IPC para gatillar automáticamente el proceso de reajuste de pensiones.
- **PDN-MON-003: Monitoreo de Plazo de Entrega de Antecedentes del Empleador:** Vigila el cumplimiento de los plazos que tienen los empleadores para entregar documentación.
  - **Acciones automáticas:** Al detectar vencimiento del plazo definido en **`CUMP-OTG-004`** sin documentación completa, gatillar **`COMM-OTG-005`** para registrar una `GestionDeContacto` en el `ExpedienteDeTramite` correspondiente.
- **PDN-MON-004: Notificación Preventiva de Cese de Pensión por Edad (Art. 53):** Notifica a los beneficiarios la proximidad del cese de su pensión por alcanzar la edad legal.
- **PDN-MON-005: Generación y Envío de Nómina de Consulta a Registro Civil:** Genera y envía la nómina para verificar la supervivencia y estado civil de los beneficiarios.
- **PDN-MON-006: Recepción y Procesamiento de Respuesta de Registro Civil:** Procesa el archivo de respuesta del Registro Civil para gatillar ceses por fallecimiento o nuevo vínculo.
- **PDN-MON-007: Monitoreo de Edad para Ajuste de Pensión Mínima:** Vigila la edad de los pensionados para aplicar los ajustes de pensión mínima que correspondan por ley.
- **PDN-MON-008: Monitoreo de Edad para Vigencia de Viudez:** Vigila la edad de las beneficiarias de viudez para aplicar los cambios de porcentaje de su pensión.

---

## 8. Procesos de Gobernanza (GOB)
*Flujos de trabajo que gestionan la resolución de excepciones de dominio y la intervención manual controlada.*

- **PDN-GOB-001: Gestión y Resolución de Incidentes de Dominio:** Orquesta la intervención humana para diagnosticar, resolver y auditar excepciones de dominio complejas.

---

## 9. Plantilla de Documentación por PDN (con Versionado)

Use esta plantilla para cada PDN clave:

- **ID**: `PDN-<DOM>-<CÓDIGO>`
- **Versión actual**: `vN`
- **Diagrama**: (mermaid o BPMN)
- **Dependencias RDN**: lista de `RDN` y versión
- **Vigencia por `MarcoNormativo`**: matriz (ver cap. 12)
- **Entradas/Salidas**: resumen
- **Notas de cambio**: historial por versión

---

## 10. Política de Versionado de PDN

- **Major (vN+1)**: Cambios de flujo que alteran el contrato observable del proceso.
- **Minor**: Nueva etapa opcional o comportamiento compatible.
- **Patch**: Corrección de documentación o detalles sin impacto en contrato.

Toda modificación debe quedar reflejada en la `DirectivaDeEjecucion` vigente (ver cap. 12) y en la matriz correspondiente (ver cap. 12).
