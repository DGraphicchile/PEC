# Anexo: Guía Metodológica para Estimación y Planificación de Proyectos Basados en Dominio

**Versión:** 1.0
**Fecha:** 2025-08-06
**Propósito:** Proporcionar un marco de trabajo estandarizado y reutilizable para la estimación de esfuerzo y la planificación de proyectos de software complejos, cuya funcionalidad está definida por una especificación de dominio de negocio detallada (como un MDLO).

---

## 1. Introducción

Los proyectos de software basados en dominios de negocio complejos (financieros, seguros, logística, etc.) a menudo enfrentan un desafío fundamental: ¿cómo traducir una especificación funcional exhaustiva, con cientos de reglas y procesos, en un plan de desarrollo predecible y gestionable?

Esta guía presenta una metodología en seis pasos diseñada para cerrar esa brecha. Su objetivo es transformar una especificación de dominio en una **Descomposición de Trabajo (Work Breakdown Structure - WBS)** cuantificable, permitiendo una estimación de esfuerzo relativa, una secuenciación de tareas que mitigue los riesgos y una comunicación clara entre los stakeholders del proyecto.

---

## 2. Conceptos Fundamentales

La metodología se basa en dos conceptos clave para la cuantificación del trabajo.

### 2.1. Puntos de Complejidad de Componente (PCC)

El PCC es una métrica abstracta y relativa para estimar el esfuerzo. No se traduce directamente a horas-hombre, sino que se utiliza para comparar la complejidad entre diferentes tareas. Su propósito es proporcionar una base objetiva para la planificación.

Cada componente de software se evalúa en tres ejes, cada uno en una escala de 1 (muy bajo) a 5 (muy alto):

-   **Lógica (L):** La complejidad intrínseca del algoritmo o de las reglas de negocio que implementa.
-   **Dependencias (D):** El número y la complejidad de las dependencias (internas o externas) que el componente necesita para funcionar.
-   **Testing (T):** El esfuerzo requerido para escribir pruebas unitarias y de integración exhaustivas y significativas.

**Fórmula:** `PCC = Lógica + Dependencias + Testing` (Rango de 3 a 15 por componente).

### 2.2. Paquetes de Implementación

Un "Paquete" es la unidad de trabajo completa y vertical asociada a un artefacto de negocio (como una regla o un proceso). Este enfoque asegura que la estimación incluya no solo la implementación de la lógica principal, sino también sus pruebas, contratos de datos (DTOs) y configuración asociada. Esto previene la subestimación al hacer visible todo el trabajo requerido.

**Ejemplo de un Paquete de Proceso:**
-   `[nombre-proceso].service.ts` (La lógica de orquestación)
-   `[nombre-proceso].service.spec.ts` (Las pruebas unitarias y de integración)
-   `dto/[nombre-proceso].input.ts` (El contrato de datos de entrada)

---

## 3. La Metodología en 6 Pasos

### Paso 1: Análisis Cuantitativo del Dominio

**Objetivo:** Entender la magnitud del proyecto.
**Acción:** Realizar un inventario exhaustivo de todos los artefactos de negocio definidos en la especificación de dominio. Contar y categorizar:
-   Entidades de Dominio
-   Procesos de Negocio (PDN)
-   Reglas de Negocio (RDN)
-   Interfaces con Sistemas Externos
-   Escenarios de Verificación / Casos de Prueba

### Paso 2: Definición de los Paquetes de Implementación

**Objetivo:** Definir las unidades de trabajo estándar.
**Acción:** Basándose en la arquitectura elegida, definir qué archivos de código y pruebas constituyen un "Paquete" para cada tipo de artefacto del dominio (ej. Paquete de RDN, Paquete de PDN, Paquete de Integración).

### Paso 3: Calibración de la Métrica PCC

**Objetivo:** Crear un entendimiento compartido de la escala de complejidad.
**Acción:** El equipo técnico (liderado por el Arquitecto/Tech Lead) debe realizar una sesión de calibración. Deben tomar ejemplos concretos de la especificación y acordar qué constituye una tarea de Lógica 1, 3 o 5; de Dependencias 1, 3 o 5; y de Testing 1, 3 o 5. Este acuerdo es crucial para que las estimaciones sean consistentes entre los miembros del equipo.

### Paso 4: Estimación y Clasificación de Artefactos

**Objetivo:** Asignar una estimación de esfuerzo a cada unidad de trabajo.
**Acción:** Recorrer el inventario del Paso 1. Para cada artefacto, clasificarlo como Simple (S), Medio (M) o Complejo (C) y asignarle un valor de PCC basado en la calibración del Paso 3. El resultado es una lista completa de paquetes de trabajo con su complejidad relativa.

### Paso 5: Estructuración del Plan por "Vertical Slices"

**Objetivo:** Crear una hoja de ruta que mitigue los riesgos y entregue valor de forma incremental.
**Acción:** Agrupar los paquetes de trabajo estimados en fases que representen "porciones verticales" de funcionalidad. En lugar de fases por capas (ej. "Fase de Base de Datos"), se definen fases por capacidad de negocio (ej. "Fase de Ciclo de Pagos").
-   **Fase 0 (Fundación):** Siempre debe incluir la configuración del proyecto, la infraestructura como código, el CI/CD y las herramientas de prueba.
-   **Fases Siguientes:** Cada fase debe agrupar un conjunto coherente de PDNs, RDNs y las **integraciones de las que dependen**, culminando en la automatización de los escenarios de verificación correspondientes.

### Paso 6: Refinamiento y Monitoreo Continuo

**Objetivo:** Mantener el plan como un documento vivo y útil.
**Acción:** El plan y las estimaciones de PCC deben ser revisados al final de cada fase o de cada sprint. El equipo utilizará la velocidad real (PCC completados por sprint) para refinar las estimaciones de las fases futuras, mejorando la predictibilidad del proyecto a medida que avanza.

---

## 4. Ejemplo Práctico Simplificado

-   **Dominio:** Un sistema simple de "Gestión de Pedidos".
-   **Paso 1 (Análisis):** 2 PDN (`CrearPedido`, `CancelarPedido`), 3 RDN (`ValidarStock`, `CalcularTotal`, `ValidarCancelacion`), 1 Integración (`PasarelaDePago`).
-   **Paso 2 (Paquetes):** Se definen los paquetes de PDN, RDN e Integración.
-   **Paso 3 (Calibración):** El equipo acuerda la escala de PCC.
-   **Paso 4 (Estimación):**
    -   `PDN:CrearPedido`: Paquete Complejo (15 PCC)
    -   `PDN:CancelarPedido`: Paquete Simple (8 PCC)
    -   `RDN:ValidarStock`: Paquete Medio (9 PCC)
    -   `RDN:CalcularTotal`: Paquete Complejo (12 PCC)
    -   `INT:PasarelaDePago`: Paquete Complejo (14 PCC)
-   **Paso 5 (Plan por Slices):**
    -   **Fase 0:** Setup del proyecto, BBDD, CI/CD.
    -   **Fase 1 (Vertical Slice - Creación de Pedido):**
        -   Implementar el Paquete `PDN:CrearPedido`.
        -   Implementar los Paquetes `RDN:ValidarStock` y `RDN:CalcularTotal`.
        -   Implementar el Paquete `INT:PasarelaDePago` (porque `CrearPedido` depende de él).
        -   Automatizar la prueba E2E para la creación de un pedido.
    -   **Fase 2 (Vertical Slice - Cancelación):**
        -   Implementar el Paquete `PDN:CancelarPedido`.
        -   Implementar el Paquete `RDN:ValidarCancelacion`.

---

## 5. Conclusión

Esta metodología proporciona un proceso estructurado para abordar la complejidad inherente a los grandes proyectos de software basados en dominios de negocio. Al cuantificar el trabajo, secuenciarlo de manera inteligente y planificar el testing desde el inicio, los equipos pueden aumentar la predictibilidad, reducir los riesgos y, en última instancia, mejorar la probabilidad de entregar un producto de alta calidad a tiempo.
