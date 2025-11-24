# Especificación Técnica: Contratos de Props (Inertia.js)

*Propósito: Con la adopción de Inertia.js, el "contrato" entre el backend y el frontend es la **forma de las `props` (datos) que cada controlador de AdonisJS pasa al componente React de la página correspondiente.** Este documento cataloga las `props` para las páginas clave del sistema, sirviendo como la fuente de verdad para los desarrolladores de ambos lados.*

---

## 1. Props Compartidas (Shared Props)

Ciertas `props` se comparten en todas las páginas. Estas se definen en el middleware `HandleInertiaRequests` del backend.

- **`auth.user`**: Objeto que contiene los datos del usuario autenticado.
  - `id: string`
  - `nombre: string`
  - `email: string`
  - `rol: string` (ej. 'Analista', 'Supervisor')
- **`flash`**: Objeto para mensajes de notificación (ej. éxito, error).
  - `success: string | null`
  - `error: string | null`

---

## 2. Catálogo de Props por Página

A continuación se detalla la forma de las `props` específicas para cada página.

### Página: `Incidentes/Index` (Bandeja de Tareas)
- **Ruta del Backend:** `GET /incidentes`
- **Componente React:** `resources/js/Pages/Incidentes/Index.tsx`
- **Descripción:** Muestra la lista de incidentes de dominio para el usuario.
- **Props Específicas:**
  - `incidentes: { data: Array, links: Object, meta: Object }` (Objeto de paginación de AdonisJS)
    - `data: [{ id, codigoEXD, descripcionSistema, estado, fechaDeteccion, prioridadIPT, analistaAsignado: { id, nombre } | null }]`

### Página: `Incidentes/Show` (Formulario de Verificación Manual)
- **Ruta del Backend:** `GET /incidentes/{id}`
- **Componente React:** `resources/js/Pages/Incidentes/Show.tsx`
- **Descripción:** Muestra el detalle completo de un incidente para su análisis y resolución.
- **Props Específicas:**
  - `incidente: { id, codigoEXD, ..., fichaPersona: { id, rut, nombreCompleto, ... } }`

### Página: `Fichas/Show` (Vista 360° del Beneficiario)
- **Ruta del Backend:** `GET /fichas/{id}`
- **Componente React:** `resources/js/Pages/Fichas/Show.tsx`
- **Descripción:** Muestra la vista consolidada de un beneficiario.
- **Props Específicas:**
  - `ficha: { id, persona: { ... }, acuerdosDePago: [ ... ], prestaciones: [ ... ], historialAfiliacion: [ ... ] }`

---

## 3. Contratos de Formularios (Peticiones)

Las acciones como crear o actualizar datos se manejan con peticiones `POST`, `PUT`, o `DELETE` a las rutas del backend. El contrato aquí no es una respuesta JSON, sino el **cuerpo de la petición** que el frontend debe enviar.

### Acción: Asignar un Incidente
- **Ruta del Backend:** `PUT /incidentes/{id}/asignar`
- **Petición (enviada por `router.put`):**
  ```json
  {
    "analistaId": "uuid-del-analista"
  }
  ```
- **Respuesta del Controlador:** Una redirección a la página anterior (`/incidentes`) con un mensaje `flash` de éxito.

### Acción: Crear un Acuerdo de Pago
- **Ruta del Backend:** `POST /fichas/{id}/acuerdos`
- **Petición (enviada por `router.post`):**
  ```json
  {
    "tipoAcuerdo": "Apoderado",
    "rutApoderado": "11.111.111-1",
    "fechaInicioVigencia": "2025-01-01",
    // ...otros campos del formulario
  }
  ```
- **Respuesta del Controlador:** Una redirección a la página de la ficha (`/fichas/{id}`) con un mensaje `flash` de éxito.
