# ADR-019: Stack Tecnológico para el Front-end Interno

- Estado: Aceptada
- Fecha: 2025-08-11
- Deciders: (Equipo de Arquitectura)
- Authors: (Tu Nombre/Equipo)

## Contexto
El sistema requiere un front-end interno para los roles de Analista, Supervisor y Operador. Este portal debe permitir la gestión de casos, la visualización de datos y la ejecución de procesos de negocio (PDN). La arquitectura debe ser moderna y productiva, buscando la fluidez de una SPA sin la complejidad de gestionar una API y un estado de servidor desacoplados.

## Decisión
Se adoptará un enfoque de **monolito moderno** utilizando **Inertia.js** para conectar el backend de AdonisJS con el frontend de React.

El stack tecnológico específico será:

1.  **Vínculo Backend-Frontend:** **Inertia.js** para permitir la creación de una aplicación de página única utilizando enrutamiento y controladores del lado del servidor.
2.  **Framework Backend:** **AdonisJS (v6+)**, cuyos controladores responderán a las peticiones de navegación con componentes React y sus props, en lugar de retornar JSON puro a una API.
3.  **Framework Frontend:** **React (v18+)** con **Vite**, renderizando las vistas a partir de los componentes y datos provistos por el backend a través de Inertia.
4.  **Librería de Componentes:** **Material UI (MUI)** para un diseño consistente y profesional.
5.  **Lenguaje:** **TypeScript** en todo el stack.

## Alternativas Consideradas
- **API Separada + SPA Tradicional:** El enfoque de tener un backend AdonisJS que expone una API REST/GraphQL y un frontend React separado que la consume. Esta alternativa ofrece un desacoplamiento total pero introduce mayor complejidad en la gestión de estado, autenticación y diseño de API.
- **Renderizado del Lado del Servidor (SSR) tradicional:** Usar el motor de plantillas de AdonisJS (Edge) para renderizar HTML. Esto es más simple pero sacrifica la experiencia de usuario fluida de una SPA.

## Consecuencias
- **(+) Desarrollo Simplificado:** Se elimina la necesidad de diseñar y versionar una API separada para el frontend. El desarrollo se siente similar al de una aplicación tradicional renderizada en el servidor, pero con la reactividad de una SPA.
- **(+) Reducción de Complejidad en el Frontend:** La gestión de estado del servidor se simplifica drásticamente, ya que los datos se reciben como `props` en cada navegación. Las herramientas de fetching y cacheo en el cliente se vuelven menos necesarias.
- **(+) Acoplamiento Controlado:** Existe un mayor acoplamiento entre el backend y el frontend, lo cual es una característica del patrón. Esto es beneficioso para equipos pequeños y medianos.
- **(-) Curva de Aprendizaje de Inertia:** El equipo necesitará familiarizarse con los conceptos y el flujo de trabajo de Inertia.js.

## Acciones
- Configurar el adaptador de Inertia.js en el proyecto AdonisJS.
- Estructurar el frontend de React para que sea compatible con Inertia.
- Actualizar la documentación para reflejar que los "contratos de API" son ahora la forma de las `props` pasadas desde los controladores.
