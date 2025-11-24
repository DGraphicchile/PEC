## Plan de Desarrollo del Sistema (v1)

Autor: Equipo de Análisis de Dominio ACHS  
Fecha: 2025-08-09  
Ámbito: MDLO_v1 con primera entrega que cubre íntegramente `MDLO_version_actual.md`

---

## 1. Objetivo y alcance

- **Objetivo**: entregar valor en cortes verticales de negocio (PDN de extremo a extremo), con integraciones, reglas, reportería y trazabilidad listas para producción.
- **Primera entrega completa (Release 1)**: cubrir íntegramente lo confirmado en `MDLO_version_actual.md` (estado actual iSeries expresado en MDLO).
- **Compatibilidad operativa**: transición gradual desde iSeries con doble corrida y reconciliación hasta completar certificaciones externas.

Referencias: `version_actual/MDLO_v1/*`, `MDLO_version_actual.md`, `version_actual/plan/*`.

---

## 2. Principios y criterios de corte

- **Vertical slice por PDN**: cada release entrega un proceso de negocio ejecutable de punta a punta (incluye cálculo, liquidación, pago, interfaces, evidencias PDF y bitácora).
- **Definition of Done de negocio**:
  - Casos reales liquidados y pagados sin rechazos críticos.
  - Archivos externos aceptados (Banco de Chile, SAP, Registro Civil, SUSESO).
  - Evidencias PDF y trazabilidad por regla/decisión.
- **Gobernanza de excepciones**: operación manual controlada para casos no formulables o dictámenes especiales.
- **Seguridad y cumplimiento**: perfiles operativos, resguardo de credenciales (incl. FTP), auditoría.

---

## 3. Arquitectura target y capacidades base

- Núcleo de dominio MDLO (entidades, PDN, RDN). Motor de reglas de cálculo/liquidación.
- Orquestación de procesos y cierres mensuales (jobs, ventanas 1–8, preliquidación/validación/ejecución).
- Integraciones por archivo/FTP y APIs donde aplique: Banco de Chile, SAP, Registro Civil, SUSESO (GRIS).
- Observabilidad y trazabilidad: bitácoras, métricas, PDFs uniformes por automatización.
- Seguridad: autenticación/autorización, segregación de funciones, auditoría.
- DevEx: CI/CD, ambientes, data sandbox, gestión de configuración.

---

## 4. Roadmap por releases (vertical slices)

### Release 0 — Fundaciones (4–6 semanas)
- **Objetivos**: preparar la plataforma técnica y prácticas DevEx para soportar los procesos MDLO, con especial foco en cierres mensuales y archivos.
- **Alcance técnico**:
  - Gestión de configuración multi-ambiente y secretos (vault/keystore).
  - Orquestación de lotes (scheduler, workers, manejo de reintentos e idempotencia).
  - Intercambio de archivos (FTP/SFTP) y librería de formateo/parseo (plantillas para Banco, SAP, RC, SUSESO).
  - Servicio de PDFs (plantillas base para evidencias de automatización y bitácoras).
  - Observabilidad: logging estructurado, métricas, trazas, tableros y alertas.
  - Seguridad inicial y RBAC básico (perfiles operativos y segregación de funciones).
  - DevEx: CI/CD, ambientes (dev, test, uat), data sandbox y fixtures.
- **Épicas**:
  - Plataforma de jobs y cierres; Intercambio de archivos; PDFs de auditoría; Observabilidad; CI/CD; Seguridad base.
- **Hitos**:
  - S2: CI/CD, ambientes, logging/metrics; S3: jobs y SFTP; S4: PDFs base y tableros; S5–S6: hardening y pruebas técnicas.
- **Dependencias**: credenciales de SFTP/FTP de prueba, ambientes de destino en TI.
- **Entregables (DoD)**: pipelines listos, jobs demo idempotentes, plantillas de archivos y PDFs base, tableros operativos iniciales.
- **Riesgos**: tiempos de provisión de accesos; mitigación: mocks y bandejas locales temporales.

### Release 1 — Núcleo iSeries MDLO (8–12 semanas) [Primera funcionalidad completa]
Objetivo: cubrir íntegramente lo confirmado en `MDLO_version_actual.md`.

- Entidades efectivas: `PrestacionEconomica`, `LiquidacionDePago`, `ConceptoLiquidacion`, `CausanteAsignacionFamiliar`, `AcuerdoDePago`/`MetodoDePago`/`ConfiguracionDescuento`, `Trabajador`/`FichaPersona`.
- PDN cubiertos:
  - Otorgamiento: `PDN-OTG-002` (otorgamiento/activación), `PDN-OTG-006` (sobrevivencia).
  - Mantenimiento: `PDN-MANT-001` (cese por edad), `PDN-MANT-002/003` (orfandad susp./react.), `PDN-MANT-008` (exportación pensión), `PDN-MANT-009` (acuerdo de pago, apoderados/retenciones), `PDN-MANT-012` (Art. 50), `PDN-MANT-015` (cambio salud), `PDN-MANT-016` (ajustes manuales).
  - Pagos: `PDN-PAG-001/002/003` (imponible/líquida), `PDN-PAG-007` (aplicación acuerdos), `PDN-PAG-008` (nómina Banco), `PDN-PAG-010` (contabilización SAP por archivo).
  - Finanzas: `PDN-FIN-004` (compensación/concurrencias por archivo y prorrata externa).
  - Reportería/Monitoreo: GRIS SUSESO; `PDN-MON-002` (disparo reajuste IPC); `PDN-MON-005/006` Registro Civil (envío/recepción masiva).
- Reglas activas:
  - Cálculo: `CALC-PLI-001/002` (salud/previsión), `CALC-PLI-003` (asignación familiar), `CALC-MANT-001` (IPC masivo), `CALC-PLI-007/011` (retenciones y ajustes), `CALC-PLI-009/010` (días exactos e inactivaciones retroactivas).
  - Ciclo de vida: `CICLO-CESE-001` (cese por edad), `CICLO-INAC-001/002` (suspensión por estudios/fallecimiento vía RC).
  - Validaciones: vigencias AF, foco viudez < 45 años, ventana operativa 1–8 (deferidos).
- Interfaces: `INT-BCH-001` (nómina Banco de Chile), `INT-SAP-001` (contabilización), `INT-REGCIVIL-001` (verificación masiva), `IR-SUSESO (GRIS)`.
- Automatizaciones de cierre: inactivación por edad legal; validación de estudios; actualización por estado civil; generación de reportes (IPS, Tesorería, SUSESO) y PDFs de auditoría.
- Excepciones: reactivaciones/modificaciones por dictamen; mandatarios/retenciones; pagos extraordinarios/no formulables.
- Beneficiarios y límites: elegibilidad de sobrevivencia; **Artículo 50** (tope 100% y ajuste proporcional); pagos mínimos por rango etario.
- Trazabilidad: PDFs uniformes por automatización; resguardo y disponibilidad de credenciales y accesos (incl. FTP).
- Datos: carga inicial mínima (cohorte acotada) y pilotaje paralelo a iSeries con reconciliación por n ciclos.
- Resultado: ciclo mensual real, nómina aceptada por Banco de Chile, archivo SAP aceptado, RC procesado, GRIS emitido.

#### Detalle R1

- **Objetivos específicos**:
  - Ejecutar el ciclo mensual end-to-end para una cohorte piloto, con aceptación de todos los archivos externos y evidencias completas.
  - Operar excepciones y bloqueos en ventana 1–8, y generar PDFs por automatización.
- **Épicas y features**:
  - Modelado de dominio y repositorios de entidades efectivas.
  - Motor de reglas de cálculo (`CALC-*`) y ciclo de vida (`CICLO-*`), validaciones operativas.
  - Orquestación de `PDN-OTG`, `PDN-MANT`, `PDN-PAG`, `PDN-FIN`, `PDN-MON` con cierres y preliquidación/validación/ejecución.
  - Integraciones de archivos: Banco de Chile, SAP, Registro Civil, SUSESO (GRIS) con generadores/parsers y validaciones.
  - Automatizaciones de cierre (inactivaciones por edad, estudios, estado civil) y bitácoras.
  - Excepciones: dictamen especial, mandatarios/retenciones, pagos no formulables con trazabilidad.
  - Evidencias: PDFs uniformes por proceso, logs de auditoría y rastro de decisión por regla.
  - Migración y reconciliación: carga inicial mínima, doble corrida por ≥2 ciclos, difs explicadas.
- **Hitos**:
  - Sem 1–2: modelado de dominio + motor de reglas; Sem 3–4: `OTG` y `MANT` clave; Sem 5–6: `PAG` y automatizaciones de cierre; Sem 7–8: integraciones externas y validaciones; Sem 9–10: E2E y dry-runs con cohorte; Sem 11–12: certificaciones y go-live de piloto.
- **Dependencias**: especificaciones de archivos definitivas, credenciales de SFTP, ventanas de certificación con Banco/SAP/RC/SUSESO, disponibilidad de cohorte piloto.
- **Entregables (DoD)**: nómina aceptada por Banco, archivo SAP conciliado, RC procesado con inactivaciones, GRIS emitido; PDFs por automatización; reporte de reconcil. vs iSeries con difs bajo umbral.
- **RIESGOS específicos**: reglas tácitas no documentadas; mitigación: comité de dominio, backtesting y ajustes controlados.

### Release 2 — Constitución y devengados ampliados (6–8 semanas)
- **Objetivos**: ampliar constitución inicial y manejo de devengados/retroactivos más complejos según `MDLO_v1`.
- **Alcance**: mejoras de cálculo inicial, reglas de retroactividad y reliquidaciones acotadas, simuladores de otorgamiento.
- **Épicas**: simulación de constitución; cálculo de devengados; evidencias extendidas; UI/UX operativa para otorgamiento; gobernanza de excepciones.
- **Hitos**: Sem 1–2 simulación y reglas; Sem 3–4 E2E constitución ampliada; Sem 5–6 pilotos y ajustes.
- **Dependencias**: definiciones de negocio para devengados ampliados; datos de prueba suficientes.
- **Entregables (DoD)**: casos de constitución con retroactivos correctos, PDFs de respaldo y aceptación de negocio.
 - **Cobertura MDLO_v1 objetivo**:
   - Otorgamiento: `PDN-OTG-001` (consolidación de rentas), `PDN-OTG-003` (denegación) y profundización `PDN-OTG-006` multi-beneficiario.
   - Otorgamiento extendido: `PDN-OTG-004/005` (pensión transitoria por límite de subsidio, múltiples empleadores) según prioridad.
   - Reglas de cálculo inicial: `CALC-OTG-001/002`; haberes PIM iniciales (`CALC-PIM-001..005`) donde apliquen.
   - Corrección: base de `PDN-COR-001` (reliquidación por error) y `PDN-COR-002` (dictamen) para casos acotados.
   - Gobernanza: `PDN-GOB-001` operativo para canalizar excepciones con trazabilidad.
   - Mantenimiento transitorio: `PDN-MANT-018/019/020` (fin/convertir/cesar pensión transitoria) en coherencia con `PDN-OTG-004`.

### Release 3 — Mantenimiento avanzado y convenios (6–8 semanas)
- **Objetivos**: cubrir convenios/descuentos complejos y mantenimiento con re-liquidaciones controladas.
- **Alcance**: motor de convenios parametrizables, reglas de re-liquidación, regularizaciones proporcionales extendidas.
- **Épicas**: catálogo de convenios; simulación de impacto; auditoría de cambios; conciliación de re-liquidaciones.
- **Hitos**: Sem 1–2 modelado de convenios; Sem 3–4 re-liquidaciones; Sem 5–6 validaciones E2E.
- **Entregables (DoD)**: convenios aplicados sin rechazos, registro de rastro de decisión y conciliaciones sin diferencias materiales.
 - **Cobertura MDLO_v1 objetivo**:
   - Mantenimiento: `PDN-MANT-014` (cambio AFP), `PDN-MANT-017` (solicitud intervención manual) y profundización `PDN-MANT-004/005/006` según prioridades.
   - Mantenimiento adicional: `PDN-MANT-010` (cese por nuevo vínculo), `PDN-MANT-013` (inactivar cargas por cese de beneficio principal).
   - Reglas y validaciones: `VALID-ACUERDO-002/003` (pago directo AF, límites de retención), ajustes proporcionales extendidos (`CALC-MANT-003`).
   - Interfaces convenios: `INT-CCAF-001` (créditos sociales), `INT-FONASA-001` (préstamos médicos) para descuentos.
   - Corrección: `PDN-COR-003` (reversión con deuda) en escenarios controlados.

### Release 4 — Gestión financiera y conciliaciones avanzadas (6–8 semanas)
- **Objetivos**: fortalecer contabilidad operativa y conciliaciones multi-organismo.
- **Alcance**: matching avanzado, reportes financieros, auditoría reforzada, workflows de discrepancias.
- **Épicas**: conciliación de concurrencias; tableros financieros; flujo de resolución de diferencias.
- **Hitos**: Sem 1–2 conciliaciones; Sem 3–4 tableros; Sem 5–6 procesos de cierre financiero extendidos.
- **Entregables (DoD)**: conciliaciones aceptadas por auditoría interna, KPIs financieros operativos.
 - **Cobertura MDLO_v1 objetivo**:
   - Gestión financiera: `PDN-FIN-001/002/003` y profundización `PDN-FIN-004`; regla `CALC-FIN-001` (prorrata de concurrencia).
   - Pagos: `PDN-PAG-004` (reajuste por IPC masivo), `PDN-PAG-005` (aguinaldos/bonos), `PDN-PAG-009` (archivo PREVIRED) y validaciones asociadas.
   - Interfaces: `INT-PREVIRED-001` (cotizaciones) y robustecimiento `INT-SAP-001` (contabilización avanzada).
   - Monitoreo: `PDN-MON-004` (notificación preventiva de cese por edad).
   - Entidades: `ComprobanteContable` para agrupación y totalización hacia SAP.

### Release 5 — Reportería regulatoria ampliada y gobierno de datos (4–6 semanas)
- **Objetivos**: ampliar reportería y gobierno de datos.
- **Alcance**: nuevos informes regulatorios/gestión, catálogo de datos MDLO, reglas de calidad, linaje.
- **Épicas**: data catalog; reglas de calidad; pipelines de informes; metadatos y linaje.
- **Hitos**: Sem 1–2 data catalog y calidad; Sem 3–4 informes y linaje; Sem 5–6 curatoría.
- **Entregables (DoD)**: informes generados y auditables, métricas de calidad en verde.
 - **Cobertura MDLO_v1 objetivo**:
   - Reportería: `PDN-REP-001/002/003/004`; regla `CALC-REP-001` (campo PENSION CAPITAL).
   - Interfaces regulatorias: `INT-SIVEGAM-001`, `INT-IPS-001/002` adicionales a `IR-SUSESO (GRIS)`.
   - Monitoreo: `PDN-MON-001/003` (SLA y plazos empleador); `PDN-MON-007/008` (pensión mínima y viudez por edad).
   - Mantenimiento adicional: `PDN-MANT-007` (sincronización de vigencia de causantes con SIVEGAM), `PDN-MANT-011` (notificación de cese de funciones sector público).
   - Corrección: `PDN-COR-004` (corrección de rechazos de SIVEGAM).

### Release 6 — Canales y autoservicio (6–10 semanas)
- **Objetivos**: exponer capacidades MDLO a canales externos.
- **Alcance**: portal/servicios para beneficiarios y organismos, gestión de solicitudes, notificaciones, trazabilidad a usuario final.
- **Épicas**: APIs/portal; centro de notificaciones; identidad y consentimientos; experiencia autoservicio.
- **Hitos**: Sem 1–3 APIs/portal MVP; Sem 4–6 notificaciones y seguridad; Sem 7–10 pilotos por segmento.
- **Entregables (DoD)**: journeys críticos completados, SLAs de canal cumplidos.

### Release 7 — Optimización operativa (4–6 semanas)
- **Objetivos**: optimizar costo/performance y ergonomía operativa.
- **Alcance**: tuning de reglas y jobs, mejoras de tiempos de cierre, ergonomía de backoffice.
- **Épicas**: performance y costo; ergonomía; automatización de tareas repetitivas.
- **Hitos**: Sem 1–2 profiling y mejoras; Sem 3–4 ergonomía; Sem 5–6 automatizaciones.
- **Entregables (DoD)**: tiempos de cierre reducidos vs línea base, productividad operativa mejorada.

---

## 5. Criterios de aceptación — Release 1

- Otorgamiento: alta/activación (incapacidad/sobrevivencia) con cálculos y retroactivos validados sobre casos reales.
- Mantenimiento: orfandad (susp./react.), apoderados/retenciones, cambios de salud, Art. 50; evidencias por acción.
- Pago mensual: preliquidación–validación–ejecución; nómina Banco de Chile aceptada sin rechazos críticos.
- Contabilización: archivo SAP aceptado y conciliado.
- Registro Civil: envío y procesamiento con inactivaciones/alertas.
- GRIS SUSESO: generado/enviado conforme a especificación.
- Cierre mensual: bitácora completa y PDFs de auditoría.
- Ventana operativa 1–8: bloqueos y diferidos comprobables.
- Trazabilidad: rastro de decisión por cada regla aplicada.

---

## 6. Plan de datos y migración

- R1: carga mínima para pilotaje (una línea de pago y cohorte representativa de beneficiarios). Doble corrida vs iSeries por ≥2 ciclos, reconciliación determinística.
- R2+: ampliación gradual del universo y migraciones incrementales.
- Estrategia de reversión: rollback por lotes y re-ejecución segura de cierres.

---

## 7. Estrategia de pruebas y certificaciones

- Pruebas: unitarias de reglas, contratos de integraciones, E2E de PDN, ensayos de cierre mensual.
- Golden cases por PDN/reglas clave; comparación determinística con salidas de iSeries.
- Certificaciones externas: Banco de Chile, SAP, Registro Civil, SUSESO.

---

## 8. Despliegue, transición y soporte

- Despliegue blue/green por lotes de beneficiarios; feature flags para automatizaciones críticas.
- Operación paralela con iSeries hasta cumplir criterios de corte; mesa operativa y runbooks por automatización/excepción.
- Monitoreo post go-live: KPIs, alertas, tableros de seguimiento.

---

## 9. Riesgos y mitigaciones

- Integraciones por archivo (ventanas/ambientes): plan de pruebas anticipado y dry-runs.
- Reglas tácitas no documentadas: discovery continuo y comité de dominio.
- Cierre mensual: ensayos repetidos y contingencia de re-ejecución idempotente.
- Dependencias organizacionales (credenciales, calendarios): gestión temprana y ownership claro.

---

## 10. Métricas de éxito

- Tasa de aceptación de nómina y contabilización.
- Diferencias vs iSeries < umbral acordado.
- Tiempo total de cierre y número de reprocesos.
- Incidencias por millón de líneas de liquidación.
- SLA en resolución de excepciones.

---

## 11. Cronograma tentativo

- R0: 4–6 semanas.
- R1: 8–12 semanas (primer valor productivo completo, cubre `MDLO_version_actual.md`).
- R2–R7: 4–10 semanas cada una, según alcance indicado.

El cronograma se detallará con Hitos, hitos de integración y ventanas regulatorias.

---

## 12. Backlog de alto nivel — Release 1

- Dominio y reglas:
  - Modelar entidades y repositorios efectivos (lista de §R1 arriba).
  - Implementar reglas `CALC-*`, `CICLO-*` y validaciones operativas.
- Procesos y orquestación:
  - `PDN-OTG-002/006`, `PDN-MANT-*`, `PDN-PAG-*`, `PDN-FIN-004`, `PDN-MON-*`.
  - Automatizaciones de cierre y ventana operativa 1–8.
- Integraciones:
  - `INT-BCH-001`, `INT-SAP-001`, `INT-REGCIVIL-001`, `IR-SUSESO (GRIS)`.
- Trazabilidad y evidencias:
  - Generación de PDFs uniformes, bitácoras, rastro de decisión por regla.
- Datos y migración:
  - Carga inicial mínima, doble corrida y reconciliación.
- Operación/excepciones:
  - Flujos de dictamen especial, mandatarios/retenciones, pagos no formulables.

---

## 13. Anexos y referencias

- `MDLO_version_actual.md` (cobertura confirmada iSeries)
- `version_actual/MDLO_v1/*` (taxonomía, conceptos, PDN y RDN)
- `version_actual/plan/*` (documentos de planificación relacionados)


