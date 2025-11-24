# Especificación de Interfaz de Usuario (GUI): Panel de Control de Pagos y Liquidaciones

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

Proporcionar a los **Operadores de Pagos** y **Supervisores** una herramienta para consultar, verificar y auditar las liquidaciones de pago generadas por el sistema. Esta interfaz es fundamental para la transparencia financiera y para resolver consultas de los beneficiarios sobre sus pagos.

## 2. Pantalla Principal: `Vista de Búsqueda de Liquidaciones`

- **Rol Principal:** Operador de Pagos, Supervisor.
- **Propósito:** Ser el punto de entrada para encontrar liquidaciones específicas.
- **Componentes Clave:**
    - **Filtros de Búsqueda:**
        - `[Input]` **Período de Pago:** Un selector de mes y año (ej. `2025-08`). Requerido.
        - `[Input]` **RUT del Beneficiario:** Un campo de texto para buscar los pagos de una persona específica. Opcional.
    - **Botón de Búsqueda:** `[Botón Primario]` "Buscar Liquidaciones".
    - **Tabla de Resultados:** Un `DataGrid` que muestra las liquidaciones que coinciden con la búsqueda. Columnas:
        - `ID Liquidación`
        - `RUT Beneficiario`
        - `Nombre Beneficiario`
        - `Monto Líquido`
        - `Estado del Pago` (ej. "Generado", "Enviado a Banco", "Pagado", "Rechazado")
        - `Acciones` (un botón o ícono para "Ver Detalle").

## 3. Componente: `Modal Detalle de Liquidación`

- **Propósito:** Mostrar una réplica exacta de la liquidación de pago de un beneficiario para un mes específico.
- **Activación:** Se abre al hacer clic en "Ver Detalle" en la tabla de resultados.
- **Contenido:**
    - **Cabecera:** Datos del beneficiario, período de pago, y monto líquido total.
    - **Tabla de Conceptos:** Una tabla con dos columnas principales: "Haberes" y "Descuentos".
        - Cada fila representa un `ConceptoLiquidacion` (ej. "Monto Base de Pensión", "Cotización Legal de Salud (7%)").
        - Muestra la descripción del concepto y el monto correspondiente.
    - **Pie de Página:** Total de Haberes, Total de Descuentos y el Monto Líquido final.
    - **Panel de Acciones del Modal:**
        - `[Botón]` **Descargar PDF:** Genera y descarga una versión en PDF de la liquidación.
        - `[Botón]` **Cerrar**.

## 4. Flujo de Interacción

1.  **Búsqueda:** El `Operador` ingresa un período (ej. `2025-08`) y opcionalmente un RUT. Presiona "Buscar".
2.  **Visualización de Resultados:** La `Tabla de Resultados` se puebla con todas las liquidaciones del mes. El operador puede ordenar y paginar los resultados.
3.  **Consulta de Detalle:** El `Operador` encuentra la liquidación que necesita verificar y hace clic en "Ver Detalle".
4.  **Análisis en Modal:** Se abre el `Modal Detalle de Liquidación`. El operador revisa cada línea de haber y descuento.
5.  **Exportación:** Si es necesario (ej. para enviar por correo a un beneficiario), el operador hace clic en "Descargar PDF".
