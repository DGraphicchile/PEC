# Especificación de Interfaz de Usuario (GUI): Panel de Gobernanza Normativa

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo de la Interfaz

Proporcionar al **Administrador de Gobernanza** una interfaz segura y auditable para gestionar el ciclo de vida de los `MarcosNormativos` y sus artefactos componentes (`ParametrosNormativos`, `DirectivasDeEjecucion`).

## 2. Pantalla Principal: `Panel de Gobernanza Normativa`

- **Rol Principal:** Admin. de Gobernanza.
- **Propósito:** Visualizar y administrar toda la configuración normativa del sistema.
- **Layout:** Una vista con pestañas para cada tipo de entidad: `Marcos Normativos`, `Parámetros` y `Directivas`.

### 2.1. Pestaña: `Marcos Normativos`
- **Componentes Clave:**
    - **Tabla de Marcos Normativos:** Un `DataGrid` con todos los marcos. Columnas:
        - `Nombre del Marco`
        - `ID`
        - `Versión Parámetros` (con enlace al artefacto)
        - `Versión Directiva` (con enlace al artefacto)
        - `Fecha Inicio Vigencia`
        - `Fecha Fin Vigencia`
        - `Estado` (`[Chip Verde]` Activo, `[Chip Gris]` Inactivo, `[Chip Azul]` Futuro).
    - **Acciones Principales:**
        - `[Botón Primario]` **+ Nuevo Marco Normativo**
        - `[Botón]` **Activar/Desactivar** (requiere confirmación de alta seguridad).

### 2.2. Pestañas: `Parámetros` y `Directivas`
- **Componentes Clave:**
    - **Tabla de Artefactos:** Lista las versiones de cada artefacto (`v1.0.0`, `v1.1.0`, etc.), su fecha de carga y su hash de contenido.
    - **Acción Principal:** `[Botón]` **Cargar Nuevo Artefacto**, que abre un modal para subir el archivo JSON/YAML correspondiente.

## 3. Flujo de Interacción: Crear y Activar un Nuevo Marco

1.  **Carga de Artefactos:** El `Admin` primero va a las pestañas de `Parámetros` y `Directivas` para subir los nuevos archivos JSON con las versiones que usará el nuevo marco.
2.  **Creación del Marco:**
    - En la pestaña `Marcos Normativos`, hace clic en **"+ Nuevo Marco Normativo"**.
    - Se abre un **asistente (wizard) de 3 pasos**:
        1.  **Paso 1:** Ingresar `Nombre` y `Fechas de Vigencia`.
        2.  **Paso 2:** Seleccionar la `Versión de Parámetros` de un menú desplegable (poblado desde los artefactos ya cargados).
        3.  **Paso 3:** Seleccionar la `Versión de Directiva`.
    - Al finalizar, el marco se crea en estado **Inactivo**.
3.  **Activación del Marco:**
    - El `Admin` selecciona el nuevo marco inactivo y hace clic en **"Activar"**.
    - Se abre un `Modal de Confirmación de Seguridad` que le pide escribir una palabra clave (ej. "ACTIVAR MARCO") para confirmar la acción.
    - Tras la confirmación, el estado del marco cambia a **Activo** o **Futuro**, dependiendo de su fecha de inicio.
