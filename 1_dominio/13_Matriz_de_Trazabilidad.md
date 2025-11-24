# Anexo K: Matriz de Trazabilidad (PDN-RDN)

*Propósito: Proveer una visión clara y explícita de las dependencias entre los Procesos de Negocio (PDN) y las Reglas de Negocio (RDN). Esta matriz es una herramienta fundamental para el análisis de impacto, la planificación de pruebas y la comprensión de la arquitectura lógica del sistema.*

---

## 1. Metodología de Lectura

-   **Filas:** Representan la totalidad de los Procesos de Negocio (PDN) definidos en el `Anexo C`.
-   **Columnas:** Representan las Reglas de Negocio (RDN) atómicas definidas en el `Anexo D`.
-   **Marca (X):** Una `X` en la intersección de una fila y una columna indica que el proceso de esa fila **utiliza, invoca o depende directamente** de la regla de esa columna para su correcta ejecución.

Para mejorar la legibilidad, la matriz general se ha dividido en tablas más pequeñas, agrupadas por la categoría de las reglas de negocio.

---

## 2. Tabla 1: Trazabilidad con Reglas de Validación (VALID)

| Proceso de Negocio (PDN) | `VALID-OTG-001` | `VALID-OTG-002` | `VALID-SOBREV-001` | `VALID-ACUERDO-001` | `VALID-ACUERDO-002` | `VALID-ACUERDO-003` | `VALID-MANT-001` | `VALID-MANT-002` | `VALID-PAGO-001` | `VALID-PAGO-002` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Otorgamiento (OTG)** | | | | | | | | | | |
| `PDN-OTG-001` | X | | | | | | | | | |
| `PDN-OTG-002` | | | | | | | | | | |
| `PDN-OTG-003` | X | | X | | | | | | | |
| `PDN-OTG-004` | | X | | | | | | | | |
| `PDN-OTG-005` | | | | | | | | | | |
| `PDN-OTG-006` | | | X | | | | | | | |
| **Mantenimiento (MANT)** | | | | | | | | | | |
| `PDN-MANT-002` | | | | | | | X | | | |
| `PDN-MANT-003` | | | | | | | X | | | |
| `PDN-MANT-004` | | | | | | | | X | | |
| `PDN-MANT-005` | | | | | | | | X | | |
| `PDN-MANT-009` | | | | X | X | X | | | | |
| **Corrección (COR)** | | | | | | | | | | |
| `PDN-COR-002` | X | X | X | X | X | X | X | X | | |
| **Pagos (PAG)** | | | | | | | | | | |
| `PDN-PAG-005` | | | | | | | | | X | X |
| `PDN-PAG-007` | | | | X | X | X | | | | |

---

## 3. Tabla 2: Trazabilidad con Reglas de Cálculo (CALC)

### 3.1. Cálculo de Otorgamiento, Mantenimiento y Finanzas

| Proceso de Negocio (PDN) | `CALC-OTG-001` | `CALC-OTG-002` | `CALC-MANT-001` | `CALC-MANT-002` | `CALC-MANT-003` | `CALC-FIN-001` | `CALC-REP-001` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Otorgamiento (OTG)** | | | | | | | |
| `PDN-OTG-001` | X | | | | | | |
| `PDN-OTG-006` | | X | | | | | |
| `PDN-OTG-002` | X | X | | | | | |
| **Mantenimiento (MANT)** | | | | | | | |
| `PDN-MANT-004` | | | | X | | | |
| `PDN-MANT-005` | | | | X | | | |
| `PDN-MANT-012` | | | | | X | | |
| **Pagos (PAG)** | | | | | | | |
| `PDN-PAG-004` | | | X | | | | |
| **Gestión Financiera (FIN)** | | | | | | | |
| `PDN-FIN-001` | | | | | | X | |
| `PDN-FIN-004` | | | | | | X | |
| **Reportería (REP)** | | | | | | | |
| `PDN-REP-004` | | | | | | | X |
Notas adicionales:

- `CALC-OTG-003` se invoca desde `PDN-OTG-002` para determinar el monto final de otorgamiento.
- `CALC-OTG-004` se invoca en `PDN-OTG-006`/`PDN-PAG-*` cuando corresponda al bono por matrimonio.
| **Monitoreo (MON)** | | | | | | | |
| `PDN-MON-002` | | | X | | | | |

### 3.2. Cálculo de Liquidación de Pago (PIM & PLI)

| Proceso de Negocio (PDN) | `CALC-PIM-*` | `CALC-PLI-001` | `CALC-PLI-002` | `CALC-PLI-003` | `CALC-PLI-004` | `CALC-PLI-005` | `CALC-PLI-006` | `CALC-PLI-007` | `CALC-PLI-008` | `CALC-PLI-009` | `CALC-PLI-010` | `CALC-PLI-011` | `CALC-PLI-013` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Mantenimiento (MANT)** | | | | | | | | | | | | | |
| `PDN-MANT-001` | | | | | | | | | | X | X | | |
| `PDN-MANT-002` | | | | | | | | | | X | X | | |
| `PDN-MANT-006` | | | | | | | | | | X | X | | |
| `PDN-MANT-010` | | | | | | | | | | X | X | | |
| `PDN-MANT-016` | | | | | | | | | | | | X | |
| **Corrección (COR)** | | | | | | | | | | | | | |
| `PDN-COR-001` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `PDN-COR-002` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `PDN-COR-003` | | | | | | | | | | | X | | |
| **Pagos (PAG)** | | | | | | | | | | | | | |
| `PDN-PAG-001` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `PDN-PAG-002` | X | | | | | | | | | | | | |
| `PDN-PAG-003` | | X | X | X | X | X | X | X | X | X | X | X | X |
| `PDN-PAG-007` | | | | | | | | X | X | | | | |
| **Monitoreo (MON)** | | | | | | | | | | | | | |
| `PDN-MON-006` | | | | | | | | | | X | X | | |

---

## 4. Tabla 3: Trazabilidad con Reglas de Cumplimiento, Mapeo y Gobernanza

| Proceso de Negocio (PDN) | `CUMP-OTG-*` | `CUMP-MANT-001` | `CUMP-ASIGFAM-001` | `CUMP-PAG-001` | `MAP-REP-001` | `VERF-GOB-001` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Otorgamiento (OTG)** | | | | | | |
| `PDN-OTG-002` | X | | | | | |
| `PDN-OTG-006` | X | | | | | |
| **Mantenimiento (MANT)** | | | | | | |
| `PDN-MANT-017` | | | | | | X |
| **Pagos (PAG)** | | | | | | |
| `PDN-PAG-006` | | | | X | | |
| **Gestión Financiera (FIN)** | | | | | | |
| `PDN-FIN-003` | X | | | | | |
| **Reportería (REP)** | | | | | | |
| `PDN-REP-004` | | | | | X | |
| **Monitoreo (MON)** | | | | | | |
| `PDN-MON-001` | X | | | | | |
| `PDN-MON-003` | X | | | | | |
| **Gobernanza (GOB)** | | | | | | |
| `PDN-GOB-001` | | | | | | X |
