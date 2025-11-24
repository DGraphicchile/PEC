# Anexo G: Escenarios de Verificación (EV)

*Propósito: Definir cómo se valida y se prueba que la especificación del dominio es correcta y completa. Proporciona los casos de uso concretos y las pruebas lógicas que el sistema debe superar para ser considerado conforme.*

---

## 1. Metodología de Verificación y Complejidad (ICEV)
*Un marco para clasificar la complejidad de un escenario de prueba.*

- **Complejidad de Datos (DT):** Mide la dificultad para obtener y procesar los datos necesarios.
- **Complejidad de Entidades (DE):** Evalúa el número y la interdependencia de las entidades del dominio.
- **Complejidad Normativa (DN):** Mide la cantidad y dificultad de las reglas de negocio.
- **Complejidad de Decisión (DJ):** Evalúa si el proceso requiere juicio experto o validación humana.

---

## 2. Catálogo de Escenarios de Verificación

*La siguiente lista de escenarios de verificación está organizada según el ciclo de vida del beneficio, priorizando una lectura lógica para el negocio. Cada identificador sigue la nomenclatura `CATEGORÍA-TIPO-CORRELATIVO`.*

### 2.1. Otorgamiento y Constitución del Beneficio (OTG)

- **`OTG-EVP-001`**: (Camino Feliz Principal) Otorgamiento de Pensión a Trabajador Dependiente.
- **`OTG-EVP-002`**: (Segundo Camino Feliz) Otorgamiento de Pensión de Sobrevivencia con Múltiples Beneficiarios.
- **`OTG-EVP-003`**: (Variación 1) Otorgamiento de Pensión a Trabajador Independiente con Cotizaciones al Día.
- **`OTG-EVP-004`**: (Variación 2) Otorgamiento con Múltiples Empleadores.
- **`OTG-EVP-005`**: (Excepción en el Flujo) Otorgamiento con Pago Retenido por Deuda de Cotizaciones.
- **`OTG-EVP-006`**: (Caso Especial) Otorgamiento de Pensión de Invalidez a Funcionario Público y notificación de cese.
- **`OTG-EVL-001`**: (Lógica de Soporte) Lógica de Cálculo de SBM para Independientes (sin amplificación).
- **`OTG-EVL-002`**: (Lógica de Soporte) Lógica de No Aplicación de Pensión Transitoria a Funcionario Público.

### 2.2. Mantenimiento y Eventos de Vida (MANT)

- **`MANT-EVP-001`**: (Proceso) Reevaluación de Pensión por Nuevo Siniestro con Aumento de Beneficio.
- **`MANT-EVL-001`**: (Lógica Clave) Lógica de Cálculo Diferencial entre Revisión (mismo SBM) y Reevaluación (nuevo SBM).
- **`MANT-EVL-002`**: (Lógica de Protección) Aplicación de Piso Mínimo en Reevaluación de Pensión (evita disminución de beneficio).
- **`MANT-EVL-003`**: (Lógica de Protección) Aplicación de Piso Mínimo en Reevaluación con Resultado Desfavorable.
- **`MANT-EVC-001`**: (Gestión de Beneficiarios) Mantenimiento de Pensión de Orfandad por Acreditación de Estudios a tiempo.
- **`MANT-EVP-002`**: (Gestión de Beneficiarios) Regularización de Pensión de Sobrevivencia por Cese de un Hijo (Acrecimiento).
- **`MANT-EVP-003`**: (Gestión de Beneficiarios) Regularización de Pensión de Sobrevivencia (Prorrata).
- **`MANT-EVP-004`**: (Tareas Administrativas) Gestión de Apoderado con Pago en el Extranjero.
- **`MANT-EVD-001`**: (Tareas Administrativas) Gestión de Pensión Laboral con Pensión de Invalidez Común Preexistente (notificación a AFP).

### 2.3. Pagos y Operación Financiera (PAGO)

- **`PAGO-EVP-001`**: (Proceso Macro) Ejecución Completa del Ciclo de Pago Mensual.
- **`PAGO-EVP-002`**: (Proceso Macro) Aplicación Masiva de Reajuste por IPC.
- **`PAGO-EVP-003`**: (Proceso Macro) Orquestación y Pago de Aguinaldo/Bono Masivo.
- **`PAGO-EVP-004`**: (Proceso Macro) Resiliencia del Ciclo de Pago ante Fallos Individuales.
- **`PAGO-EVL-001`**: (Validación de Salidas) Cuadratura de Totales en Nómina Bancaria.
- **`PAGO-EVL-002`**: (Validación de Salidas) Cuadratura de Totales en Archivo de Cotizaciones PREVIRED.
- **`PAGO-EVP-005`**: (Validación de Salidas) Generación de Archivo Contable Post-Pago para SAP.
- **`PAGO-EVL-003`**: (Lógica de Mapeo) Lógica de Mapeo de Datos para Nómina Banco de Chile (Pago a Apoderado).
- **`PAGO-EVL-004`**: (Lógica de Mapeo) Lógica de Mapeo para Archivo PREVIRED (distinción entre pago normal y retroactivo).
- **`PAGO-EVD-001`**: (Cálculo Individual) Gestión de Descuento por Crédito Social CCAF en la liquidación.
- **`PAGO-EVC-001`**: (Cálculo Individual) Aplicación de Descuento Manual en Cuotas a lo largo de varias liquidaciones.
- **`PAGO-EVC-002`**: (Cálculo Individual) Retención de Asignación Familiar por activación de un `AcuerdoDePago` de tipo `PagoDirectoAsignacionFamiliar`.
- **`PAGO-EVP-006`**: (Cálculo Individual) Gestión de Reembolso de Subsidio/Pensión a Entidad Pública.
- **`PAGO-EVL-005`**: (Cálculo Individual) Cálculo de Prorrata en Pensión de Sobrevivencia con Múltiples Beneficiarios.
- **`PAGO-EVL-006`**: (Cálculo Individual) Lógica de Cálculo de Prorrata de Concurrencia entre organismos.

### 2.4. Ceses y Suspensiones (CESE)

- **`CESE-EVP-001`**: Cese de Pensión de Viudez por Nuevo Vínculo (con pago final de 2 años).
- **`CESE-EVP-002`**: Suspensión y Reactivación de Pensión de Orfandad por Certificado de Estudios.
- **`CESE-EVL-001`**: Cálculo de Días a Pagar por Cese a Mitad de Mes.
- **`CESE-EVL-002`**: Cálculo de Días Pagados en Exceso por Notificación de Fallecimiento Tardía.

### 2.5. Correcciones y Casos Excepcionales (CORR)

- **`CORR-EVC-001`**: (Reactivo Externo) Ejecución de Dictamen de SUSESO que Ordena Reliquidar una Pensión.
- **`CORR-EVP-001`**: (Reactivo Interno) Proceso de Reversión de Indemnización y Creación de Deuda por Otorgamiento de Pensión.
- **`CORR-EVP-002`**: (Reactivo Interno) Proceso de Devolución de Indemnización por Reclamo Exitoso.
- **`CORR-EVD-001`**: (Validación Preventiva) Intento de Reevaluación sobre una Gran Invalidez (debe ser rechazado por regla `VALID-MANT-002`).
- **`CORR-EVD-002`**: (Validación Preventiva) Verificación de Vigencia de Mandato para Cobro (límite de 2 años).

### 2.6. Reliquidaciones y Cambios de Marco (RELQ)

- **`RELQ-EVP-001`**: Reliquidación con corte de marco en 2022-09 (PGU inicial → TC 2022)
  - Entradas: Periodo a reliquidar 2022-07 a 2022-10; prestación activa continua.
  - Marco esperado:
    - 2022-07..2022-08 → `MN-2022-PGU` (`params-v6.0.0`, `logic-v2.0.0`).
    - 2022-09..2022-10 → `MN-2022-PGU-SEP` (`params-v6.0.0`, `logic-v6.0.0`).
  - Verificación: Líneas de liquidación y totales difieren entre tramos según directiva; evidencia de `MarcoNormativo` por mes.

- **`RELQ-EVP-002`**: Reliquidación PGU (reemplazo APS→PGU)
  - Entradas: Caso con APS vigente a 2022-01; reliquidar 2022-02..2022-12.
  - Verificación: Haber PGU aparece desde 2022-02; APS deja de aplicarse; totales ajustados y trazabilidad al marco.

- **`RELQ-EVL-001`**: Elegibilidad TC 2022 en sobrevivencia (madre de hijos divorciada)
  - Entradas: Inicio de derecho 2022-10-05.
  - Verificación: No elegible antes de 2022-09; elegible desde `MN-2022-PGU-SEP` con `PDN-OTG-006 v4`.

- **`RELQ-EVP-003`**: Cese por nuevo vínculo (AUC) en mes de corte
  - Entradas: AUC el 2022-09-10.
  - Verificación: Aplica `PDN-MANT-010 v2` desde `MN-2022-PGU-SEP`; prorrateo del mes conforme reglas de días (`CALC-PLI-009/010`).

- **`RELQ-EVP-004`**: Reliquidación post reforma 2025
  - Entradas: Reliquidar 2024-12..2025-02.
  - Verificación: 2025-01..02 ejecuta `MN-2025-REFORMA-LEY` (marco activo más reciente); diferencias respecto a 2024-12 justificadas por directiva.

- **`RELQ-EVL-002`**: Borde de mes e inactivación a mitad de período en cambio de marco
  - Entradas: Inactivación el día 15 en mes de corte de marco.
  - Verificación: Prorrateo por tramo de marco y días; sin solapes de vigencia.

- **`RELQ-EVE-001`**: Vacíos o solapes de vigencia (política)
  - Entradas: Fecha sin marco o con dos marcos.
  - Verificación: Error controlado del resolver; sin fallback implícito; evidencia registrada.

- **`RELQ-EVL-003`**: Idempotencia de reliquidación
  - Entradas: Ejecución repetida de la misma reliquidación.
  - Verificación: Mismo resultado/hash; referencia al mismo `MarcoNormativo`.