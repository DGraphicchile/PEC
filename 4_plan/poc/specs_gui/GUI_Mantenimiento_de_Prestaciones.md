# Especificación de Interfaz de Usuario (GUI): Centro de Mantenimiento de Prestaciones

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

Proporcionar al **Analista de Negocio** un conjunto de herramientas centralizadas y contextuales para ejecutar los diversos procesos de mantenimiento (`PDN-MANT-*`) sobre prestaciones ya activas. La interfaz debe estar integrada en la `Vista FichaPersona` para un flujo de trabajo natural.

## 2. Pantalla Principal: Pestaña "Mantenimiento" en `Vista FichaPersona`

- **Rol Principal:** Analista de Negocio.
- **Propósito:** Agrupar todas las acciones de mantenimiento disponibles para una prestación específica.
- **Componentes Clave:**
    - **Selector de Prestación:** Si el beneficiario tiene más de una prestación activa, un menú desplegable permite seleccionar sobre cuál se aplicará el mantenimiento.
    - **Panel de Acciones de Mantenimiento:** Una serie de tarjetas o botones, cada uno representando un proceso de mantenimiento clave.
        - `[Tarjeta/Botón]` **Aplicar Revisión por Agravamiento (`PDN-MANT-004`)**
        - `[Tarjeta/Botón]` **Gestionar Ajuste Manual en Liquidación (`PDN-MANT-016`)**
        - `[Tarjeta/Botón]` **Registrar Cese por Nuevo Vínculo (`PDN-MANT-010`)**
        - `[Tarjeta/Botón]` **Gestionar Exportación de Pensión (`PDN-MANT-008`)**

## 3. Componentes: Modales de Acción

Cada acción del panel abre un modal específico con un formulario dedicado.

### 3.1. Modal: `Aplicar Revisión por Agravamiento`
- **Propósito:** Ingresar los resultados de una nueva evaluación médica.
- **Contenido:**
    - Un campo para ingresar el nuevo porcentaje de incapacidad.
    - Un campo para adjuntar el dictamen médico correspondiente.
    - Un botón de "Simular Nuevo Monto" que muestra el impacto en la pensión antes de confirmar.

### 3.2. Modal: `Gestionar Ajuste Manual`
- **Propósito:** Añadir un haber o descuento puntual a la próxima liquidación.
- **Contenido:**
    - Selector: `Haber` o `Descuento`.
    - Input para el `Monto`.
    - Input para la `Descripción` que aparecerá en la liquidación (ej. "Bono de escolaridad").
    - Opciones para descuentos en cuotas (si aplica).

## 4. Flujo de Interacción

1.  **Contexto:** El `Analista` está en la `Vista FichaPersona` de un beneficiario.
2.  **Navegación:** Selecciona la pestaña "Mantenimiento".
3.  **Selección de Acción:** Elige la prestación a modificar (si hay más de una) y hace clic en la acción deseada, por ejemplo, "Gestionar Ajuste Manual".
4.  **Ejecución en Modal:** Se abre el `Modal Gestionar Ajuste Manual`. El analista completa los datos del ajuste y guarda.
5.  **Confirmación:** El modal se cierra. La UI muestra una notificación de éxito: "El ajuste se aplicará en la próxima liquidación". Un registro de la acción aparece en el timeline del expediente asociado.
