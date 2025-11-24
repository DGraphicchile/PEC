# Especificación de Interfaz de Usuario (GUI): Carga de Antecedentes y Preparación de Caso

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

El objetivo de esta interfaz es permitir al **Analista de Pensiones** digitalizar y categorizar todos los documentos de antecedentes para un nuevo caso. La correcta carga y clasificación de estos documentos es un prerrequisito para que el sistema pueda ejecutar procesos automáticos como el cálculo del sueldo base (`PDN-OTG-001`).

## 2. Pantalla Principal: `Vista Detalle de Expediente` (en estado "Recopilando Antecedentes")

Cuando un nuevo caso es creado (ej. a partir de una REIP escaneada), se genera un `ExpedienteDeTramite` en un estado inicial. Al acceder a él, el analista es presentado con la siguiente interfaz de preparación.

### 2.1. Layout General

La pantalla mantiene un layout consistente, pero el área de trabajo central se enfoca en la carga y gestión de documentos.

### 2.2. Desglose de Componentes

#### **Componente 1: Cabecera del Expediente**
- **Contenido:** Muestra el CUN, nombre del beneficiario y el estado del expediente: `[Chip Amarillo]` "Recopilando Antecedentes".

#### **Componente 2: Checklist de Documentos Requeridos (Columna Izquierda)**
- **Propósito:** Guiar al analista, mostrando dinámicamente los documentos necesarios para este tipo de caso.
- **Contenido:** Una lista de ítems que se marcan automáticamente a medida que los documentos son cargados y categorizados.
    - `[ ] Cédula de Identidad`
    - `[ ] REIP (Resolución de Incapacidad)`
    - `[ ] Contrato(s) de Trabajo`
    - `[ ] Últimas 6 Liquidaciones de Sueldo` (el número de liquidaciones es determinado por el `MarcoNormativo` aplicable).
    - `[ ] Certificado de Afiliación AFP`
    - `[ ] Certificado de Afiliación Salud`
- **Comportamiento:** Un ítem se marca como `[Check Verde]` solo cuando un documento subido ha sido asignado a su categoría.

#### **Componente 3: Panel de Carga de Documentos (Área Central)**
- **Propósito:** Es el área de trabajo principal para subir y clasificar los archivos.
- **Contenido:**
    - **Zona de Carga (Drop Zone):** Un área grande y claramente delimitada que invita al usuario a "Arrastrar y soltar archivos aquí" o a usar un botón para "Seleccionar archivos". Permite la subida de múltiples archivos simultáneamente.
    - **Tabla de Archivos Subidos:** Una vez subidos, los archivos aparecen en una tabla con las siguientes columnas:
        - **`Previsualización:`** Un ícono del tipo de archivo (ej. PDF, JPG).
        - **`Nombre de Archivo:`** `liquidacion_junio.pdf`
        - **`Categoría:`** Un `[Menú Desplegable]` **requerido** para que el analista clasifique el documento. Las opciones del menú son las mismas que las del checklist (Cédula, REIP, Liquidación de Sueldo, etc.).
        - **`Fecha de Subida:`** `11-08-2025 11:30`
        - **`Acciones:`** `[Ícono de Previsualizar]`, `[Ícono de Eliminar]`.

#### **Componente 4: Panel de Acciones (Columna Derecha)**
- **Propósito:** Permitir al analista guardar su progreso o finalizar la etapa de recopilación.
- **Contenido:**
    - **`[Botón Primario]` Iniciar Análisis y Cálculo de Sueldo Base:** (Deshabilitado por defecto). Se activa solo cuando todos los ítems del **Checklist de Documentos Requeridos** están completos.
    - **`[Botón Secundario]` Guardar Borrador:** Permite al analista guardar el estado actual de los archivos subidos y categorizados para continuar más tarde.

## 3. Flujo de Interacción

1.  **Acceso:** El analista recibe una tarea en su `Bandeja de Tareas` por un "Nuevo expediente en recopilación". Al hacer clic, accede a esta interfaz.

2.  **Carga de Archivos:** El analista arrastra y suelta un conjunto de archivos escaneados (ej. 5 PDFs) en la **Zona de Carga**. Los archivos se suben y aparecen en la **Tabla de Archivos Subidos**.

3.  **Categorización:** El analista va fila por fila en la tabla. Para `liquidacion_junio.pdf`, selecciona la categoría "Liquidación de Sueldo" en el menú desplegable. Al hacerlo, el ítem correspondiente en el **Checklist de Documentos Requeridos** se marca con un check verde.

4.  **Completitud:** El analista repite el proceso hasta que todos los archivos están categorizados y todos los ítems del checklist están en verde.

5.  **Inicio de Procesos Automáticos:**
    - El botón **"Iniciar Análisis y Cálculo de Sueldo Base"** se habilita.
    - Al hacer clic, el sistema muestra un `Modal de Confirmación`.
    - Tras confirmar, el estado del expediente cambia a `[Chip Azul]` "Análisis en Progreso". La UI muestra una notificación de éxito: "Documentos enviados a procesamiento. El cálculo del sueldo base ha comenzado."

6.  **Transición al Siguiente Paso:** El expediente ahora sale de la bandeja del analista y espera a que los procesos automáticos (`PDN-OTG-001`) finalicen. Una vez que el sueldo base esté calculado, el expediente volverá a la bandeja del analista, pero esta vez para la etapa de **Otorgamiento**, presentando la interfaz descrita en el documento anterior.
