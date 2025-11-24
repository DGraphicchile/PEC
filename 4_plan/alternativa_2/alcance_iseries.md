### Alcance del sistema iSeries (según transcripción 2025-08-08)

**Propósito**: sintetizar el alcance funcional y operativo de iSeries descrito en la reunión, alineándolo al lenguaje y artefactos del proyecto (PDN, EDN, RDN, eventos, interfaces) y a la estructura arc42 de documentación [[memoria:5838375]]. Incluye supuestos y preguntas abiertas para clarificación.

---

### Resumen ejecutivo

- **iSeries** opera como: (a) calculadora de pensiones iniciales y mantenedor de datos de pensiones y asignación familiar; (b) motor de automatizaciones mensuales ("regulariza") para activar/inactivar/reactivar; (c) generador de preliquidación y archivos de pago/contables/regulatorios.
- Gran parte de la **gestión documental y validaciones previas** es manual y fuera del sistema (SharePoint/planillas/correos). iSeries consume “fotos” o archivos externos para ejecutar procesos.
- Hay procesos y cálculos que están **fuera del alcance directo** de iSeries (p. ej., cálculo de concurrencia prorrata en plataforma externa, actualización SUSESO-PIES), aunque iSeries almacena porcentajes y emite reportes para conciliación.

---

### 1_dominio/ — Alcance funcional por PDN (Procesos de Negocio)

#### PDN-OTG (Constitución/Otorgamiento)
- **Alcance en iSeries**: calculadora del monto mensual y retroactivo a partir de antecedentes ingresados (6 liquidaciones previas, datos personales, AFP, etc.). Tras cálculo exitoso, el caso se enlaza a Control de Pensiones para pago mensual.
- **Fuera de iSeries**: recopilación documental, memo de calificación médica, validación de Fiscalía (aprobación de derecho), liberación a pago inicial (vale vista), finiquito y firma del beneficiario.
- **EDN sugeridas**:
  - EDN-OTG-001-1: Recepción de antecedentes mínimos (post-aprobación Fiscalía).
  - EDN-OTG-001-2: Cálculo pensión inicial y retroactivo.
  - EDN-OTG-001-3: Generación de finiquito (detalle de cálculo) y pase a pago único retroactivo (fuera del motor mensual).
  - EDN-OTG-001-4: Enlace de prestación a ciclo mensual.
- **RDN relevantes (ejemplos)**: VALID-OTG-001 (suficiencia de datos), CALC-OTG-001 (sueldo base), CALC-MONTO-PENSION (monto mensual), REGLA-RETROACTIVO-INICIAL.

#### PDN-MANT (Mantenimientos, incl. Asignación Familiar)
- **Alcance en iSeries**: mantenedor de cargas familiares (ingreso/actualización/extinción), **categorización por tramos** (en base a declaraciones juradas y 630), foto/cierre de asignación familiar y preparación de pago.
- **Integración manual con SUSESO-PIES**: la actualización en la base nacional de cargas no está automatizada; iSeries emite reportes para que el analista actualice manualmente.
- **Fechas de cierre**: “cierre” operativo variable (p. ej., día 8; se adelanta en meses con aguinaldo), tras el cual se congela la base para pago del mes.
- **EDN sugeridas**:
  - EDN-MANT-007-1: Validación documental/certificados (manual).
  - EDN-MANT-007-2: Ingreso/actualización de carga y tramo AF en iSeries.
  - EDN-MANT-007-3: Cierre de AF (foto del mes) y bloqueo de cambios para el periodo.
- **RDN relevantes (ejemplos)**: CUMP-ASIGFAM-001 (requisitos por tipo de causante), CALC-TRAMO-AF, VALID-CERT-ESTUDIOS.

#### PDN-PAG (Control de Pensiones — ciclo mensual)
- **Alcance en iSeries**: automatizaciones “regulariza”, cálculo de liquidaciones (días/haberes/descuentos), preliquidación, generación de archivos a banco, PREVIRED, contabilidad (SAP), reportes regulatorios (GRIS SUSESO) y pagos a terceros (extranjeros vía Tesorería/Western Union).
- **Regulariza (backend, automático)**: inactivaciones/reactivaciones por reglas de edad, estado civil, estudios, fallecimiento, pensión mínima, conversión a vitalicia al cumplir condiciones (viudez con hijos), etc. Genera PDFs/logs por cada subproceso.
- **Cálculo**: prorrata por días (cese o cumplimiento de edad), haberes (PGU, bonos), descuentos (salud, previsión, préstamos Fonasa, CCAF), retroactivos imponibles y líquidos, reajuste por IPC (anual o al superar 10% acumulado), tope Art. 50 (no exceder 100% suma de beneficiarios).
- **EDN principales (ejemplo)**:
  - EDN-PAG-003-1: Cargar insumos externos (Registro Civil, IPS/PGU, Fonasa, CCAF, etc.).
  - EDN-PAG-003-2: Regulariza (activar/inactivar/categorizar según reglas).
  - EDN-PAG-003-3: Calcular liquidaciones y retroactivos; aplicar prorratas y topes.
  - EDN-PAG-003-4: Preliquidación y revisión.
  - EDN-PAG-003-5: Generar archivos de salida (banco, PREVIRED, SAP, GRIS, terceros) y evidencias.
- **RDN relevantes (ejemplos)**: CUMP-EDAD-65/60 (cese invalidez por edad), CUMP-EDAD-24 (orfandad), CUMP-NUPCIAS (viudez), CALC-DIAS-MES, CALC-PRORRATA-CONCURRENCIA, CALC-PGU, CALC-AGUINALDO, CALC-REAJUSTE-IPC, TOP-ART-50.

#### PDN-FIN (Concurrencia/prorrata entre pagadores)
- **Fuera de iSeries**: cálculo de concurrencias (porcentajes por Mutual/IPS/ACHs) lo realiza una plataforma externa.
- **En iSeries**: carga/almacenamiento de porcentajes por pensión y generación trimestral del **Detalle de Cobro de Concurrencia** para conciliación y recuperación de fondos.

#### PDN-REP (Reportes obligatorios)
- **En iSeries**: generación de GRIS SUSESO (estándar común), capitales vigentes, reportes de conciliación y contabilización PRP para SAP.

---

### 2_arquitectura/ — Límites, bloques y eventos

- **Dentro del sistema (alcance iSeries)**:
  - Calculadoras (pensiones, prorratas, haberes/descuentos), mantenedores (pensiones, cargas, cobrantes/retenciones), motor de automatizaciones (regulariza), generadores de archivos (banco, PREVIRED, SAP, GRIS) y evidencias PDF.
  - Control de “cierre” por periodo: una vez cerrado, cambios quedan para el mes siguiente.
- **Fuera del sistema**:
  - Gestión documental y aprobaciones (Fiscalía, finiquitos), actualizaciones en SUSESO-PIES, cálculo de concurrencia, y algunos pagos a terceros operados por Tesorería.
- **Eventos de negocio recomendados (para el sistema objetivo)**:
  - `pension:otorgada`, `pension:inactivada`, `pension:reactivada`, `carga:ingresada/actualizada/extinguida`, `estado_civil:cambiado`, `fallecimiento:detectado`, `pgu:aplicada`, `preliquidacion:generada`, `archivo_banco:generado`, `archivo_previred:generado`, `reporte_gris:generado`, `detalle_concurrencia:generado`.
  - Publicación confiable vía outbox e idempotencia; correlación con `marcoNormativoId` y periodo.
- **Decisiones operativas clave**:
  - Idempotencia/re-ejecución de lotes (preliquidación puede reevaluarse); bloqueos tras cierre; auditoría por PDF/logs.
  - Reglas con “excepciones por dictamen” requieren bypass controlado y trazable (gobernanza de excepciones).

---

### 3_especificacion_tecnica/ — Interfaces y flujo de datos

#### Entradas (carga/consulta)
- **Registro Civil**: consulta masiva vía archivo plano (contrato predefinido). Devuelve datos básicos y flags (fallecimiento, estado civil: S/C/U). Frecuencia: mensual (o según operación).
- **IPS/PGU**: archivo(s) para determinar PGU, aguinaldos (Navidad/Fiestas Patrias) y bono invierno. Se cargan a tablas temporales y se aplican en cálculo.
- **Fonasa/CCAF**: archivos para préstamos/créditos y descuentos asociados.
- **Suceso/PIES (cargas familiares)**: no integrado; iSeries emite reportes de cambios para actualización manual.

#### Salidas
- **Banco de Chile**: archivo de pago. Estructura indicada: al menos 3 líneas por pensionado (resumen, haberes, descuentos).
- **PREVIRED**: archivo de cotizaciones previsionales.
- **SAP (contabilización PRP)**: comprobante contable en formato plano, cargado por contabilidad.
- **GRIS SUSESO**: reporte regulatorio con ~50 campos estándar.
- **Pagos a terceros (extranjero)**: archivo a Tesorería/Western Union para pagos en el exterior.
- **Detalle de Cobro de Concurrencia**: archivo trimestral para conciliación con otras mutualidades/IPS.

#### Operación y ventanas
- “Cierre” operativo (AF y pagos) con fecha variable por mes (p. ej., día 5–8; se adelanta en meses con aguinaldo). Cambios post-cierre quedan para el siguiente periodo.
- `Regulariza` se ejecuta por horas y emite PDFs de auditoría por subproceso.

---

### Supuestos y elementos no concluyentes

- Nombres exactos y contratos de archivos (campos, separadores, codificación). En particular, si los CSV usan **coma como separador decimal** en ciertos feeds.
- Identidad exacta del sistema SUSESO (mencionado como “Programa PIES”) y especificación de sus web services.
- Detalle de protocolos y endpoints (SFTP/HTTPS) y credenciales operativas por integración (hoy gestionadas por analistas).
- Reglas precisas para topes, redondeos y secuencia de aplicación de haberes/descuentos (p. ej., PGU vs. mínimos, Art. 50).
- Calendario formal de cierres por mes, ventanas de preliquidación y SLA de re-ejecución.
- Criterios y flujo de aprobación para **excepciones por dictamen** (bypass manual) y su auditoría.
- Especificación de concurrencia: calendario de corte trimestral, formato de archivo y llaves para conciliación.

---

### Preguntas para el negocio (clarificación)

1. ¿Cuál es el contrato exacto (layout, separadores, codificación) de los archivos con Registro Civil, IPS/PGU, Fonasa, CCAF, PREVIRED, SAP y Banco? ¿Usan coma como separador decimal cuando aplica?
2. ¿Cuál es la denominación y especificación oficial del sistema SUSESO para cargas (PIES u otro)? ¿Existen web services habilitados para automatizar altas/bajas/actualizaciones?
3. ¿Cuál es el calendario formal de cierres por mes (AF y Pagos) y los criterios para adelantos (aguinaldos/feriados)?
4. ¿Cuál es la política de re-ejecución de `regulariza` y preliquidaciones? ¿Qué condiciones disparan una re-ejecución y cómo se versionan evidencias?
5. Para el tope del **Art. 50**, ¿qué redondeos se aplican y en qué orden respecto de otros haberes (PGU) y descuentos?
6. ¿Cuáles son las claves de idempotencia y llaves de conciliación esperadas por Banco de Chile, PREVIRED, SAP y SUSESO (GRIS)?
7. ¿Cómo es el flujo y las aprobaciones para **excepciones por dictamen** (por ejemplo, viudas a vitalicia fuera de regla)? ¿Qué roles aprueban y qué evidencias se deben custodiar?
8. ¿Cuál es el proceso exacto y el layout del **Detalle de Cobro de Concurrencia** (frecuencia, llaves por pensión, periodo de cálculo)?
9. ¿Qué modalidad exacta se usa para pagos a terceros en el extranjero (Tesorería/Western Union): formato, frecuencia y llaves de trazabilidad?
10. ¿Hay metas operativas (SLA/SLO) de lag de insumos externos, tiempo de cálculo por lote y tiempos de cierre/entrega a bancos y SUSESO?

---

**Notas**: Este documento resume la transcripción y mapea al marco PDN/EDN/RDN del proyecto. Donde la transcripción fue ambigua, se consignaron supuestos y preguntas para cierre con negocio.


