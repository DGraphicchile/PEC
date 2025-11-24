# Anexo D: Reglas de Negocio (RDN)

*Propósito: Detallar la lógica atómica y los criterios fundamentales que gobiernan el comportamiento del sistema. Cada regla representa una pieza de conocimiento de negocio que debe ser aplicada en un contexto específico.*

---

## 1. Reglas de Validación (`VALID`)
*Reglas que verifican condiciones y aseguran la integridad de los datos antes de ejecutar un proceso.*

- **`VALID-OTG-001`**: Verifica que un trabajador independiente tenga sus cotizaciones al día para poder recibir una prestación.
- **`VALID-OTG-002`**: Impide la constitución de una pensión transitoria por límite de subsidio para funcionarios públicos.
- **`VALID-SOBREV-001`**: Validar elegibilidad de madre de hijos del causante. 
- **`VALID-ACUERDO-001`**: Asegura que la vigencia de un poder notarial para cobro no exceda los 2 años.
- **`VALID-ACUERDO-002`**: Valida que el cobrador de un pago directo de Asignación Familiar sea un causante vigente.
- **`VALID-ACUERDO-003`**: Impone el límite máximo de retención judicial sobre una pensión (ej. 50%).
- **`VALID-MANT-001`**: Verifica que un certificado de estudios para una pensión de orfandad se presente dentro del plazo legal.
- **`VALID-MANT-002`**: Impide que se aplique una reevaluación sobre una Gran Invalidez ya constituida.
- **`VALID-PAGO-001`**: Determina si la mutualidad es responsable del pago del aguinaldo, comparando montos con otras pensiones.
- **`VALID-PAGO-002`**: Determina si un pensionado califica para el Bono de Invierno según su edad y monto de pensión.

---

## 2. Reglas de Cálculo (`CALC`)

### 2.1. Cálculo de Sueldo Base y Beneficios de Origen (`CALC-OTG`)
- **`CALC-OTG-001`**: Orquesta el cálculo del Sueldo Base Mensual para trabajadores dependientes.
- **`CALC-OTG-002`**: Calcula el monto base para una o más pensiones de sobrevivencia a partir de la pensión del causante.

### 2.2. Cálculo de Pensión Imponible (`CALC-PIM`)
*Reglas que construyen el monto imponible de una liquidación.*

- **`CALC-PIM-001`**: Calcula el monto de la Bonificación de Viudez según la Ley N°19.403.
- **`CALC-PIM-002`**: Calcula el monto de la Bonificación según la Ley N°19.539.
- **`CALC-PIM-003`**: Calcula el monto de la Bonificación según la Ley N°19.953.
- **`CALC-PIM-004`**: Calcular Suplemento por Gran Invalidez.
- **`CALC-PIM-005`**: Calcular Incremento por Hijo para Asignación Familiar.

### 2.3. Cálculo de Pensión Líquida (`CALC-PLI`)
*Reglas que operan sobre el monto imponible para llegar al líquido a pagar.*

- **`CALC-PLI-001`**: Calcula el descuento legal de salud (7% o el plan de Isapre).
- **`CALC-PLI-002`**: Calcula el descuento legal de previsión según la tasa de la AFP correspondiente.
- **`CALC-PLI-003`**: Calcula el monto a pagar por Asignación Familiar según los causantes vigentes.
- **`CALC-PLI-004`**: Asigna el monto de la Pensión Garantizada Universal (PGU) como un haber.
- **`CALC-PLI-005`**: Aplica el beneficio de Exención de Salud, generando un haber que anula el descuento.
- **`CALC-PLI-006`**: Aplica el beneficio de Rebaja de Salud, generando un haber que disminuye el descuento.
- **`CALC-PLI-007`**: Aplica una Retención Judicial según la configuración del acuerdo de pago.
- **`CALC-PLI-008`**: Aplica los descuentos por convenios con Cajas de Compensación (CCAF).
- **`CALC-PLI-009`**: Calcula los días exactos a pagar para una prestación que se inactiva en el mes en curso.
- **`CALC-PLI-010`**: Calcula los días pagados en exceso cuando una inactivación se informa de forma retroactiva.
- **`CALC-PLI-011`**: Aplicar Ajustes Manuales Pendientes
- **`CALC-PLI-012`**: Redondeo de Monto Final.
- **`CALC-PLI-013`**: Aplicación del Tope Legal Artículo 50. Aplica límites legales al monto imponible o a los haberes/descuentos correspondientes según el artículo 50 aplicable, asegurando que el resultado cumpla el tope vigente.
  - Entradas/Salidas (alto nivel): monto imponible, conceptos candidatos a tope, parámetros normativos y valores dinámicos relevantes; retorna conceptos ajustados y total tope aplicado.
  - Dependencias: `ParametrosNormativos` y, si corresponde, `Servicio de Indicadores` para valores vigentes.
  - Versión actual: `v1`.

### 2.4. Cálculo de Mantenimiento (`CALC-MANT`)
- **`CALC-MANT-001`**: Aplica el reajuste por variación del IPC a todas las pensiones activas.
- **`CALC-MANT-002`**: Asegura que una reevaluación de pensión nunca resulte en un monto inferior al que ya se recibía.
- **`CALC-MANT-003`**: Recalcula los porcentajes de una pensión de sobrevivencia cuando uno de los beneficiarios cesa.

### 2.5. Cálculo de Reportería y Finanzas (`CALC-REP`, `CALC-FIN`)
- **`CALC-FIN-001`**: Calcula la prorrata de concurrencia para distribuir la responsabilidad de pago entre organismos.
- **`CALC-REP-001`**: Calcula el campo "PENSION CAPITAL" para el informe regulatorio GRIS R01.

### 2.6. Cálculo complementario de Otorgamiento (extensión)

- **`CALC-OTG-003`**: Determina el monto final de pensión en otorgamiento, componiendo resultados de `CALC-OTG-001/002` y parámetros/directivas aplicables al caso base.
  - Entradas/Salidas: resultado de sueldo base, factores de porcentaje por tipo de pensión, topes aplicables, fecha de vigencia; retorna monto base del beneficio.
  - Versión actual: `v1`.

- **`CALC-OTG-004`**: Cálculo de Bono por Matrimonio (pago único) asociado a nuevas nupcias en viudez, cuando corresponde según normativa.
  - Entradas/Salidas: condición de evento (`EVT-CICLO-002`), elegibilidad, montos/porcentajes normativos; retorna concepto único (haber) y evidencia de cálculo.
  - Versión actual: `v1`.

---

## 3. Reglas de Mapeo (`MAP`)
*Reglas que transforman datos del dominio interno a los códigos requeridos por sistemas externos.*

- **`MAP-REP-001`**: Homologa el estado civil del sistema a los códigos definidos por SUSESO para el informe GRIS.

---

## 4. Reglas de Ciclo de Vida (`CICLO`)
*Reglas que definen transiciones de estado automáticas basadas en eventos del ciclo de vida.*

- **`CICLO-INAC-001`**: Define la inactivación automática de una carga familiar al cumplir la mayoría de edad.
- **`CICLO-INAC-002`**: Define la inactivación automática de una carga familiar por fallecimiento.
- **`CICLO-CESE-001`**: Define el cese de una pensión de viudez cuando el beneficiario contrae un nuevo vínculo.

---

## 5. Reglas de Cumplimiento (`CUMP`)
*Reglas que definen plazos y condiciones de prescripción según la normativa.*

- **`CUMP-OTG-001`**: Plazo máximo para el pago de una Indemnización (90 días).
- **`CUMP-OTG-002`**: Plazo máximo para el pago de una Pensión de Invalidez (30 días).
- **`CUMP-OTG-003`**: Plazo máximo para el pago de una Pensión de Sobrevivencia (30 días).
- **`CUMP-OTG-004`**: Plazo máximo para que un empleador entregue antecedentes (3 días hábiles).
- **`CUMP-MANT-001`**: Plazo de prescripción del derecho a cobro de un Subsidio (6 meses).
- **`CUMP-ASIGFAM-001`**: Plazo de prescripción del derecho a cobro de Asignación Familiar retroactiva (5 años).
- **`CUMP-PAG-001`**: Prescripción de solicitud de reembolso de empleador público. Verifica que la solicitud de reembolso por parte de una entidad empleadora del sector público se realice dentro del plazo máximo de 6 meses desde el pago de la remuneración correspondiente.

---

## 6. Reglas de Comunicación (`COMM`)
*Reglas que gatillan comunicaciones a los beneficiarios.*

- **`COMM-MANT-001`**: Define el envío de la notificación de proximidad de cese por edad (6 meses antes).
- **`COMM-OTG-005`**: Registrar Gestión por Documentación Faltante. Si vence el plazo de entrega de antecedentes definido en **`CUMP-OTG-004`** sin recepción completa de los documentos requeridos para un `Tramite` de otorgamiento, el sistema debe crear una instancia de `GestionDeContacto` asociada al `ExpedienteDeTramite`, registrando el medio, resultado y fecha del intento de contacto. Esta regla puede ser gatillada por **`PDN-MON-003`** o por eventos del proceso de otorgamiento.

---

## 7. Reglas de Verificación Humana (`VERF`)
*Reglas que requieren la aprobación explícita de un usuario con un rol específico para continuar un proceso.*

- **`VERF-GOB-001`**: Aprobación de Plan de Acción para Incidente de Dominio. Requiere que un `Líder de Equipo de Gobernanza` valide el diagnóstico y la solución propuesta para una Excepción de Dominio antes de que se aplique.

---

## 8. Plantilla de Documentación por RDN (con Versionado)

Use esta plantilla para cada RDN:

- **ID**: `<CATEG>-<CÓDIGO>`
- **Propósito**: objetivo de la regla
- **Entradas/Salidas**: datos relevantes
- **Dependencias de parámetros**: claves de `ParametrosNormativos`
- **Versión actual**: `vN`
- **Historial de versiones y vigencias**: resumen por `MarcoNormativo`
- **Cobertura de pruebas**: enlaces a casos y escenarios

---

## 9. Política de Versionado de RDN

- **Major (vN+1)**: Cambio de algoritmo con impacto en contratos o resultados observables.
- **Minor**: Añade capacidades compatibles (p. ej., nuevo caso soportado).
- **Patch**: Corrección sin alterar el contrato.

La versión algorítmica de una RDN se gobierna mediante la `DirectivaDeEjecucion` activa y su trazabilidad en las matrices (ver cap. 12).
