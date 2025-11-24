# Especificación de Solución y Plan de Ejecución del Proyecto PEC (Versión Unificada)

**Fecha:** 2025-08-06
**Framework Base:** NestJS 11
**Propósito:** Servir como el documento técnico fundamental y autocontenido para la planificación y ejecución del proyecto, unificando la especificación arquitectónica con un plan de trabajo detallado, secuenciado y cuantificado.

---

## 1. Resumen Ejecutivo y Principios de Planificación

### 1.1. Resumen Ejecutivo

Este documento consolida la especificación técnica y el plan de ejecución para el Sistema de Prestaciones Económicas (PEC). Se ha seleccionado **NestJS 11** como framework base. El plan de trabajo se estructura en **"Vertical Slices"** para mitigar riesgos y entregar valor de forma incremental, y se cuantifica utilizando una metodología de estimación detallada.

### 1.2. Principios de Planificación

1.  **Planificación por "Vertical Slices":** El proyecto se divide en porciones de funcionalidad vertical y testeable.
2.  **Infraestructura como Habilitador Inicial (Shift-Left):** Las tareas de infraestructura y entorno se realizan en la Fase 0.
3.  **Testing Continuo y Basado en Escenarios:** Las pruebas son una actividad continua, no una fase final.
4.  **Seguridad por Diseño:** Las consideraciones de seguridad son parte integral del diseño.

### 1.3. Supuestos y Exclusiones del Plan

-   **Gestión de Proyecto:** Se asume un marco de gestión ágil compatible con desarrollo por vertical slices.
-   **Base Documental:** El plan se alinea completamente con el MDLO_v1 como fuente única de verdad del dominio de negocio.
-   **Exclusión Explícita: Migración de Datos Legados:** Este plan **NO INCLUYE** el esfuerzo de migración de datos, que se considera un proyecto separado.
-   **Principios de Dominio:** Se implementarán los principios de Inmutabilidad, Auditabilidad, Trazabilidad Completa y Gestión de la Evolución Normativa definidos en el MDLO.

---

## 2. Arquitectura de la Solución

-   **Framework:** NestJS 11
-   **Principios:** Arquitectura Modular, Domain-Driven Design (DDD), Clean Architecture alineada con el MDLO_v1.
-   **ORM:** Prisma (por su seguridad de tipos y compatibilidad con el modelo de entidades del MDLO).
-   **Configuración Normativa:** Los Snapshots Normativos (SNA) se implementarán como archivos de configuración versionados para gestionar la evolución normativa.
-   **Módulos Principales por Dominio MDLO:** 
  - `OtorgamientoModule` (PDN-OTG-001 a PDN-OTG-006)
  - `MantenimientoModule` (PDN-MANT-001 a PDN-MANT-020) 
  - `PagosModule` (PDN-PAG-001 a PDN-PAG-010)
  - `ReporteriaModule` (PDN-REP-001 a PDN-REP-004)
  - `GobernanzaModule` (PDN-GOB-001, gestión de incidentes de dominio)
  - `IntegracionesModule` (todas las interfaces INT-*)
  - `ReglasModule` (implementación de todas las RDN por categoría)

---

## 3. Metodología de Estimación y Planificación

### 3.1. Puntos de Complejidad de Componente (PCC)

El PCC es una métrica abstracta y relativa para estimar el esfuerzo. Se calcula como `PCC = Lógica + Dependencias + Testing` (rango 3-15).

### 3.2. Paquetes de Implementación y Justificación de PCC

Un "Paquete" es la unidad de trabajo completa (código, pruebas, DTOs) asociada a un artefacto del MDLO.

-   **Paquete de RDN (Regla de Negocio):** PCC Estimado: Simple: 6, Medio: 9, Complejo: 12.
-   **Paquete de PDN (Proceso de Negocio):** PCC Estimado: Simple: 8, Medio: 12, Complejo: 15.
-   **Paquete de Integración:** PCC Estimado: Medio: 10, Complejo: 14.

### 3.3. Metodología de Estimación por Rol

Se utiliza un modelo híbrido con "pistas" para roles especializados y un "Factor de Equipo Combinado" para el equipo de desarrollo generalista.

---

## 4. Desglose Detallado de Fases del Proyecto

### Fase 0: Fundación Arquitectónica, de Infraestructura y Testing (Sprints 0-3)

**Objetivo:** Construir el esqueleto de la aplicación, la infraestructura como código (IaC), la contenerización y las herramientas de prueba.

| Pista de Rol | Artefacto Generado | L | D | T | **PCC** | Notas |
| :--- | :--- | :-: | :-: | :-: | :---: | :--- |
| **DBA/Data Eng.** | `prisma/schema.prisma` | 5 | 5 | 5 | **15** | Tarea de máxima complejidad y crítica. |
| **Tech Lead/Arq.** | `pdn-factory.provider.ts` | 5 | 5 | 5 | **15** | Diseño y validación del patrón de orquestación. |
| **Tech Lead/Arq.** | `sna.service.ts` | 4 | 2 | 4 | **10** | Diseño del sistema de configuración normativa. |
| **DevOps** | `infrastructure/` (IaC) | 4 | 4 | 4 | **12** | Creación de la infraestructura base. |
| **DevOps** | `Dockerfile`, `docker-compose.dev.yml` | 3 | 3 | 3 | **9** | Contenerización del entorno de desarrollo. |
| **DevOps** | `.github/workflows/ci.yml` | 2 | 3 | 3 | **8** | Creación del pipeline de CI. |
| **QA/SDET** | `testing/factories/`, `test-utils.module.ts` | 4 | 4 | 3 | **11** | Creación de las herramientas para pruebas. |

**Complejidad Total de la Fase 0: 80 PCC**

---

### Fase 1: MVP - Flujo de Otorgamiento (Sprints 4-7)

**Objetivo:** Implementar un flujo completo de otorgamiento, validando la arquitectura con procesos específicos del MDLO.

| Pista de Rol | Artefacto Generado | Tipo | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Backend Dev** | `PDN-OTG-001: Consolidación de Rentas` | Paquete PDN | C | **15** | Recopila y calcula el sueldo base para determinar beneficio. |
| **Backend Dev** | `PDN-OTG-002: Otorgamiento y Activación` | Paquete PDN | M | **12** | Formaliza y activa un beneficio económico aprobado. |
| **Backend Dev** | `CALC-OTG-001`, `CALC-OTG-002` | Paquete RDN | C, M | **21** | Cálculo de Sueldo Base y Pensiones de Sobrevivencia. |
| **Backend Dev** | `VALID-OTORG-001`, `VALID-OTORG-002` | Paquete RDN | M, M | **18** | Validaciones de cotizaciones y funcionarios públicos. |
| **Backend Dev** | `otorgamiento.controller.ts` | Controller | S | **6** | Exposición de la API. |
| **QA/SDET** | `otorgamiento-indemnizacion.e2e-spec.ts` | Prueba E2E | C | **14** | Prueba de aceptación automatizada. |

**Complejidad Total de la Fase 1: 86 PCC**

---

### Fase 2: Vertical Slice - Pagos y Cotizaciones (Sprints 7-11)

**Objetivo:** Implementar el ciclo de pago mensual completo según los procesos definidos en el MDLO.

| Categoría MDLO | Artefactos Específicos | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Pagos (PAG)** | `PDN-PAG-001` a `PDN-PAG-010` | 2S, 6M, 2C | **116** | Ciclo completo, cálculo imponible/líquido, nóminas, reajustes. |
| **RDN de Cálculo (CALC-PIM)** | `CALC-PIM-001` a `CALC-PIM-005` | 1S, 3M, 1C | **44** | Bonificaciones, Gran Invalidez, Asignación Familiar. |
| **RDN de Cálculo (CALC-PLI)** | `CALC-PLI-001` a `CALC-PLI-011` | 6S, 4M, 1C | **68** | Descuentos, haberes, retenciones, días exactos. |
| **RDN de Mantenimiento** | `CALC-MANT-001` a `CALC-MANT-003` | 1S, 2M | **21** | Reajuste IPC, reevaluaciones, sobrevivencia. |
| **Integración PREVIRED** | `INT-PREVIRED-001` | Paquete INT (C) | **14** | Pago de cotizaciones previsionales. |
| **Integración Banco** | `INT-BCH-001` | Paquete INT (M) | **10** | Nómina de pagos mensual. |

**Complejidad Total de la Fase 2: 273 PCC**

---

### Fase 3: Vertical Slice - Mantenimiento del Ciclo de Vida (Sprints 12-17)

**Objetivo:** Implementar los procesos de mantenimiento según el catálogo completo del MDLO.

| Categoría MDLO | Artefactos Específicos | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN Mantenimiento Críticos** | `PDN-MANT-001` a `PDN-MANT-010` | 4S, 5M, 1C | **82** | Ceses, suspensiones, reactivaciones, reevaluaciones. |
| **PDN Mantenimiento Avanzados** | `PDN-MANT-011` a `PDN-MANT-020` | 4S, 4M, 2C | **86** | Sobrevivencia, AFP/Isapre, transitorias, intervención. |
| **RDN de Validación (VALID-MANT)** | `VALID-MANT-001`, `VALID-MANT-002` | S, M | **15** | Certificados estudios, reevaluaciones Gran Invalidez. |
| **RDN de Validación (VALID-ACUERDO)** | `VALID-ACUERDO-001` a `VALID-ACUERDO-003` | S, S, M | **18** | Poderes notariales, cobradores, retenciones. |
| **RDN de Ciclo de Vida** | `CICLO-INAC-001`, `CICLO-INAC-002`, `CICLO-CESE-001` | S, S, M | **21** | Transiciones automáticas de estado. |
| **RDN de Comunicación** | `COMM-MANT-001` | S | **6** | Notificaciones preventivas de cese. |
| **Integración Registro Civil** | `INT-REGCIVIL-001` | Paquete INT (M) | **10** | Verificación supervivencia y estado civil. |
| **Integración SIVEGAM** | `INT-SIVEGAM-001` | Paquete INT (C) | **14** | Reportería Asignación Familiar. |

**Complejidad Total de la Fase 3: 252 PCC**

---

### Fase 4: Vertical Slice - Gobernanza, Finanzas y Correcciones (Sprints 18-22)

**Objetivo:** Implementar procesos financieros, correcciones y gobernanza según especificación MDLO.

| Categoría MDLO | Artefactos Específicos | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Corrección (COR)** | `PDN-COR-001` a `PDN-COR-004` | S, M, C, M | **41** | Reliquidaciones, dictámenes, reversiones, rechazos SIVEGAM. |
| **PDN Financieros (FIN)** | `PDN-FIN-001` a `PDN-FIN-004` | 2M, 2C | **54** | Concurrencias, cobranzas, compensaciones. |
| **PDN de Gobernanza (GOB)** | `PDN-GOB-001` | Paquete PDN (C) | **15** | Gestión de Incidentes de Dominio. |
| **RDN de Cálculo Financiero** | `CALC-FIN-001`, `CALC-REP-001` | M, S | **15** | Prorrata concurrencia, pension capital GRIS. |
| **RDN de Cumplimiento** | `CUMP-OTORG-001` a `CUMP-PAG-001` | 7 reglas S/M | **49** | Plazos otorgamiento, prescripciones, reembolsos. |
| **RDN de Verificación Humana** | `VERF-GOB-001` | M | **9** | Aprobación planes de acción incidentes. |
| **Integraciones Externas** | `INT-SAP-001`, `INT-CCAF-001`, `INT-FONASA-001` | M, M, M | **30** | Contabilización, descuentos CCAF, préstamos FONASA. |

**Complejidad Total de la Fase 4: 213 PCC**

---

### Fase 5: Reportería, Monitoreo y Preparación para Producción (Sprints 23-27)

**Objetivo:** Completar reportería regulatoria, procesos de monitoreo y pruebas no funcionales.

| Categoría MDLO | Artefactos Específicos | Complejidad | **PCC** | Notas |
| :--- | :--- | :--- | :---: | :--- |
| **PDN de Reportería (REP)** | `PDN-REP-001` a `PDN-REP-004` | 1M, 3C | **57** | Informes SUSESO, IPS, SIVEGAM, GRIS R01. |
| **PDN de Monitoreo (MON)** | `PDN-MON-001` a `PDN-MON-008` | 4S, 3M, 1C | **66** | SLA otorgamiento, IPC, edad, Registro Civil. |
| **RDN de Mapeo y Validación** | `MAP-REP-001`, `VALID-PAGO-001`, `VALID-PAGO-002` | S, M, M | **21** | Homologación códigos, aguinaldo, bono invierno. |
| **Integración IPS** | `INT-IPS-001`, `INT-IPS-002` | Paquete INT (M, M) | **20** | Beneficios estatales PGU, consulta bonos. |
| **Pruebas de Carga y Rendimiento** | N/A | Scripting (C) | **11** | Pruebas sobre sistema completo. |
| **Pruebas de Seguridad** | N/A | Análisis (M) | **9** | Análisis sobre integraciones completas. |
| **Documentación de Despliegue** | N/A | Documento (M) | **9** | Runbook operacional. |

**Complejidad Total de la Fase 5: 193 PCC**

---

### Fase 6: Estabilización y Soporte Post-Lanzamiento (Sprints 28-29)

**Objetivo:** Asegurar una transición suave a producción, monitorear la salud del sistema y transferir el conocimiento.

| Pista de Rol | Tarea | L | D | T | **PCC** | Notas |
| :--- | :--- | :-: | :-: | :-: | :---: | :--- |
| **DevOps/SRE** | Configuración de Monitoreo y Alertas | 4 | 4 | 3 | **11** | Configuración de dashboards y alertas. |
| **Equipo Core** | Soporte de Hiper-cuidado (Hypercare) | 4 | 4 | 4 | **12** | Disponibilidad para resolver incidentes críticos. |
| **Tech Lead/Arq.** | Sesiones de Traspaso de Conocimiento | 3 | 2 | 1 | **6** | Formación para el equipo de soporte. |
| **QA/SDET** | Refinamiento del Set de Pruebas de Regresión | 3 | 3 | 3 | **9** | Actualizar y estabilizar las pruebas E2E. |

**Complejidad Total de la Fase 6: 38 PCC**

---

## 5. Resumen de Complejidad y Conclusión Final

### 5.1. Complejidad por Fase (Actualizada según MDLO_v1)

-   **Fase 0 (Fundación):** 80 PCC
-   **Fase 1 (MVP - Otorgamiento):** 86 PCC
-   **Fase 2 (Pagos y Cotizaciones):** 273 PCC
-   **Fase 3 (Mantenimiento):** 252 PCC
-   **Fase 4 (Gobernanza/Finanzas):** 213 PCC
-   **Fase 5 (Reportería/Monitoreo):** 193 PCC
-   **Fase 6 (Estabilización):** 38 PCC

**Complejidad Total Estimada del Proyecto: ~1,135 PCC**

### 5.2. Cobertura Funcional según MDLO_v1

El plan actualizado cubre completamente:
- **109 Procesos de Negocio (PDN):** Distribuidos en 8 categorías funcionales del MDLO
- **104+ Reglas de Negocio (RDN):** Incluyendo validaciones, cálculos, mapeo, ciclo de vida, cumplimiento, comunicación y verificación humana
- **11 Interfaces Externas:** Cubriendo todas las integraciones críticas con IPS, SUSESO/SIVEGAM, Registro Civil, Banco, PREVIRED, SAP, FONASA y CCAF

### 5.3. Conclusión Final

Este plan de ejecución unificado representa la especificación más precisa y completa del proyecto PEC, basada directamente en la documentación oficial del MDLO_v1. La arquitectura propuesta con NestJS 11 es compatible con la complejidad del dominio y proporciona una base sólida para implementar todos los artefactos del modelo de negocio de manera trazable y auditable.