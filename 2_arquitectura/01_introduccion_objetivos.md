# 1. Introducción y Objetivos

Sistema PEC/MDLO: plataforma de prestaciones económicas que prioriza inmutabilidad, auditabilidad y trazabilidad, alineada a la normativa vigente y su evolución. Este documento resume drivers, metas de calidad y actores clave, como base para las decisiones arquitectónicas y de diseño.

## 1.1 Drivers y fuerzas impulsoras
- Cumplimiento normativo estricto (SUSESO/IPS) con evidencia reproducible en el tiempo.
- Trazabilidad operativa acotada a necesidades de reclamos e investigación: explicar cálculo (pasos clave) y custodiar evidencias de envíos/ingestas.
- Evolución normativa: ejecución de reglas bajo un `MarcoNormativo` versionado y con vigencias.
- Operación confiable en procesos masivos (nóminas, reportería), con idempotencia en integraciones y conciliación oportuna.
- Claridad de negocio: catálogo único de conceptos de liquidación (CCL) y gobierno de acuerdos de pago.

## 1.2 Objetivos/Metas de Calidad (medibles)
- Auditabilidad y reproducibilidad (cálculo): re-ejecutar una liquidación histórica (mismo resultado, mismo `MarcoNormativo`) en < 2 min por caso (p95), con explicación de pasos clave para reclamos.
- Evidencia de pagos masivos: por batch y por línea registrar totales/hashes/inclusión o motivo; conciliación de confirmación bancaria en < T horas (SLA operativo).
- Idempotencia operativa: 0 duplicaciones por `idempotency_key`/mes en Banco/PREVIRED; reintentos seguros sin efectos adicionales.
- Mantenibilidad: publicar cambios de reglas (RDN) y directivas sin downtime, con pipeline E2E ≤ 15 min y cobertura mínima acordada.
- Disponibilidad: P99 de endpoints críticos < Z ms y uptime ≥ 99.9% horario hábil.

## 1.3 Alcance de negocio (resumen)
- Ciclo de vida del beneficio: otorgamiento, mantenimiento, suspensiones/ceses, correcciones y reliquidaciones multi-marco.
- Motor de cálculo y liquidación con catálogo CCL y reglas RDN trazables al fundamento normativo.
- Gobernanza y excepciones (EXD/VERF) con intervención humana auditable.
- Integraciones con IPS, SUSESO/SIVEGAM, Bancos, PREVIRED, Registro Civil y SAP.

## 1.5 Auditoría y trazabilidad (alcances y no-requisitos)
- Alcances (sí):
  - Explicación de cálculo orientada a reclamos (pasos clave y reglas aplicadas; vínculo a `LiquidacionDePago`).
  - Evidencias mínimas en pagos masivos (batch/ítem), ingestas y publicaciones: hashes, totales, confirmaciones, motivos de exclusión.
  - Custodia WORM sencilla para archivos fuente (hash + sello de tiempo + proveedor; sin sobrescritura).
  - Idempotencia “solo-una-vez” en archivos/batches/líneas para evitar duplicados.
- No-requisitos (fuera de alcance):
  - Event store y replays deterministas del estado como fuente canónica.
  - Snapshots normativos por línea dentro del archivo de pago (se referencia la `LiquidacionDePago`).
  - Conservación de PII sensible en evidencias (se usan huellas/fingerprints cuando aplique).

## 1.4 Stakeholders
- Negocio/Operaciones: precisión, control de procesos y SLAs de ciclo de pago.
- Cumplimiento/Regulación: evidencia, reportería y reproducibilidad normativa.
- Finanzas/Contabilidad: conciliaciones y comprobantes confiables.
- TI/Integraciones: contratos estables, observabilidad, runbooks y seguridad.

Referencias: `version_actual/MDLO_v1` (Anexos A–K) y arc42 overview: https://r.jina.ai/arc42.org/overview
- Evidencias y WORM: `3_especificacion_tecnica/eventos-auditoria/02_evidencias_y_worm.md`
- Idempotencia operativa: `3_especificacion_tecnica/operacion/02_idempotencia.md`
- Ingesta de archivos: `3_especificacion_tecnica/integraciones/ingesta_archivos.md`
