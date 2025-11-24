# Especificación de Interfaz de Usuario (GUI): Otorgamiento de Prestación

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

El objetivo de esta interfaz es guiar al **Analista de Pensiones** a través del proceso de **Otorgamiento de una nueva prestación (`PDN-OTG-002`)** de forma segura, eficiente y auditable. La pantalla debe proporcionar toda la información necesaria para tomar una decisión informada y minimizar la posibilidad de errores.

## 2. Pantalla Principal: `Vista Detalle de Expediente`

Esta es la pantalla central donde el analista realiza la mayor parte del trabajo de otorgamiento. Se accede a ella desde la `Bandeja de Tareas`.

### 2.1. Layout General

La pantalla se divide en tres columnas o áreas principales:
1.  **Columna Izquierda (Contexto del Caso):** Información clave y validaciones.
2.  **Columna Central (Área de Trabajo):** Visor de documentos y detalles.
3.  **Columna Derecha (Acciones e Historial):** Panel de acciones y timeline de eventos.

### 2.2. Desglose de Componentes

#### **Componente 1: Cabecera del Expediente (Fijo en la parte superior)**
- **Propósito:** Mantener siempre visible el contexto principal del caso.
- **Contenido:**
    - **Título:** "Expediente de Otorgamiento"
    - **ID del Caso (CUN):** `CUN-2025-08-12345`
    - **Estado del Expediente:** `[Chip/Etiqueta]` con el estado actual (ej. "En Análisis", "Pendiente Validación", "Otorgado"). El color del chip cambia según el estado.
    - **Nombre del Beneficiario:** `Juan Pérez González` (con enlace a la `Vista FichaPersona`).
    - **RUT del Beneficiario:** `12.345.678-9`

#### **Componente 2: Panel de Resumen del Cálculo (Columna Izquierda)**
- **Propósito:** Mostrar el resultado del proceso previo `PDN-OTG-001`.
- **Contenido:**
    - **Tarjeta "Sueldo Base Calculado"**: Un componente destacado que muestra:
        - **Monto:** `$ 550.000` (en formato de moneda grande y claro).
        - **Período de Cálculo:** "Basado en rentas de Ene-2025 a Jun-2025".
        - **Marco Normativo Aplicado:** `MN-2025-REFORMA-LEY`.

#### **Componente 3: Checklist de Validación (Columna Izquierda)**
- **Propósito:** Guiar al analista en la verificación de los antecedentes requeridos antes de poder otorgar el beneficio.
- **Contenido:** Una lista de ítems interactivos:
    - `[Checkbox]` Verificar identidad del beneficiario.
    - `[Checkbox]` Confirmar datos previsionales (AFP/Salud) en FichaPersona.
    - `[Checkbox]` Revisar consistencia de la REIP adjunta.
    - `[Checkbox]` Validar cotizaciones (resultado de `VALID-OTG-001`).
- **Comportamiento:** El botón de acción principal ("Simular Prestación") permanece **deshabilitado** hasta que todos los checkboxes estén marcados.

#### **Componente 4: Visor de Documentos (Columna Central)**
- **Propósito:** Permitir al analista revisar la evidencia documental sin salir de la pantalla.
- **Contenido:**
    - Un sistema de pestañas o una lista para seleccionar los documentos adjuntos (ej. "REIP.pdf", "Cédula.pdf").
    - Un área principal que muestra una previsualización del documento seleccionado.

#### **Componente 5: Panel de Acciones (Columna Derecha)**
- **Propósito:** Centralizar todas las acciones que el analista puede tomar sobre el expediente.
- **Contenido:** Una serie de botones, cuya disponibilidad depende del estado del caso.
    - **`[Botón Primario]` Simular Prestación:** (Deshabilitado por defecto). Se activa al completar la checklist.
    - **`[Botón Secundario]` Rechazar Expediente:** Abre un modal para justificar el rechazo.
    - **`[Botón Secundario]` Solicitar más Información:** Abre un modal para registrar una gestión de contacto.

#### **Componente 6: Timeline de Eventos (Columna Derecha)**
- **Propósito:** Mostrar un historial claro y auditable de todo lo que ha ocurrido en el caso.
- **Contenido:** Una línea de tiempo vertical que muestra eventos como:
    - `Hoy 10:30` - **Usuario 'supervisor'** asignó el caso a **'analista.pensiones'**.
    - `Hoy 09:15` - **Sistema** calculó el Sueldo Base: `$ 550.000`.
    - `Ayer 18:00` - **Sistema** creó el expediente a partir de la REIP.

## 3. Flujo de Interacción y Modales

1.  **Análisis y Validación:**
    - El analista llega a la pantalla. Revisa el **Sueldo Base Calculado** y los documentos en el **Visor**. A medida que valida, marca los ítems en la **Checklist de Validación**.

2.  **Simulación:**
    - Una vez la checklist está completa, el botón **"Simular Prestación"** se activa.
    - Al hacer clic, se abre el **`Modal Simulación de Prestación`**.
        - **Contenido del Modal:** Un resumen claro del cálculo:
            - Sueldo Base: `$ 550.000`
            - % de Pensión (según `MarcoNormativo`): `70%`
            - **Monto Pensión Resultante: `$ 385.000`**
        - **Acciones del Modal:** "Cancelar" y "Confirmar Simulación".

3.  **Otorgamiento:**
    - Al confirmar la simulación, el modal se cierra.
    - El **Panel de Acciones** ahora muestra un nuevo botón primario: **`[Botón Primario]` Otorgar Prestación**.
    - Al hacer clic, el sistema ejecuta el proceso final.

4.  **Confirmación Final:**
    - La pantalla se actualiza:
        - El **Estado del Expediente** en la cabecera cambia a `[Chip Verde]` "Otorgado".
        - El **Timeline de Eventos** muestra una nueva entrada: "**Usuario 'analista.pensiones'** ha otorgado la prestación."
        - Aparece una **notificación (`Toast/Snackbar`)** de éxito en la esquina de la pantalla: "Prestación otorgada correctamente."
