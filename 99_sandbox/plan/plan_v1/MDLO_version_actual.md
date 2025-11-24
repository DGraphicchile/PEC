# MDLO – Estado Actual (Cobertura iSeries)

Documento que mapea la cobertura funcional del sistema actual iSeries usando la taxonomía MDLO. Se incluyen únicamente capacidades confirmadas como cubiertas por iSeries según `especificacion_iSeries_cursor.md` (reunión 2025-08-08). Todo lo no mencionado como cubierto queda fuera de este documento por definición.

---

## 1. Propósito y fuentes
- **Propósito**: expresar, en términos de MDLO, qué partes del dominio están efectivamente soportadas por iSeries hoy.
- **Fuentes**: `version_actual/MDLO_v1/*` (conceptos y taxonomía) y `especificacion_iSeries_cursor.md` (estado actual iSeries).

---

## 2. Entidades de dominio efectivamente utilizadas por iSeries
- **`PrestacionEconomica`**: presente para pensiones por incapacidad y de sobrevivencia; soporta activación, suspensión y cese.
- **`LiquidacionDePago`**: comprobante mensual con haberes/descuentos y totales.
- **`ConceptoLiquidacion`**: líneas de haber/descuento (ej. salud, previsión, asignación familiar, retenciones judiciales).
- **`CausanteAsignacionFamiliar`**: altas, modificaciones, extinciones y validación periódica de vigencia.
- **`AcuerdoDePago`**, con **`MetodoDePago`** y **`ConfiguracionDescuento`**: apoderados/curadores, pagos a terceros, retenciones judiciales.
- **`Trabajador` / `FichaPersona`**: base operativa para cálculo, liquidación y pago.

Nota: Entidades como `ComprobanteContable`, `Deuda`, `CapitalRepresentativo` u otras avanzadas no se incluyen aquí al no estar explícitamente confirmadas como cubiertas dentro de iSeries en la fuente indicada.

---

## 3. Procesos de Negocio (PDN) cubiertos por iSeries

### 3.1 Otorgamiento (OTG)
- **`PDN-OTG-002: Otorgamiento y Activación de Prestación`**: ingreso con visto bueno legal, cálculo de montos (incluye retroactivos) y activación.
- **`PDN-OTG-006: Otorgamiento de Prestaciones de Sobrevivencia`**: cálculo y activación para beneficiarios de causante fallecido.

### 3.2 Mantenimiento del Ciclo de Vida (MANT)
- **`PDN-MANT-001: Cese por Edad de Vejez`**: inactivación por cumplimiento de edad (automatizada en cierre mensual).
- **`PDN-MANT-002: Suspender Orfandad por Falta de Acreditación`**: validación de certificados de estudio y suspensión/rehabilitación según corresponda.
- **`PDN-MANT-003: Reactivar Orfandad por Acreditación`**: reactivación con pago retroactivo cuando aplica.
- **`PDN-MANT-008: Exportación de Pensión`**: pagos a beneficiarios en el extranjero y nóminas especiales.
- **`PDN-MANT-009: Gestionar Acuerdo de Pago`**: cobrantes (apoderados/interdicción), retenciones judiciales y cuentas bancarias.
- **`PDN-MANT-012: Regularización de Sobrevivencia (Art. 50)`**: límite 100% del pago total y ajustes proporcionales entre beneficiarios.
- **`PDN-MANT-015: Cambio de Sistema de Salud`**: actualización para correcto descuento de salud.
- **`PDN-MANT-016: Ajustes Manuales de Liquidación`**: pagos extraordinarios/no formulables y correcciones específicas.

### 3.3 Pagos (PAG)
- **`PDN-PAG-001: Ciclo de Pago Mensual`**: preliquidación, validación y ejecución del ciclo mensual.
- **`PDN-PAG-002: Cálculo de Pensión Imponible Mensual`**.
- **`PDN-PAG-003: Cálculo de Pensión Líquida Mensual`**.
- **`PDN-PAG-007: Aplicación de Acuerdos en Liquidación`**: apoderados, retenciones, descuentos de convenios aplicables.
- **`PDN-PAG-008: Generación de Nómina de Pago a Banco`**: archivo plano Banco de Chile y pagos a terceros.
- **`PDN-PAG-010: Generar Comprobante/Archivo de Contabilización`**: integración contable vía archivo a SAP.

### 3.4 Gestión Financiera (FIN)
- **`PDN-FIN-004: Compensación Trimestral de Concurrencias`**: generación de archivos de conciliación de porcentajes y montos entre organismos; cálculo/prorrata operado con plataforma externa.

### 3.5 Reportería (REP) y Monitoreo (MON)
- **Reporte GRIS a SUSESO**: generación/envío del reporte GRIS de pensiones vigentes.
- **`PDN-MON-005/006: Nómina y Respuesta Registro Civil`**: consultas masivas a Registro Civil y procesamiento de respuesta para inactivaciones o gestión de excepciones.

---

## 4. Reglas de Negocio (RDN) operativas en iSeries
- **Cálculo**:
  - `CALC-PLI-001/002`: descuentos legales de salud y previsión.
  - `CALC-PLI-003`: asignación familiar según causantes vigentes y tramos.
  - `CALC-MANT-001`: reajustes por variación de IPC (aplicación masiva en cierre).
  - `CALC-PLI-007/011`: retenciones judiciales y aplicación de ajustes manuales.
  - `CALC-PLI-009/010`: días exactos a pagar por inactivación en el mes en curso y cálculo de pagos/excesos por inactivaciones informadas de forma retroactiva.
- **Ciclo de vida**:
  - `CICLO-CESE-001`: cese por edad legal (automatizado en cierre).
  - `CICLO-INAC-001/002` (análogo): suspensión por falta de estudios, fallecimiento (vía Registro Civil).
- **Validaciones**:
  - Vigencias y documentación en `Asignación Familiar` (altas/modificaciones/extinciones con evidencia).
  - Validación mensual con foco en viudez < 45 años para mantener/ajustar vigencia y porcentaje.
  - Restricción operativa de cambios entre el 1 y 8 de cada mes (deferidos posteriores al cierre).

Nota: Solo se listan reglas cuya existencia/efecto se desprende explícitamente de la especificación iSeries. Otras reglas MDLO no se incluyen aquí por no estar confirmadas como soportadas por iSeries.

---

## 5. Interfaces Externas efectivas
- **`INT-BCH-001: Nómina de Pagos (Banco de Chile)`**: archivo plano mensual.
- **`INT-SAP-001: Contabilización`**: envío de movimientos a SAP por archivo.
- **`INT-REGCIVIL-001: Verificación masiva`**: envíos/recepciones mensuales por archivo para supervivencia y estado civil.
- **`IR-SUSESO (GRIS)`**: reporte regulatorio indicado como cubierto.

Nota: Coordinación con programa PIES para duplicidad de cargas se realiza por procesos manuales apoyados por reportes; no se declara integración automática.

---

## 6. Automatizaciones y cierres operativos
- Automatizaciones al cierre mensual:
  - Inactivación por edad legal.
  - Validación de certificados de estudio.
  - Actualización por cambios de estado civil (derivados de Registro Civil).
  - Generación de reportes (IPS, Tesorería, SUSESO) y PDFs de auditoría.
- Restricción de modificaciones en `Asignación Familiar` hasta el cierre; cambios posteriores se difieren al mes siguiente.

---

## 7. Excepciones y operación manual gobernada
- Reactivaciones o modificaciones por dictamen especial (casos extraordinarios) con trazabilidad.
- Ingreso/renovación de cobrantes por mandato vencido; retención judicial y pagos a terceros.
- Pagos extraordinarios/no formulables para correcciones no previstas.
- Posibilidad controlada de avanzar bajo excepción formal con regularización posterior.

---

## 8. Beneficiarios y límites legales
- Elegibilidad para pensiones de sobrevivencia (aplicación práctica en otorgamiento y mantenimiento).
- **Artículo 50**: tope 100% del pago total y ajuste proporcional entre beneficiarios.
- Aplicación de pagos mínimos según rango etario cuando corresponde.

---

## 9. Documentación y trazabilidad
- Generación de PDFs uniformes para auditoría por cada automatización/proceso relevante.
- Resguardo y disponibilidad de credenciales y accesos (incl. FTP) para analistas responsables.

---

Autor: Equipo de Análisis de Dominio ACHS  
Fecha: 2025-08-09  
Alcance: Cobertura confirmada de iSeries expresada en MDLO (MDLO_v1)


