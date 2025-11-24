# Plan de Desarrollo del Sistema (Ideal)

Este plan estructura la entrega en vertical slices de punta a punta, basados en `version_actual/MDLO_v1` y su catálogo de procesos (`PDN`), reglas (`RDN`), integraciones (`INT`), reportería (`IR`) y escenarios de verificación (`EV`).

## 1. Visión y objetivos
- **Propósito**: habilitar un sistema de prestaciones económicas conforme a Compendio Libro VI, con operación eficiente, auditable y resiliente.
- **Metas**: tiempo de salida a producción por incrementos, cumplimiento regulatorio, calidad de pagos y reportería, trazabilidad total.
- **Criterios de éxito**: SLAs de otorgamiento y pago, cero rechazos críticos en reportes, auditoría completa por caso, satisfacción de usuarios.

## 2. Principios de entrega
- **Vertical slices end-to-end**: cada etapa cierra el ciclo de negocio desde datos de entrada hasta pago y reportería.
- **Prioridad por valor regulatorio/operacional**: primero lo que paga y lo que reporta.
- **Deuda técnica controlada**: normas de arquitectura, pruebas y observabilidad por etapa.

## 3. Arquitectura base y cimientos
- **Dominio canónico**: `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `LiquidacionDePago`, `ConceptoLiquidacion`, `AcuerdoDePago`, `MetodoDePago`, `ConfiguracionDescuento`, `ComprobanteContable` (ver `04_Modelo_de_Entidades.md`).
- **Motor de reglas**: soporte a `VALID`, `CALC`, `CICLO`, `COMM`, `CUMP` (ver `06_Reglas_de_Negocio.md`).
- **Orquestador de procesos**: flujos `PDN` (ver `05_Procesos_de_Negocio.md`).
- **Integraciones**: adaptadores para `INT-*` (ver `07_Interfaces_Externas.md`).
- **Observabilidad y auditoría**: bitácora de decisiones de dominio, métricas de negocio, trazabilidad (`13_Matriz_de_Trazabilidad.md`).
- **CI/CD y seguridad**: despliegues versionados por ventanas normativas, control de acceso por rol, cifrado en tránsito y reposo.

## 4. Gobierno de datos y normativa
- **Snapshots normativos**: `12_Historia_Normativa_Snapshots.md`.
- **Catálogo de informes**: `11_Informes_Regulatorios.md`.
- **Matriz de trazabilidad**: `13_Matriz_de_Trazabilidad.md`.

## 5. Plan por etapas (vertical slices)
Para cada etapa se define objetivo, alcance PDN/RDN, entidades, integraciones INT, informes IR, escenarios EV, supuestos, no alcance, métricas/DoD, riesgos y mitigaciones.

### Etapa 0 — Plataforma y Dominio Mínimo Viable
- **Objetivo**: cimientos listos para operar vertical slices.
- **Entidades**: `Persona`, `FichaPersona`, `HechoCausal`, `PrestacionEconomica`, `LiquidacionDePago`, `ConceptoLiquidacion`.
- **Capacidades**: motor de reglas, orquestador, auditoría, bitácora, users/roles.
- **DoD**: preproducción operativa, observabilidad básica, hardening inicial.

### Etapa 1 — Otorgamiento titular dependiente simple (punta a punta)
- **PDN**: `PDN-OTG-001`, `PDN-OTG-002`, `PDN-PAG-008`, `PDN-PAG-009`, `PDN-PAG-010`, `PDN-REP-001`.
- **RDN**: `CALC-OTG-001`, `CALC-PLI-001`, `CALC-PLI-002`, `VALID-OTORG-*`.
- **INT**: `INT-BCH-001` (nómina banco) mínimo, `INT-SAP-001`, `INT-PREVIRED-001` básico.
- **IR**: `IR-SUSESO-001`.
- **EV**: `OTG-EVP-001`, `PAGO-EVP-001`, `PAGO-EVL-001`, `PAGO-EVL-002`, `PAGO-EVP-005`.
- **Resultado**: constitución, liquidación, pago y contabilización para caso simple de trabajador dependiente.

### Etapa 2 — Sobrevivencia con múltiples beneficiarios
- **PDN**: `PDN-OTG-006`, `PDN-PAG-002`, `PDN-PAG-003`, `PDN-MANT-012`.
- **RDN**: `CALC-OTG-002`, `CALC-PLI-005`, `CALC-MANT-003`, `VALID-SOBREV-001`.
- **INT/IR**: mantiene `BCH`, `SAP`, `PREVIRED`; `IR-SUSESO-001/002`.
- **EV**: `OTG-EVP-002`, `PAGO-EVL-005`, `PAGO-EVL-006`, `MANT-EVP-002`, `MANT-EVP-003`.
- **Resultado**: prorrata de sobrevivencia operando con liquidaciones y reportería.

### Etapa 3 — Asignación Familiar y SIVEGAM
- **PDN**: `PDN-PAG-003`, `PDN-MANT-007`, `PDN-MANT-009`.
- **RDN**: `CALC-PLI-003`, `CICLO-INAC-001`, `CICLO-INAC-002`, `VALID-ACUERDO-002`.
- **INT**: `INT-SIVEGAM-001`.
- **IR**: `IR-SUSESO-002`, `IR-SUSESO-003`.
- **EV**: `PAGO-EVC-002`, `PAGO-EVP-004`, `CORR-EVD-002`.
- **Resultado**: ciclo AF completo con reportería SUSESO/SIVEGAM.

### Etapa 4 — Mantenimientos críticos y ceses
- **PDN**: `PDN-MANT-001`, `PDN-MANT-002`, `PDN-MANT-003`, `PDN-MANT-010`, `PDN-MON-004`, `PDN-OTG-004`, `PDN-MANT-018`, `PDN-MANT-019`, `PDN-MANT-020`.
- **RDN**: `VALID-MANT-001`, `VALID-MANT-002`, `CICLO-CESE-001`, `CALC-PLI-009`, `CALC-PLI-010`, `VALID-OTORG-002`.
- **INT/IR**: `IR-SUSESO-003`, `NOTIF-EMP-001`.
- **EV**: `CESE-EVP-001`, `CESE-EVP-002`, `CESE-EVL-001`, `CESE-EVL-002`.
- **Resultado**: gobernar vigencias, suspensiones y ceses con cálculo de días exactos.

### Etapa 5 — Pago masivo operativo
- **PDN**: `PDN-PAG-001`, `PDN-PAG-004`, `PDN-PAG-005`, `PDN-PAG-007`, `PDN-PAG-008`, `PDN-PAG-009`, `PDN-PAG-010`, `PDN-REP-004`.
- **RDN**: `CALC-MANT-001`, `CALC-PLI-004`, `CALC-PLI-006`, `CALC-PLI-007`, `CALC-PLI-008`, `CALC-PLI-011`, `MAP-REP-001`, reglas `CALC-PIM-00X` según alcance.
- **INT**: `INT-BCH-001`, `INT-PREVIRED-001`, `INT-IPS-001`, `INT-IPS-002`, `INT-CCAF-001`, `INT-FONASA-001`.
- **IR**: `IR-IPS-002`, GRIS R01 de SUSESO (ver `PDN-REP-004`).
- **EV**: `PAGO-EVP-001`, `PAGO-EVP-002`, `PAGO-EVP-003`, `PAGO-EVP-004`, `PAGO-EVL-003`, `PAGO-EVL-004`, `PAGO-EVD-001`.
- **Resultado**: orquestación mensual resiliente con ajustes IPC y bonos.

### Etapa 6 — Finanzas y concurrencias
- **PDN**: `PDN-FIN-001`, `PDN-FIN-002`, `PDN-FIN-003`, `PDN-FIN-004`, `PDN-PAG-006`.
- **RDN**: `CALC-FIN-001`, `VALID-PAGO-001`, `CUMP-PAG-001`.
- **INT**: intercambios con otras mutuales (definir), contabilidad extendida.
- **IR**: cierres y compensaciones trimestrales.
- **EV**: `PAGO-EVP-006`, `PAGO-EVL-006`.
- **Resultado**: flujos de cobro/pago interinstitucional auditables.

### Etapa 7 — Correcciones y gobernanza de excepciones
- **PDN**: `PDN-COR-001`, `PDN-COR-002`, `PDN-COR-003`, `PDN-COR-004`, `PDN-GOB-001`.
- **RDN**: `VERF-GOB-001`, `CALC-PLI-011`.
- **Entidades**: `AjusteManualLiquidacion`, `Deuda`.
- **IR**: `IR-SUSESO-002`, `IR-SUSESO-005`.
- **EV**: `CORR-EVC-001`, `CORR-EVP-001`, `CORR-EVP-002`, `PAGO-EVC-001`.
- **Resultado**: marco robusto para dictámenes, reliquidaciones y auditoría.

### Etapa 8 — Monitoreos y Registro Civil
- **PDN**: `PDN-MON-001` a `PDN-MON-008`.
- **INT**: `INT-REGCIVIL-001`.
- **IR/Notifs**: `NOTIF-AFP-001`, `IR-IPS-001`.
- **EV**: ingestión, validación y disparo de procesos asociados; `PAGO-EVP-004`.
- **Resultado**: automatizaciones preventivas y calidad de datos.

## 6. Plantilla de ficha por etapa
- Objetivo de negocio
- Alcance PDN (incluidos/excluidos)
- Reglas RDN (VALID, CALC, CICLO, COMM, CUMP)
- Entidades del dominio
- Integraciones INT (layouts, frecuencia, mecanismos)
- Reportería IR (formatos, plazos)
- Escenarios EV (aceptación)
- Métricas y DoD (KPIs, SLAs, seguridad, auditoría)
- Datos (migración/sintéticos, catálogos)
- Riesgos (mitigaciones, feature flags)
- Planificación (hitos, dependencias, ventanas)

## 7. Criterios transversales de aceptación
- End-to-end verificable con `EV` y datos dorados.
- Trazabilidad completa a `13_Matriz_de_Trazabilidad.md`.
- Cumplimiento normativo y ventanas de despliegue controladas.
- Observabilidad (métricas de negocio, logs de dominio, alarmas).
- Seguridad y auditoría (roles, bitácora de decisiones/ajustes).
