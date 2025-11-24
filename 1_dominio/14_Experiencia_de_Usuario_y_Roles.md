# Anexo L: Experiencia de Usuario y Roles

*Propósito: Definir los perfiles de usuario que interactúan con el sistema, sus responsabilidades, y los flujos de trabajo (user journeys) que siguen para cumplir sus objetivos de negocio. Este documento conecta los Procesos de Negocio (PDN) con la interfaz de usuario.*

---

## 1. Roles de Usuario

| Rol | Descripción | Responsabilidades Clave |
| :--- | :--- | :--- |
| **Analista de Negocio** | Usuario operativo principal. Gestiona el día a día de los casos. | - Registrar y actualizar `AcuerdoDePago`. <br>- Atender consultas de beneficiarios. <br>- Iniciar procesos de `PDN-MANT`. |
| **Supervisor / Líder de Equipo** | Responsable de un equipo de analistas. Gestiona excepciones y aprobaciones. | - Monitorear bandejas de tareas. <br>- Asignar `IncidenteDeDominio`. <br>- Aprobar acciones críticas (`VERF-GOB-001`). |
| **Operador de Pagos** | Rol especializado en la ejecución y conciliación de procesos financieros. | - Ejecutar el ciclo de pago mensual (`PDN-PAG-001`). <br>- Generar y enviar nóminas a bancos y PREVIRED. |
| **Admin. de Gobernanza** | Rol técnico-funcional que gestiona la configuración del `MarcoNormativo`. | - Publicar nuevas versiones de parámetros y directivas. <br>- Monitorear la integridad de los datos maestros. |

---

## 2. User Journeys (Viajes de Usuario)

### 2.1. Catálogo de Pantallas Principales (Vistas Clave)

*Propósito: Definir las vistas principales de la aplicación para establecer un lenguaje común y guiar el diseño de la experiencia de usuario. Cada pantalla está diseñada en torno a las necesidades de un rol específico.*

- **`Dashboard`**
    - **Rol Principal:** Todos (el contenido se adapta al rol).
    - **Propósito:** Ofrecer una vista de alto nivel y ser el punto de partida para las operaciones diarias.
    - **Componentes Clave:**
        - **Widget `Mis Tareas`:** Contador y lista de las 5 tareas más urgentes (priorizadas por IPT) para el usuario logueado.
        - **Widget `Indicadores Clave (KPIs)`:** Tarjetas con métricas relevantes para el rol (ej. para Supervisores: "Casos sin asignar", "Tareas fuera de SLA"; para Operadores: "Estado del último ciclo de pago").
        - **Búsqueda Global:** Una barra de búsqueda prominente para encontrar beneficiarios por RUT o nombre.
        - **Accesos Directos:** Botones para las acciones más frecuentes del rol (ej. "Iniciar Ciclo de Pago" para Operadores).
    - **Acciones Principales:** Navegar a la `Bandeja de Tareas`, realizar una búsqueda, acceder a un proceso masivo.

- **`Bandeja de Tareas`**
    - **Rol Principal:** Analista, Supervisor.
    - **Propósito:** Gestionar la carga de trabajo personal o del equipo. Es la vista operativa central.
    - **Componentes Clave:**
        - **Tabla de Tareas (`DataGrid`):** Columnas configurables (ID Tarea, Prioridad, Tipo, Asunto, Fecha de Creación, Asignado a).
        - **Filtros Avanzados:** Capacidad de filtrar por tipo de tarea (Incidente, Aprobación, Expediente), estado, fecha o analista asignado.
        - **Acciones en Lote:** Checkboxes para seleccionar múltiples tareas y realizar acciones (ej. "Asignar en Lote" para Supervisores).
    - **Acciones Principales:** Asignar una tarea, navegar al detalle de un caso (Expediente, Incidente), ordenar la lista por prioridad.

- **`Vista FichaPersona`**
    - **Rol Principal:** Analista, Supervisor.
    - **Propósito:** Proveer una vista de 360° de un beneficiario para resolver consultas y gestionar sus datos de forma centralizada.
    - **Componentes Clave:**
        - **Cabecera Fija:** Con los datos demográficos principales (Nombre, RUT, Edad, Estado Civil, Foto).
        - **Sistema de Pestañas (Tabs):**
            - `Resumen`: Muestra la información más crítica de un vistazo.
            - `Prestaciones`: Lista de todas sus prestaciones económicas, con su estado, monto y fechas clave.
            - `Acuerdos de Pago`: Tabla de apoderados, retenciones, y cuentas bancarias configuradas.
            - `Expedientes`: Historial de todos los casos y trámites relacionados.
            - `Datos Previsionales`: Información detallada de AFP y Sistema de Salud.
    - **Acciones Principales:** Iniciar un nuevo trámite, crear un nuevo acuerdo de pago, ver el detalle de una prestación.

- **`Vista Detalle de Expediente`**
    - **Rol Principal:** Analista.
    - **Propósito:** Analizar un caso específico desde su origen hasta su resolución, con todo el contexto documental y cronológico.
    - **Componentes Clave:**
        - **Cabecera del Expediente:** Con el Código Único Nacional (CUN), tipo de trámite y estado actual (ej. "En análisis", "Pendiente de antecedentes").
        - **Timeline de Eventos:** Una línea de tiempo visual que muestra cada acción, cambio de estado y comunicación realizada en el expediente.
        - **Visor de Documentos:** Un panel para previsualizar los PDFs adjuntos (REIP, dictámenes, certificados) sin necesidad de descargarlos.
        - **Panel de Acciones Contextuales:** Botones para las acciones disponibles según el estado del expediente (ej. "Otorgar Prestación", "Solicitar Documentación Adicional", "Aplicar Dictamen").
    - **Acciones Principales:** Ejecutar la acción principal del expediente, añadir notas internas, adjuntar nuevos documentos.

- **`Vista Detalle de Incidente (FVM)`**
    - **Rol Principal:** Analista Experto, Supervisor.
    - **Propósito:** Facilitar la resolución guiada y auditable de una excepción de dominio que requiere intervención humana.
    - **Componentes Clave:**
        - **Panel de Diagnóstico:** Muestra el error técnico (`EXD-DATOS-002`) y los datos del sistema en el momento del fallo para entender la causa raíz.
        - **Formulario de Resolución:** Campos de texto estructurados para que el analista escriba su `Diagnóstico` y `Plan de Acción`.
        - **Panel de Aprobación (para Supervisores):** Sección donde el supervisor ve el plan propuesto y puede aprobarlo o rechazarlo con comentarios.
        - **Botón de Ejecución:** Botón (deshabilitado hasta la aprobación) para aplicar la corrección propuesta de forma segura.
    - **Acciones Principales:** Proponer solución, aprobar/rechazar solución, ejecutar corrección.

- **`Vista de Procesos Masivos`**
    - **Rol Principal:** Operador de Pagos.
    - **Propósito:** Iniciar y monitorear la ejecución de procesos batch críticos de forma segura y controlada.
    - **Componentes Clave:**
        - **Lista de Procesos Disponibles:** Tarjetas para cada proceso (Ciclo de Pago, Carga de Archivos, etc.) con una breve descripción.
        - **Historial de Ejecuciones:** Una tabla con las ejecuciones pasadas, su estado (Exitoso, Fallido), la fecha, duración y el usuario que la inició.
        - **Panel de Monitoreo en Vivo:** (Aparece al ejecutar un proceso) Muestra logs en tiempo real, una barra de progreso y contadores de registros procesados/fallidos.
    - **Acciones Principales:** Iniciar un nuevo proceso, ver el detalle y los logs de una ejecución pasada, descargar los artefactos (archivos) de una ejecución completada.

### 2.2. Journey: Resolver un Incidente de Dominio (`PDN-GOB-001`)
- **Actores:** Supervisor, Analista Experto.
- **Objetivo:** Resolver de forma segura y auditable una inconsistencia de datos que el sistema no puede manejar automáticamente.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Dashboard`** → El `Supervisor` ve un widget de "Tareas Pendientes" con un nuevo incidente.
    2.  **`Bandeja de Tareas`** → Al hacer clic, navega a su bandeja, donde ve el incidente "No Asignado".
        *   **Acción:** Selecciona el incidente → Abre `Modal Asignar`.
        *   **En Modal:** Elige a un `Analista Experto` y confirma.
    3.  **`Bandeja de Tareas` (del `Analista`)** → El `Analista` recibe una notificación y ve la nueva tarea en su bandeja.
        *   **Acción:** Clic en el ID del incidente para navegar a su detalle.
    4.  **`Vista Detalle de Incidente (FVM)`** → El `Analista` estudia el caso, que muestra los datos relevantes.
        *   **Acción:** Completa el formulario de diagnóstico y hace clic en "Enviar a Aprobación".
    5.  **`Bandeja de Tareas` (del `Supervisor`)** → El `Supervisor` recibe una tarea de "Aprobación Pendiente".
        *   **Acción:** Clic en la tarea para navegar al detalle.
    6.  **`Vista Detalle de Incidente (FVM)`** → El `Supervisor` revisa el plan de acción.
        *   **Acción:** Clic en el botón "Aprobar".
    7.  **`Vista Detalle de Incidente (FVM)` (del `Analista`)** → El `Analista` ve el caso ahora como "Aprobado".
        *   **Acción:** Clic en "Ejecutar Corrección".
    8.  **Resultado:** La pantalla muestra una notificación de éxito (`Toast/Snackbar`) y el estado del incidente se actualiza a "Cerrado".

### 2.3. Journey: Gestionar un nuevo Apoderado (`PDN-MANT-009`)
- **Actor:** Analista de Negocio.
- **Objetivo:** Registrar un apoderado para que un tercero pueda cobrar una prestación en nombre del beneficiario.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Dashboard`** → El `Analista` utiliza la barra de búsqueda global para encontrar a un beneficiario por su RUT.
    2.  **`Vista FichaPersona`** → Navega a la pestaña "Acuerdos de Pago".
        *   **Acción:** Clic en el botón "+ Nuevo Acuerdo".
    3.  **`Modal Nuevo Acuerdo`** → El `Analista` completa el formulario con los datos del apoderado y la cuenta bancaria, y adjunta el poder notarial en PDF.
        *   **Acción:** Clic en "Guardar".
    4.  **`Vista FichaPersona`** → El modal se cierra, la tabla de acuerdos se actualiza con el nuevo registro y aparece una notificación de éxito.

### 2.4. Journey: Ejecutar Ciclo de Pago Mensual (`PDN-PAG-001`)
- **Actor:** Operador de Pagos.
- **Objetivo:** Procesar la nómina mensual de pagos de forma segura, monitoreada y con evidencia de su ejecución.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Dashboard`** → El `Operador` navega al menú "Procesos Financieros".
    2.  **`Vista de Procesos Masivos`** → Selecciona "Ciclo de Pago Mensual".
        *   **Acción:** Elige el período a procesar y hace clic en "Iniciar Ejecución".
    3.  **`Modal de Confirmación`** → El `Operador` lee el resumen y confirma la acción.
    4.  **`Vista de Monitoreo de Proceso`** → La pantalla muestra el progreso del batch en tiempo real (barra de progreso, contadores, logs). Al finalizar, se habilitan los botones de descarga de los artefactos (nómina bancaria, archivo PreviRed, etc.).

### 2.5. Journey: Aplicar Dictamen de Reliquidación (`PDN-COR-002`)
- **Actor:** Analista de Negocio.
- **Objetivo:** Aplicar una corrección retroactiva a una prestación, ordenada por un ente regulador.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Búsqueda Global`** → El `Analista` busca al beneficiario afectado.
    2.  **`Vista FichaPersona`** → Navega a la pestaña "Expedientes Relacionados".
    3.  **`Vista Detalle de Expediente`** → Dentro del expediente correcto, el `Analista` selecciona la acción "Aplicar Dictamen Externo".
    4.  **`Modal Aplicar Dictamen`** → Completa los datos del dictamen y adjunta el documento.
        *   **Acción:** Clic en "Simular Reliquidación".
    5.  **`Modal Simulación de Impacto`** → La UI muestra el resultado del cálculo (ej. monto a favor/en contra).
        *   **Acción:** El `Analista` confirma la operación.
    6.  **`Vista Detalle de Expediente`** → El historial del expediente se actualiza con la nueva resolución y la UI muestra una notificación de éxito.

### 2.6. Journey: Otorgar una Nueva Prestación (`PDN-OTG-002`)
- **Actor:** Analista de Negocio.
- **Objetivo:** Registrar y activar un nuevo beneficio económico para una persona.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Bandeja de Tareas`** → El `Analista` recibe una tarea de "Otorgamiento Pendiente".
        *   **Acción:** Clic para abrir el expediente.
    2.  **`Vista Detalle de Expediente`** → La UI muestra los datos del siniestro, el sueldo base ya calculado y una checklist de validación.
        *   **Acción:** El `Analista` completa las validaciones y hace clic en "Simular Prestación".
    3.  **`Modal Simulación de Prestación`** → Se muestra el detalle del cálculo del beneficio.
        *   **Acción:** El `Analista` confirma haciendo clic en "Otorgar Prestación".
    4.  **`Vista Detalle de Expediente`** → El expediente se actualiza, mostrando la nueva prestación como "Activa" y la resolución en PDF adjunta. Aparece una notificación de éxito.

### 2.7. Journey: Gestionar Suspensión y Reactivación de Pensión (`PDN-MANT-002`/`003`)
- **Actores:** Sistema (Monitor), Analista de Negocio.
- **Objetivo:** Administrar la vigencia de una prestación condicionada.
- **Flujo de Pantallas (UX/UI):**
    1.  **`Bandeja de Tareas`** → El `Analista` ve una tarea generada por el sistema: "Aviso de Suspensión por vencimiento de certificado".
    2.  **`Vista FichaPersona`** → Al navegar a la ficha, la prestación afectada aparece destacada.
        *   **Acción:** El `Analista` confirma la suspensión haciendo clic en "Suspender".
    3.  **(Posteriormente)** El `Analista` recibe el nuevo certificado y vuelve a la `Vista FichaPersona`.
        *   **Acción:** Sobre la prestación suspendida, hace clic en "Reactivar".
    4.  **`Modal Reactivar Prestación`** → Adjunta el nuevo documento y confirma.
    5.  **`Vista FichaPersona`** → El estado de la prestación se actualiza a "Activa" y la UI muestra una notificación de éxito.
