# Especificación de Interfaz de Usuario (GUI): Centro de Reportería y Consultas

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

Dotar a los **Supervisores** y **Analistas de Cumplimiento** de herramientas de inteligencia de negocio para monitorear la operación, realizar consultas ad-hoc y generar reportes para la toma de decisiones.

## 2. Pantalla Principal: `Centro de Reportería`

- **Rol Principal:** Supervisor, Analista de Cumplimiento.
- **Propósito:** Centralizar la visualización de datos agregados y la generación de informes.
- **Layout:** Una vista con dos pestañas principales: `Dashboard de KPIs` y `Generador de Reportes`.

### 2.1. Pestaña: `Dashboard de KPIs`
- **Propósito:** Ofrecer una vista gráfica y en tiempo real de la salud de la operación.
- **Componentes Clave (Widgets):**
    - **Gráfico de Barras:** "Prestaciones Otorgadas por Mes/Tipo".
    - **Gráfico de Torta:** "Distribución de Prestaciones por Estado (Activa, Suspendida, Cesada)".
    - **Tarjeta de KPI:** "Tiempo Promedio de Otorgamiento".
    - **Tarjeta de KPI:** "Total de Pagos del Mes Actual".
- **Comportamiento:** Los widgets deberían tener filtros básicos (ej. por rango de fechas).

### 2.2. Pestaña: `Generador de Reportes`
- **Propósito:** Permitir a los usuarios ejecutar consultas predefinidas y exportar los datos.
- **Componentes Clave:**
    - **Lista de Reportes Predefinidos:**
        - "Listado de Pensiones Suspendidas"
        - "Detalle de Pagos por Beneficiario"
        - "Informe de Acuerdos de Pago Creados"
        - "Casos de Gobernanza Abiertos"
    - **Panel de Parámetros:** Al seleccionar un reporte, se muestra un formulario para ingresar los parámetros necesarios (ej. Rango de Fechas, Tipo de Prestación, etc.).
    - **Botón `[Botón Primario]` Ejecutar Reporte**.
    - **Área de Resultados:** Una tabla (`DataGrid`) que muestra los resultados de la consulta.
    - **Botón `[Botón Secundario]` Exportar a CSV**.

## 3. Flujo de Interacción

1.  **Acceso:** El `Supervisor` navega al `Centro de Reportería` desde el menú principal.
2.  **Consulta de KPI:** Revisa los gráficos en el `Dashboard de KPIs` para obtener una visión general.
3.  **Generación de Reporte:**
    - Navega a la pestaña `Generador de Reportes`.
    - Selecciona el reporte "Listado de Pensiones Suspendidas".
    - En el panel de parámetros, elige el rango de fechas "Últimos 30 días" y presiona "Ejecutar Reporte".
4.  **Análisis y Exportación:**
    - La tabla de resultados se llena con los datos solicitados.
    - El `Supervisor` analiza los datos y decide exportarlos para un análisis más profundo, haciendo clic en "Exportar a CSV".
