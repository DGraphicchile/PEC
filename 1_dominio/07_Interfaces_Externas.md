# Anexo E: Interfaces Externas

*Propósito: Centralizar y definir formalmente todas las interacciones de datos con sistemas y entidades externas. Este catálogo actúa como un puente entre los procesos de negocio lógicos y las especificaciones técnicas de implementación.*

---

### `INT-IPS-001`: Beneficios Estatales IPS
- **Entidad Externa:** Instituto de Previsión Social (IPS)
- **Propósito de Negocio:** Recibir la nómina de beneficiarios con derecho a beneficios estatales como la Pensión Garantizada Universal (PGU), Exención y Rebaja de la cotización de salud.
- **Mecanismo de Intercambio:** SFTP / Manual
- **Referencia a Especificación Técnica:** `CPS-PME-CAR-003`, `CPS-LIQ-PLI-002`, `CPS-LIQ-PLI-003`
- **Artefactos de Datos:** `aIII_tapsAAAAMM.rutcsv` (PGU), `papsoeaaaamm.rutcsv` (Exención), `brsaludaaaamm.rutcsv` (Rebaja).
- **Informe Regulatorio Asociado:** Ver `Anexo I`, informes `IR-IPS-002`.

---

### `INT-IPS-002`: Consulta de Responsabilidad de Pago de Bonos
- **Entidad Externa:** Instituto de Previsión Social (IPS)
- **Propósito de Negocio:** Consultar qué institución es la responsable de pagar beneficios como el Aguinaldo y el Bono de Invierno, basado en quién paga la pensión de mayor monto.
- **Mecanismo de Intercambio:** Envío manual de archivo de consulta, recepción de respuesta.
- **Referencia a Especificación Técnica:** `CPS-PME-GEN-002`, `CPS-PME-CAR-005`
- **Artefactos de Datos:** `psobraaaamm.rut` (Salida), `cindob...` (Entrada).

---

### `INT-SIVEGAM-001`: Reportería de Asignación Familiar
- **Entidad Externa:** SIVEGAM (SUSESO)
- **Propósito de Negocio:** Informar mensualmente los pagos, reintegros y cambios de estado de la Asignación Familiar.
- **Mecanismo de Intercambio:** SFTP
- **Referencia a Especificación Técnica:** `CPS-CIR-EXS-001`
- **Artefactos de Datos:** Archivos de texto plano (01 a 05) con separador PIPE.
- **Informe Regulatorio Asociado:** Ver `Anexo I`, la reportería a SIVEGAM se compone de los informes de otorgamiento, modificación y cese a SUSESO (ver `IR-SUSESO-001`, `IR-SUSESO-002`, `IR-SUSESO-003`).

---

### `INT-REGCIVIL-001`: Verificación de Supervivencia y Estado Civil
- **Entidad Externa:** Servicio de Registro Civil e Identificación
- **Propósito de Negocio:** Validar periódicamente la supervivencia y el estado civil de los beneficiarios para gatillar ceses de prestaciones (ej. por fallecimiento o nuevo vínculo).
- **Mecanismo de Intercambio:** SFTP
- **Referencia a Especificación Técnica:** `CPS-PME-CAR-002`, `CPS-PME-GEN-001`
- **Artefactos de Datos:** `ACHS_AAAAMM.txt` (Salida), `ACHS_AAAAMM_out.txt` (Entrada).

---

### `INT-BCH-001`: Nómina de Pagos
- **Entidad Externa:** Banco de Chile
- **Propósito de Negocio:** Transmitir la nómina de pagos mensual para su abono en las cuentas de los beneficiarios o para la emisión de vales vista.
- **Mecanismo de Intercambio:** SFTP
- **Referencia a Especificación Técnica:** `CPS-LIQ-LIQ-002`
- **Artefactos de Datos:** Archivo de texto plano con la nómina de pagos.

---

### `INT-PREVIRED-001`: Pago de Cotizaciones Previsionales
- **Entidad Externa:** PREVIRED
- **Propósito de Negocio:** Declarar y pagar las cotizaciones previsionales (AFP, Salud) retenidas a los pensionados en un formato centralizado.
- **Mecanismo de Intercambio:** SFTP o carga manual en portal.
- **Referencia a Especificación Técnica:** `CPS-CIR-PAG-002`
- **Artefactos de Datos:** Archivo de texto plano con el detalle de cotizaciones.

---

### `INT-SAP-001`: Contabilización
- **Entidad Externa:** Sistema de Contabilidad SAP (Interno)
- **Propósito de Negocio:** Informar los movimientos financieros generados por el pago de prestaciones para su correcta contabilización.
- **Mecanismo de Intercambio:** SFTP
- **Referencia a Especificación Técnica:** `CPS-CIR-DIN-003`
- **Artefactos de Datos:** Archivo de texto delimitado con el resumen de cargos por cuenta contable.

---

### `INT-FONASA-001`: Descuentos por Préstamos Médicos
- **Entidad Externa:** FONASA
- **Propósito de Negocio:** Recibir la nómina de descuentos por préstamos médicos para aplicarlos en las liquidaciones de los pensionados.
- **Mecanismo de Intercambio:** Recepción de archivo plano vía correo electrónico o SFTP.
- **Referencia a Especificación Técnica:** `CPS-PME-CAR-004`
- **Artefactos de Datos:** Archivo de texto plano `PSFf...`.

---

### `INT-CCAF-001`: Descuentos por Créditos Sociales
- **Entidad Externa:** Cajas de Compensación de Asignación Familiar (CCAF)
- **Propósito de Negocio:** Recibir información sobre créditos sociales y otros descuentos para aplicar a los pensionados afiliados.
- **Mecanismo de Intercambio:** SFTP
- **Referencia a Especificación Técnica:** `CPS-LIQ-PLI-012`
- **Artefactos de Datos:** Archivos de texto plano (layouts varían por CCAF).
