# Simulación de Ejecución del Proyecto PEC (Versión Final y Definitiva)

**Fecha:** 2025-08-06
**Framework Base:** NestJS 11
**Propósito:** Servir como el documento técnico fundamental y autocontenido para la planificación y ejecución del proyecto de desarrollo del Sistema de Prestaciones Económicas (PEC), detallando la arquitectura, la descomposición del trabajo, la secuencia de implementación y la estimación de complejidad.

---

## 1. Principios y Supuestos de la Planificación

### 1.1. Principios de Planificación

La planificación se rige por los siguientes principios clave para maximizar la eficiencia y minimizar los riesgos:

1.  **Planificación por "Vertical Slices":** El proyecto se divide en porciones de funcionalidad vertical. Cada fase entrega una capacidad de negocio completa y testeable, incluyendo su lógica, integraciones y pruebas.
2.  **Infraestructura como Habilitador Inicial (Shift-Left):** Todas las tareas de infraestructura, contenerización y configuración del entorno de pruebas se realizan al inicio del proyecto (Fase 0).
3.  **Testing Continuo y Basado en Escenarios:** Las pruebas no son una fase final, sino una actividad continua. La implementación de los escenarios de negocio del `Anexo G` es un requisito de salida para cada porción de funcionalidad.
4.  **Seguridad por Diseño:** Las consideraciones de seguridad (autenticación, autorización, protección de datos sensibles) son parte integral del diseño de cada componente, no una ocurrencia tardía.

### 1.2. Supuestos y Exclusiones del Plan

Este plan se basa en los siguientes supuestos críticos:

-   **Gestión de Proyecto:** Se asume que existe un marco de gestión de proyectos ágil (ej. Scrum) que gestionará el backlog, las ceremonias y la comunicación con los stakeholders.
-   **Exclusión Explícita: Migración de Datos Legados:** Este plan **NO INCLUYE** el esfuerzo requerido para la migración de datos desde sistemas existentes. La migración de datos se considera un **proyecto separado y de alta complejidad** que debe ser analizado y planificado de forma independiente, con su propio equipo y cronograma.

---

## 2. Métrica de Complejidad y Metodología de Estimación por Rol

Para traducir el vasto alcance del MDLO en un plan de trabajo estimable, se utilizan dos conceptos clave: los **Paquetes de Implementación** y los **Puntos de Complejidad de Componente (PCC)**.

### 2.1. Puntos de Complejidad de Componente (PCC)

El PCC es una métrica abstracta y relativa para estimar el esfuerzo requerido para completar un componente de software. **No se traduce directamente a horas o días**, sino que sirve para comparar la complejidad entre diferentes tareas. Un componente de 10 PCC se estima que requerirá aproximadamente el doble de esfuerzo que uno de 5 PCC.

Cada componente se evalúa en tres ejes, cada uno en una escala de 1 (muy bajo) a 5 (muy alto):

-   **Lógica (L):** La complejidad intrínseca del algoritmo o de las reglas de negocio.
-   **Dependencias (D):** El número y la complejidad de las dependencias que el componente necesita para funcionar.
-   **Testing (T):** El esfuerzo requerido para escribir pruebas unitarias y de integración exhaustivas y significativas.

**Fórmula:** `PCC = Lógica + Dependencias + Testing` (Rango de 3 a 15 por componente principal).

### 2.2. Paquetes de Implementación y Justificación de PCC

Un "Paquete" es la unidad de trabajo completa y vertical asociada a un artefacto del MDLO. A continuación se detalla cada tipo de paquete y cómo se llega a su estimación de PCC.

#### **Paquete de RDN (Regla de Negocio)**
-   **Descripción:** La unidad más pequeña de lógica de negocio. Incluye el servicio de la regla y su prueba unitaria (`.spec.ts`).
-   **PCC Estimado:** Simple: 6, Medio: 9, Complejo: 12.
-   **Justificación de la Estimación:**
    -   **Simple (6 PCC):** Corresponde a una regla con lógica directa y pocas dependencias. **Ejemplo:** `VALID-ACUERDO-001` (Vigencia de Mandato). **Desglose:** L(2) - comparación de fechas; D(2) - necesita el objeto `AcuerdoDePago`; T(2) - se prueba con un caso válido y uno inválido. **Total: 6**.
    -   **Medio (9 PCC):** Una regla con lógica condicional o que requiere consultar datos adicionales. **Ejemplo:** `VALID-OTORG-001` (Verificación de Cotizaciones). **Desglose:** L(4) - debe iterar sobre un historial de cotizaciones; D(2) - necesita el historial de la persona; T(3) - requiere probar múltiples escenarios (sin cotizaciones, algunas, todas). **Total: 9**.
    -   **Complejo (12 PCC):** Una regla con un algoritmo de cálculo complejo. **Ejemplo:** `CALC-OTG-001` (Cálculo de Sueldo Base). **Desglose:** L(5) - involucra promedios, amplificación, manejo de lagunas y subsidios; D(3) - necesita historial de rentas y subsidios; T(4) - requiere múltiples casos de prueba para cubrir todas las casuísticas. **Total: 12**.

#### **Paquete de PDN (Proceso de Negocio)**
-   **Descripción:** Un orquestador de EDNs y RDNs. Incluye el servicio del proceso, su prueba de integración y los DTOs necesarios.
-   **PCC Estimado:** Simple: 8, Medio: 12, Complejo: 15.
-   **Justificación de la Estimación:**
    -   **Simple (8 PCC):** Un proceso lineal con pocos pasos. **Ejemplo:** `PDN-MANT-010` (Cese por Nuevo Vínculo). **Desglose:** L(3) - orquesta 3-4 pasos (buscar, validar, actualizar, notificar); D(3) - depende de una RDN y del repositorio de BBDD; T(2) - la prueba de integración es directa. **Total: 8**.
    -   **Medio (12 PCC):** Un proceso que orquesta múltiples RDNs y tiene lógica condicional. **Ejemplo:** `PDN-OTG-002` (Otorgamiento y Activación). **Desglose:** L(4) - orquesta validaciones, cálculos y actualizaciones; D(4) - depende de múltiples RDNs y del `PdnFactory`; T(4) - la prueba requiere un setup de datos más complejo. **Total: 12**.
    -   **Complejo (15 PCC):** Un orquestador de alto nivel con manejo de errores, procesamiento en lotes o múltiples dependencias críticas. **Ejemplo:** `PDN-PAG-001` (Ciclo de Pago Mensual). **Desglose:** L(5) - lógica de batching, manejo de errores individuales; D(5) - depende de otros PDNs, RDNs y servicios de integración; T(5) - la prueba E2E es extremadamente compleja. **Total: 15**.

#### **Paquete de Integración**
-   **Descripción:** Un servicio para comunicarse con un sistema externo. Incluye el servicio, su prueba (con mocks) y DTOs.
-   **PCC Estimado:** Medio: 10, Complejo: 14.
-   **Justificación de la Estimación:**
    -   **Medio (10 PCC):** Integración con una API REST bien definida. **Desglose:** L(3) - mapeo de datos y DTOs; D(3) - depende del cliente HTTP y configuración; T(4) - requiere mocking del API externo y manejo de errores de red. **Total: 10**.
    -   **Complejo (14 PCC):** Integración basada en archivos (SFTP, CSV). **Ejemplo:** `Integración PREVIRED`. **Desglose:** L(4) - lógica compleja de formato de archivo, parsing/generación; D(5) - depende de librerías SFTP, del sistema de archivos, posiblemente de encriptación; T(5) - las pruebas son difíciles, requieren manejar archivos físicos o streams y un setup complejo. **Total: 14**.

### 2.3. Metodología de Estimación por Rol

El cálculo del esfuerzo total se realiza siguiendo un modelo híbrido:

1.  **Separación de Tareas Especializadas:** Las tareas que requieren un rol específico (DevOps, DBA, QA) se separan del backlog general de desarrollo y se planifican en "pistas" (swimlanes) paralelas. Su esfuerzo se calcula en función de los recursos asignados a esos roles.

2.  **Estimación para el Equipo de Desarrollo Generalista:** Para el gran volumen de paquetes (PDN, RDN), se aplica un **"Factor de Equipo Combinado"** que ajusta la estimación basada en la composición y experiencia general del equipo de desarrollo backend.
    -   **Línea Base:** Un equipo equilibrado tiene un factor de **1.0**.
    -   **Factor Asumido para este Proyecto:** Considerando un equipo con una mayoría de desarrolladores Senior y Mid-level, se asume un **Factor de Equipo de 1.1** (el equipo es, en conjunto, un 10% más eficiente que la línea base).

3.  **Fórmula de Esfuerzo (Días-Persona):**
    `DíasReales = (TotalPCC / PCC_por_Día_Ideal) / FactorDeFoco / FactorDeEquipo`
    -   **PCC por Día Ideal:** Se establece en **3 PCC** (un desarrollador Mid ideal puede completar 3 puntos al día).
    -   **Factor de Foco:** Se establece en **0.65** (considera reuniones, etc.).

---

## 3. Desglose Detallado de Fases del Proyecto

### Fase 0: Fundación Arquitectónica, de Infraestructura y Testing (Sprints 0-3)

**Objetivo:** Construir el esqueleto de la aplicación, la infraestructura como código (IaC), la contenerización y las herramientas de prueba. Esta fase es crítica y establece el entorno de desarrollo y CI/CD completo.

| Pista de Rol | Artefacto Generado | L | D | T | **PCC** | Notas |
| :--- | :--- | :-: | :-: | :-: | :---: | :--- |
| **DBA/Data Eng.** | `prisma/schema.prisma` | 5 | 5 | 5 | **15** | Tarea de máxima complejidad y crítica. |
| **Tech Lead/Arq.** | `pdn-factory.provider.ts` | 5 | 5 | 5 | **15** | Diseño y validación del patrón de orquestación. |
| **Tech Lead/Arq.** | `sna.service.ts` | 4 | 2 | 4 | **10** | Diseño del sistema de configuración normativa. |
| **DevOps** | `infrastructure/` (IaC) | 4 | 4 | 4 | **12** | Creación de la infraestructura base. |
| **DevOps** | `Dockerfile`, `docker-compose.dev.yml` | 3 | 3 | 3 | **9** | Contenerización del entorno de desarrollo. |
| **DevOps** | `.github/workflows/ci.yml` | 2 | 3 | 3 | **8** | Creación del pipeline de CI. |
| **QA/SDET** | `testing/factories/`, `test-utils.module.ts` | 4 | 4 | 3 | **11** | Creación de las herramientas para pruebas. |

**Complejidad Total de la Fase 0: 80 PCC** (distribuida entre roles especializados)

---

### Fase 1: MVP - Flujo de Otorgamiento y Datos Fundamentales (Sprints 4-7)

**Objetivo:** Implementar un flujo completo de otorgamiento, validando la arquitectura contra una integración de datos real y crítica desde el inicio para mitigar riesgos.

| Pista de Rol | Artefacto Generado | Tipo | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Backend Dev** | Integración PREVIRED/SII | Paquete INT | C | **14** | **Adelantada.** Crítica para obtener rentas y validar cotizaciones. |
| **Backend Dev** | `PDN-OTG-001`, `PDN-OTG-002` | Paquete PDN | C, M | **27** | Implementación de los procesos. |
| **Backend Dev** | `CALC-OTG-001`, `VALID-OTORG-001` | Paquete RDN | C, M | **21** | Implementación de las reglas sobre datos reales. |
| **Backend Dev** | `otorgamiento.controller.ts` | Controller | S | **6** | Exposición de la API. |
| **QA/SDET** | `otorgamiento-indemnizacion.e2e-spec.ts` | Prueba E2E | C | **14** | Prueba de aceptación automatizada. |

**Complejidad Total de la Fase 1: 82 PCC**

---

### Fase 2: Vertical Slice - Pagos, Cotizaciones y Descuentos (Sprints 8-12)

**Objetivo:** Implementar el ciclo de pago mensual completo, incluyendo la generación de cotizaciones y la aplicación de descuentos de terceros.

| Categoría MDLO | Cantidad | Complejidad (S/M/C) | PCC x Cat. | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Pagos (PAG)** | 10 | 2S, 6M, 2C | **116** | Implementa el core de la funcionalidad de pagos. |
| **RDN de Pagos (PLI/PIM)** | ~13 | 3S, 5M, 5C | **123** | Contiene la lógica de cálculo esencial para los pagos. |
| **Integración Banco** | 1 | Paquete INT (M) | **10** | Necesaria para la generación de nóminas de pago. |
| **Integraciones (CCAF, FONASA)** | 2 | Paquete INT (M) | **20** | **Adelantadas.** Para aplicar descuentos de terceros en la liquidación. |

**Complejidad Total de la Fase 2: 269 PCC**

---

### Fase 3: Vertical Slice - Mantenimiento del Ciclo de Vida (Sprints 13-18)

**Objetivo:** Implementar los procesos clave de mantenimiento de prestaciones, asegurando que el estado de los beneficios pueda evolucionar correctamente en el tiempo.

| Categoría MDLO | Cantidad | Complejidad (S/M/C) | PCC x Cat. | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Mantenimiento (MANT)** | 17 | 8S, 7M, 2C | **178** | El mayor volumen de procesos, que definen el ciclo de vida. |
| **RDN de Mantenimiento (CICLO/MANT)** | 6 | 2S, 3M, 1C | **51** | Lógica de cese, reajuste, etc. |
| **Integración Registro Civil** | 1 | Paquete INT (M) | **10** | Esencial para los PDN de cese por fallecimiento. |
| **Integración SIVEGAM** | 1 | Paquete INT (C) | **14** | Necesaria para la sincronización de cargas familiares. |

**Complejidad Total de la Fase 3: 253 PCC**

---

### Fase 4: Vertical Slice - Gobernanza, Finanzas y Correcciones (Sprints 19-22)

**Objetivo:** Implementar los flujos de intervención humana, los procesos financieros y los casos de borde, que son complejos y requieren validación temprana.

| Categoría MDLO | Cantidad | Complejidad (S/M/C) | PCC x Cat. | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN Financiero/Corrección (FIN/COR)** | 8 | 1S, 3M, 4C | **104** | Aborda la lógica de concurrencia y reversión. |
| **PDN de Gobernanza (GOB)** | 1 | Paquete PDN (C) | **15** | Se introduce una vez que existen procesos core. |
| **Integración SAP** | 1 | Paquete INT (C) | **14** | Se implementa junto a los procesos financieros. |
| **QA/SDET** | 1 | Prueba E2E (C) | **15** | Prueba de flujos de excepción y corrección. |

**Complejidad Total de la Fase 4: 148 PCC**

---

### Fase 5: Reportería, Pruebas Avanzadas y Preparación para Producción (Sprints 23-27)

**Objetivo:** Completar la funcionalidad de reportería y realizar las pruebas no funcionales y de regresión finales para asegurar que el sistema esté listo para producción.

| Categoría MDLO | Cantidad | Complejidad (S/M/C) | PCC x Cat. | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Reportería (REP)** | 4 | 1M, 3C | **57** | Se implementan al final, ya que dependen de datos correctos. |
| **Pruebas de Carga y Rendimiento** | N/A | Scripting (C) | **11** | Se realizan sobre un sistema funcionalmente completo. |
| **Pruebas de Seguridad** | N/A | Análisis (M) | **9** | Se realizan sobre un sistema con todas sus integraciones. |
| **Documentación de Despliegue** | N/A | Documento (M) | **9** | El "Runbook" final para el equipo de operaciones. |

**Complejidad Total de la Fase 5: 86 PCC**

---

### Fase 6: Estabilización y Soporte Post-Lanzamiento (Sprints 28-29)

**Objetivo:** Asegurar una transición suave a producción, monitorear la salud del sistema, resolver incidentes críticos rápidamente y transferir el conocimiento al equipo de operaciones.

| Pista de Rol | Tarea | L | D | T | **PCC** | Notas |
| :--- | :--- | :-: | :-: | :-: | :---: | :--- |
| **DevOps/SRE** | Configuración de Monitoreo y Alertas | 4 | 4 | 3 | **11** | Configuración de dashboards y alertas para métricas clave. |
| **Equipo Core** | Soporte de Hiper-cuidado (Hypercare) | 4 | 4 | 4 | **12** | Disponibilidad para resolver incidentes críticos post-lanzamiento. |
| **Tech Lead/Arq.** | Sesiones de Traspaso de Conocimiento | 3 | 2 | 1 | **6** | Formación para el equipo de soporte/operaciones. |
| **QA/SDET** | Refinamiento del Set de Pruebas de Regresión | 3 | 3 | 3 | **9** | Actualizar y estabilizar las pruebas E2E contra producción. |

**Complejidad Total de la Fase 6: 38 PCC**

---

## 4. Resumen de Complejidad y Conclusión Final

-   **Fase 0 (Fundación):** 80 PCC
-   **Fase 1 (MVP y Datos):** 82 PCC
-   **Fase 2 (Pagos y Descuentos):** 269 PCC
-   **Fase 3 (Mantenimiento):** 253 PCC
-   **Fase 4 (Gobernanza y Finanzas):** 148 PCC
-   **Fase 5 (Reportería/Pruebas):** 86 PCC
-   **Fase 6 (Estabilización):** 38 PCC

**Complejidad Total Estimada del Proyecto: ~956 PCC**

Este plan de ejecución representa una visión completa y exhaustiva del ciclo de vida del proyecto, desde la concepción hasta la operación estable. Al declarar explícitamente las exclusiones (migración de datos) y planificar la fase post-lanzamiento, se proporciona a los stakeholders una visión transparente de los verdaderos límites y requisitos del proyecto. Esta simulación constituye una base sólida y de riesgo mitigado para la creación del backlog detallado, la asignación de recursos y la gestión exitosa del proyecto PEC.
