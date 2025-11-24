# Anexo F: Eventos y Excepciones

*Propósito: Centralizar la definición de todos los sucesos (Eventos) que pueden gatillar un proceso de negocio, así como las desviaciones y errores contemplados en el dominio (Excepciones).*

---

## 1. Catálogo de Eventos de Negocio (EVT)
*Un suceso significativo que ocurre dentro o fuera del sistema y que requiere una respuesta de negocio.*

### 1.1. Eventos de Otorgamiento (`EVT-OTG`)
- **`EVT-OTG-001`**: Recepción de Resolución de Incapacidad Permanente (REIP).
- **`EVT-OTG-002`**: Recepción de Solicitud de Pensión de Sobrevivencia.

### 1.2. Eventos de Ciclo de Vida (`EVT-CICLO`)
- **`EVT-CICLO-001`**: Un beneficiario cumple la edad legal para el cese de su beneficio (ej. 65 años) o para un cambio de condición (ej. 45 años para viudez).
- **`EVT-CICLO-002`**: Se recibe notificación de un nuevo vínculo (Matrimonio/AUC) de un beneficiario de viudez.
- **`EVT-CICLO-003`**: Se recibe un certificado de estudios válido para un beneficiario de orfandad.
- **`EVT-CICLO-004`**: Vence el plazo para la presentación de un certificado de estudios.
- **`EVT-CICLO-005`**: Se alcanza el límite legal de pago de subsidios (104 semanas).
- **`EVT-CICLO-006`**: Se detecta el fallecimiento de un beneficiario (ej. vía cruce con Registro Civil).

### 1.3. Eventos de Mantenimiento (`EVT-MANT`)
- **`EVT-MANT-001`**: El umbral de variación del IPC para el reajuste de pensiones es alcanzado.
- **`EVT-MANT-002`**: Se recibe una solicitud de revisión de incapacidad por agravamiento.
- **`EVT-MANT-003`**: Se otorga una pensión de invalidez a un funcionario público, gatillando notificaciones especiales.

### 1.4. Eventos de Interacción de Usuario (`EVT-USER`)
- **`EVT-USER-001`**: Un usuario solicita información sobre un beneficiario.
- **`EVT-USER-002`**: Un beneficiario interpone un reclamo o apelación a una REIP.
- **`EVT-USER-003`**: Se notifica la negativa de un beneficiario a seguir un tratamiento médico.
- **`EVT-USER-004`**: Un beneficiario acepta retomar un tratamiento médico previamente rechazado.
- **`EVT-USER-005`**: Se solicita el registro o modificación de un `AcuerdoDePago` (apoderado, cuenta bancaria, etc.).
- **`EVT-USER-006`**: Se solicita un cambio de entidad previsional (AFP).
- **`EVT-USER-007`**: Se solicita un cambio de sistema de salud (Fonasa/Isapre).

### 1.5. Eventos Externos (`EVT-EXT`)
- **`EVT-EXT-001`**: Se recibe una resolución o dictamen de un ente regulador (COMERE/SUSESO).
- **`EVT-EXT-002`**: Se detecta un cambio de estado de una carga familiar en la sincronización con SIVEGAM.
- **`EVT-EXT-003`**: Se recibe un archivo de rechazo del informe financiero SIVEGAM desde SUSESO.

### 1.6. Eventos de Sistema y Pagos (`EVT-SISTEMA`, `EVT-PAG`)
- **`EVT-SISTEMA-001`**: El scheduler inicia el ciclo de pago mensual.
- **`EVT-PAG-001`**: Se recibe una solicitud de reembolso de un empleador del sector público.

---

## 2. Catálogo de Excepciones de Negocio

### 2.1. Excepciones de Proceso (EXP)
*Desviaciones del flujo "feliz" que están contempladas en la normativa y tienen un manejo claro (caminos alternativos).*

- **`EXP-CESE-001`**: Cese por Nuevo Vínculo con Pago de Beneficio Adicional (24 meses de pensión).
- **`EXP-OTG-001`**: Devolución de Indemnización por Reclamo Exitoso que otorga una Pensión.
- **`EXP-MANT-001`**: Suspensión de beneficio por Negativa a Tratamiento.
- **`EXP-PAGO-001`**: Ajuste de Monto a la Pensión Mínima garantizada por ley.
- **`EXP-OTG-002`**: Otorgamiento de Pensión Transitoria por Límite de Subsidio.
- **`EXP-OTG-003`**: No se aplica Pensión Transitoria a Funcionario Público (se detiene el flujo).

### 2.2. Excepciones de Dominio (EXD)
*Inconsistencias o violaciones de reglas fundamentales que requieren resolución experta o gatillan procesos de corrección.*

- **`EXD-VALID-001`**: Prescripción del Derecho a Cobro de Subsidio (han pasado más de 6 meses).
- **`EXD-REVI-001`**: Caducidad de la Acción de Revisión de una prestación.
- **`EXD-DATOS-001`**: Se detecta un dato previsional erróneo que requiere una corrección retroactiva.
- **`EXD-SOBREV-001`**: Caducidad del pago retroactivo en una pensión de sobrevivencia.
- **`EXD-DATOS-002`**: El historial de rentas de un trabajador es insuficiente para calcular un Sueldo Base.
