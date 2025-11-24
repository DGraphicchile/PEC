# Esquema de Presentación: Plan de Proyecto PEC (Versión 4 - con Diagramas)

**Audiencia:** Encargados de Negocio
**Objetivo:** Explicar la visión, el valor y el plan de desarrollo detallado para el nuevo sistema de Prestaciones Económicas (PEC).

---

### **Listado de Diapositivas**

**1. Título de la Presentación**
- **Título:** Proyecto de Modernización de Prestaciones Económicas (PEC)
- **Contenido en texto:**
    - Un Plan para el Futuro de la Operación
    - Presentado a: Liderazgo de Negocio
    - Fecha: 12 de Agosto, 2025
- **Contenido visual:** Logo de la compañía y un subtítulo limpio y profesional.

**2. Agenda**
- **Título:** Nuestra Hoja de Ruta para Hoy
- **Contenido en texto:**
    1.  Nuestro Punto de Partida: Análisis y Colaboración
    2.  La Visión y Principios del Nuevo Sistema
    3.  El Plan de Construcción: Un Mapa Común por Capacidades
    4.  La Experiencia del Usuario: Un Vistazo al Futuro Portal
    5.  Próximos Pasos y Discusión
- **Contenido visual:** Un diagrama de flujo simple con los 5 puntos de la agenda.

**3. Nuestro Punto de Partida: Análisis y Colaboración**
- **Título:** Partimos de un Análisis Exhaustivo del Negocio
- **Contenido en texto:**
    - Contamos con un acabado levantamiento de la problemática del negocio. Hemos aprendido de la experiencia pasada.
    - Reorganizamos este conocimiento en un formato que permite una **dinámica colaborativa y transparente** con ustedes, el negocio.
    - El objetivo es tener un mapa común y un lenguaje compartido para avanzar con claridad.
- **Contenido visual:** Un diagrama que muestra varios documentos desordenados a la izquierda ("Levantamiento Histórico") que se transforman en una estructura organizada y limpia a la derecha ("Mapa de Procesos de Negocio").

**4. Visión y Principios Rectores**
- **Título:** Los Pilares del Nuevo Sistema PEC
- **Contenido en texto:**
    - **Diseño Orientado a la Evolución Normativa:** El sistema distingue claramente entre Procesos, Reglas y Parámetros, facilitando futuras actualizaciones.
    - **Auditabilidad Nativa:** Construiremos registros históricos inmutables para garantizar la total transparencia ante auditorías internas, del regulador y del propio beneficiario.
    - **Decisiones Transparentes:** Cada cálculo es una "fotografía" fechada. Siempre podremos responder: "¿Por qué se pagó este monto en esta fecha?".
- **Contenido visual:** Tres íconos grandes representando cada pilar (ej. un libro de contabilidad, una lupa, un pergamino de ley).

**5. La Solución: El Viaje del Beneficio**
- **Título:** La Historia de Cada Prestación
- **Contenido en texto:** El nuevo sistema modela el ciclo de vida completo de un beneficio, desde que nace por un "Hecho Causal" hasta que finaliza. Cada paso es controlado y visible.
- **Contenido visual:** El diagrama de la máquina de estados de la `PrestacionEconomica` (En Evaluación -> Activa -> Suspendida -> Cesada). Extraído de `1_dominio/01_Resumen_Ejecutivo.md`.

**6. Concepto Clave: El "Marco Normativo"**
- **Título:** Una Máquina del Tiempo para las Reglas
- **Contenido en texto:**
    - Este es el "corazón" de la inteligencia del sistema.
    - Asegura que cualquier cálculo, ya sea de hoy o una reliquidación de hace 3 años, use las leyes y parámetros exactos de ese momento.
    - **Garantiza cumplimiento y elimina errores por cambios de normativa.**
- **Contenido visual:** Un diagrama conceptual. A la izquierda, "Cálculo en 2022" apunta a un "Libro de Reglas 2022". A la derecha, "Cálculo en 2025" apunta a un "Libro de Reglas 2025".

**7. Alcance del Sistema Actual (iSeries)**
- **Título:** Qué hace hoy iSeries: nuestro punto de referencia
- **Contenido en texto:**
    - iSeries hoy: calculadora de pensión inicial y mantenedor de prestaciones y asignación familiar.
    - Motor mensual "regulariza": activa/inactiva/reactiva según reglas (edad, estado civil, estudios, fallecimiento); calcula liquidaciones, retroactivos y reajustes; prepara la preliquidación.
    - Genera archivos de salida para Banco de Chile, PREVIRED, SAP (contabilización) y el reporte regulatorio GRIS de SUSESO.
    - Alta dependencia de archivos e insumos externos; validaciones y gestión documental mayormente manual; SUSESO-PIES para cargas no está integrado.
    - Fuera de iSeries: el cálculo de concurrencia prorrata (otra plataforma) y algunos pagos a terceros (Tesorería/Western Union). Operación con fechas de cierre mensual.
- **Contenido visual:** Diagrama con tres bloques: "Calcular y Mantener", "Regulariza mensual", "Genera archivos y reportes"; notas laterales "Procesos manuales/externos" y un icono de "Cierre de periodo".

**8. Nuestro Plan: Un Enfoque por Fases**
- **Título:** Cómo Construiremos el Futuro, Paso a Paso
- **Contenido en texto:**
    - El modelamiento de negocio es exhaustivo y nos permite un desarrollo por etapas.
    - **Fase 1: Reemplazo del Núcleo Operativo de iSeries.**
        - **Objetivo:** Cubrir la funcionalidad del sistema actual. El trabajo de verificación de requerimientos será acotado y orientado a cambios normativos recientes y a la detección de omisiones.
    - **Fase 2: Evolución y Cobertura Total del Dominio.**
        - **Objetivo:** Implementar las capacidades avanzadas que nos permitirán optimizar y transformar la operación.
- **Contenido visual:** Una línea de tiempo simple mostrando dos grandes bloques: Fase 1 y Fase 2, con sus objetivos principales.

**9. Roadmap de Fase 1: Un Mapa Común para el Negocio**
- **Título:** Las 5 Capacidades para Reemplazar iSeries
- **Contenido en texto:** Para tener un mapa común, hemos organizado el trabajo en **Procesos de Negocio (PDN)** de punta a punta. Esto nos permite mostrar de forma clara cuándo terminamos el desarrollo de cada capacidad.
    1.  **Etapa 1: Fundamentos Técnicos y Herramientas.**
    2.  **Etapa 2: Modelo de Datos y Gobierno Normativo.**
    3.  **Etapa 3: Otorgamiento y Mantenimiento de Prestaciones.**
    4.  **Etapa 4: Ciclo de Pago Mensual.**
    5.  **Etapa 5: Integraciones y Reportería Clave.**
- **Contenido visual:** Un diagrama de flujo secuencial o una pila de bloques, donde cada bloque es una capacidad de negocio.

**10. Nuestro Compromiso con la Calidad**
- **Título:** Demostrando la Correctitud con Escenarios Reales
- **Contenido en texto:**
    - Usaremos una metodología basada en el testeo de escenarios de negocio reales.
    - Construiremos un **Dataset de Escenarios Reales (Golden Set)** que guiará el desarrollo de cada Proceso de Negocio.
    - Esto nos permitirá **demostrar formalmente** que la implementación es correcta y cumple con la lógica esperada.
- **Contenido visual:** Un ícono de un "sello de calidad" o una "marca de verificación" junto a una lista de escenarios de prueba.

**11. Etapa 1 y 2: Cimientos Sólidos**
- **Título:** Preparando el Terreno para el Éxito
- **Contenido en texto:**
    - **Objetivo:** Construir la base de datos, la lógica para manejar la normativa (`MarcoNormativo`) y las herramientas que nos permitirán desarrollar más rápido y con mayor calidad.
    - **Resultado Clave:** Una base técnica y de dominio robusta, lista para soportar las funcionalidades del negocio y su evolución futura.
- **Contenido visual:** Iconos representando una base de datos, un libro de reglas y herramientas de construcción.

**12. Etapa 3: Otorgamiento y Mantenimiento**
- **Título:** La Creación y Gestión de los Beneficios
- **Contenido en texto:**
    - **Objetivo:** Implementar la capacidad de crear nuevas prestaciones y gestionar sus cambios de estado básicos.
    - **Alcance Fase 1:** Nos enfocaremos en el otorgamiento simple, la gestión de cargas familiares y los acuerdos de pago (cobrantes, retenciones), que son críticos para la operación actual.
- **Contenido visual:** Un ícono de "nuevo documento" o "nuevo usuario" y otro de "engranaje" o "mantenimiento".

**13. Etapa 4: El Ciclo de Pago Mensual**
- **Título:** El Corazón Financiero del Sistema
- **Contenido en texto:**
    - **Objetivo:** Construir el motor que calcula y prepara las liquidaciones de pago cada mes.
    - **Alcance Fase 1:** Implementaremos el cálculo de liquidaciones individuales, el proceso masivo que las orquesta, y la lógica para reajustes por IPC y concurrencia básica.
- **Contenido visual:** Un ícono de calculadora o de un fajo de billetes, junto a un ícono de calendario.

**14. Etapa 5: Integraciones y Reportería**
- **Título:** Conectándonos con el Mundo
- **Contenido en texto:**
    - **Objetivo:** Asegurar que el sistema se comunique correctamente con las entidades externas clave.
    - **Alcance Fase 1:** Generaremos los archivos de pago para el **Banco**, cotizaciones para **PREVIRED**, contabilidad para **SAP**, el informe **GRIS** para SUSESO y la consulta al **Registro Civil**.
- **Contenido visual:** Logos de las entidades externas (Banco de Chile, PREVIRED, SAP, SUSESO, Registro Civil) conectados al logo del sistema PEC.

**15. La Experiencia del Usuario: Un Portal Moderno**
- **Título:** Una Nueva Herramienta para Nuestros Equipos
- **Contenido en texto:** No solo construiremos un backend potente, sino también un **Portal de Analistas** diseñado para la eficiencia y la claridad.
- **Contenido visual:** Un mockup o wireframe estilizado de la pantalla de `Dashboard` principal, mostrando widgets de tareas y KPIs.

**16. Vista Clave: La Ficha Persona 360°**
- **Título:** Toda la Información, en un Solo Lugar
- **Contenido en texto:** El corazón de la operación diaria. Una vista única que consolida todas las prestaciones, acuerdos de pago, expedientes y datos previsionales de una persona.
- **Contenido visual:** Un wireframe detallado de la `Vista FichaPersona`, destacando la cabecera con los datos del beneficiario y el sistema de pestañas (Resumen, Prestaciones, Acuerdos, etc.).

**17. Vista Clave: La Bandeja de Tareas Inteligente**
- **Título:** Priorizando lo Importante
- **Contenido en texto:** Una bandeja de trabajo que ordena las tareas (casos, aprobaciones, incidentes) por prioridad, permitiendo a los supervisores asignar y monitorear el trabajo del equipo eficientemente.
- **Contenido visual:** Un wireframe de la `Bandeja de Tareas`, mostrando la tabla de tareas con columnas como "Prioridad", "Asunto", "Asignado a" y los filtros.

**18. Primer Hito de Demostración**
- **Título:** Nuestro Foco Inicial: El "Camino Feliz"
- **Contenido en texto:**
    - Nuestra estrategia es entregar valor visible lo antes posible.
    - El primer gran hito será una **demostración funcional** de un flujo completo pero simple:
    - **Otorgar una pensión básica -> Calcular su liquidación mensual -> Verla en el Portal.**
    - Esto nos permitirá validar la arquitectura de punta a punta y obtener feedback temprano.
- **Contenido visual:** Un diagrama de flujo muy simple: [Caja: Otorgamiento] -> [Caja: Cálculo de Pago] -> [Caja: Visualización en Portal].

**19. Resumen**
- **Título:** Resumen de la Propuesta
- **Contenido en texto:**
    - **Visión:** Un sistema auditable, adaptable y que es la fuente única de verdad.
    - **Plan:** Un enfoque por fases y capacidades, priorizando el reemplazo de iSeries.
    - **Calidad:** Un compromiso con la correctitud a través de la prueba con escenarios reales.
    - **Colaboración:** Nuestro plan de acción inmediato se enfoca en la validación y el arranque del proyecto junto al negocio.
- **Contenido visual:** Cuatro íconos representando Visión, Plan, Calidad y Colaboración.

**20. Plan de Acción: Agosto y Septiembre**
- **Título:** Próximos Pasos Detallados
- **Contenido en texto:**
    - **Agosto: Talleres de Refinamiento y Kick-off**
        - 1. **Refinamiento del Modelo de Dominio (MDLO):** 4 reuniones de 90 min para pulir la especificación.
        - 2. **Ajuste Fino de la Planificación:** 2 reuniones de 90 min para acordar el detalle de épicas e hitos.
        - 3. **Iteración de Interfaces de Usuario:** 4 reuniones de 90 min para validar y mejorar los diseños del portal.
        - 4. **Actualización del Caso de Negocio:** 3 reuniones de 45 min para consolidar el caso.
        - 5. **Kick-off Técnico Interno:** Reunión de 60 min para presentar el plan al equipo de TI.
    - **Septiembre: Puesta en Marcha y Primer Hito**
        - 6. **Inicio de Capacidad Adicional:** Contratación y puesta en marcha del equipo de desarrollo externo.
        - 7. **Primer Hito de Demostración:** Muestra de la primera funcionalidad desarrollada y del estado de la interfaz de usuario.
- **Contenido visual:** Una línea de tiempo simple que abarca dos meses. En Agosto, se marcan los talleres. En Septiembre, se marcan el inicio del desarrollo y el primer hito de demo.

**21. Preguntas y Discusión**
- **Título:** Preguntas y Discusión
- **Contenido en texto:** (Ninguno)
- **Contenido visual:** Un diseño limpio con el título y el logo de la compañía.