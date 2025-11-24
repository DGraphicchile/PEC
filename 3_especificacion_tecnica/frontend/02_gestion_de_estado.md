# Especificación Técnica: Gestión de Estado con Inertia.js

*Propósito: Definir la estrategia para gestionar el estado en una aplicación con Inertia.js, donde la distinción entre estado del servidor y de la UI se maneja de forma diferente a una SPA tradicional.*

---

## 1. Estado de la Página (Page State)

Con Inertia.js, el concepto tradicional de "estado del servidor" gestionado en el cliente desaparece para las cargas de página.

- **Definición:** Son los datos que una página necesita para renderizarse. En el modelo Inertia, estos datos son resueltos por el controlador de AdonisJS en el backend y se **pasan directamente como `props` al componente de la página de React.**
- **Herramienta Principal:** El hook `usePage()` de Inertia.js.

### 1.1. Acceso a los Datos de la Página
Todos los datos pasados desde el controlador están disponibles a través del hook `usePage`.

```typescript
import { usePage } from '@inertiajs/react'

function UserProfile() {
  // Accede a las props pasadas desde el controlador de AdonisJS
  const { user, permissions } = usePage().props

  return <h1>{user.name}</h1>
}
```

No hay necesidad de usar `useEffect` para buscar datos al montar un componente de página. Inertia se encarga de que las `props` estén siempre actualizadas en cada navegación.

### 1.2. Actualizaciones y Mutaciones (Ej. Formularios)
Para enviar datos al servidor (ej. al guardar un formulario), se utilizan los métodos del router de Inertia.

- **Herramienta:** `router.post()`, `router.put()`, `router.delete()`.
- **Justificación:** Estos métodos envían una petición estándar al backend, pero en lugar de esperar JSON, reciben una respuesta de Inertia que actualiza la página y sus `props` de forma reactiva, sin una recarga completa.

```typescript
import { router } from '@inertiajs/react'

function handleSave(data) {
  // Envía el formulario al endpoint del backend.
  // El controlador procesará la petición y redirigirá,
  // lo que hará que Inertia actualice las props de la página automáticamente.
  router.put(`/users/${user.id}`, data)
}
```
**Nota:** Para mutaciones complejas, se pueden usar librerías específicas para gestionar el estado de la acción (carga, errores, etc.) encapsulando las llamadas del `router` de Inertia, pero no es el patrón principal para la obtención de datos.

---

## 2. Estado de la UI (UI State)
- **Definición:** Datos que solo existen en el cliente y describen el estado de la interfaz (ej. si un modal está abierto, el contenido de un campo de formulario no guardado, el estado de un `DataGrid`).
- **Herramienta:**
    - **Estado local de React (`useState`, `useReducer`):** Es la opción por defecto y preferida para el estado que no necesita ser compartido.
    - **Zustand (Opcional):** Para estado global que debe ser compartido entre componentes no relacionados. Un caso de uso común es inicializar un store global con datos compartidos que Inertia provee en cada carga, como el perfil del usuario autenticado.

### Ejemplo de hidratación de store global:
```typescript
// En el componente raíz de la app (App.jsx)
const { auth } = usePage().props
// Llama a una acción del store para inicializarlo con los datos del usuario
useAuthStore.getState().init(auth.user)
```

---

### Política de Estado
- **Los datos de la página se reciben exclusivamente a través de las `props` de Inertia.** No se debe realizar fetching de datos de página en el cliente al montar un componente.
- **Priorizar siempre el estado local de React.** El estado global debe ser la excepción, no la regla.
- **Las mutaciones se realizan a través del `router` de Inertia.** Esto asegura que el servidor siga siendo la fuente de la verdad y que el estado del cliente se actualice de forma consistente.
