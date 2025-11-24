### Análisis de coherencia del Plan Detallado (Alternativa 2) vs. dominio y arquitectura

Fecha: 2025-08-12

Alcance: Revisión de `4_plan/alternativa_2/02_plan_detallado_alternativa_2.md` contrastado con `1_dominio/`, `2_arquitectura/` y `3_especificacion_tecnica/`. Se listan omisiones, inconsistencias y errores, con alternativas de mejora y justificación lógica.

---

### Hallazgos numerados (con alternativas de mejora)

1) Inconsistencia de referencia ADR para CI/CD (ADR-011)
- Tipo: Inconsistencia
- Detalle: El plan indica «HU 1.2: Implementar pipeline CI/CD (ADR-011)». En el repositorio, `2_arquitectura/adrs/adr_011_piramide_de_tests.md` corresponde a Pirámide de Tests, no a CI/CD.
- Impacto: Ambigüedad de gobierno técnico; dificulta la trazabilidad y podría bloquear decisiones de pipeline.
- Alternativas de mejora:
  - A1: Crear ADR específico para CI/CD (p. ej., `adr_020_ci_cd_pipeline.md`) y corregir la referencia en el plan.
  - A2: Si ya existe un ADR de CI/CD fuera del repo, incorporarlo al árbol y renumerarlo según convención.
  - A3: Añadir en `09_decisiones_arquitectonicas.md` un índice maestro de ADRs con su propósito para evitar confusiones.
- Prioridad: Alta

2) Desalineación de stack frontend: Inertia vs. Edge actual
- Tipo: Inconsistencia técnica
- Detalle: «HU 1.6: configurar AdonisJS con adaptador Inertia.js». El app `pec_mvp/` usa vistas Edge (`resources/views/*.edge`). No se ve Inertia configurado.
- Impacto: Divergencia entre plan y base instalada; retrabajo al introducir Inertia (rutas, SSR, assets).
- Alternativas de mejora:
  - A1: Definir una historia técnica explícita: «Migración Edge → Inertia» con plan de corte y criterios de éxito.
  - A2: Confirmar stack en `adr_019_stack_tecnologico_frontend.md` y referenciarlo desde HU 1.6.
  - A3: Si se decide mantener Edge temporalmente, ajustar HU 1.6 y roadmap para una migración posterior.
- Prioridad: Media-Alta

3) Falta de migraciones MDLO en la app principal
- Tipo: Omisión
- Detalle: El plan pide «HU 2.1: migraciones del MDLO». En `pec_mvp/database/migrations/` solo existe `create_users_table`; las migraciones de normativa están en `4_plan/poc/...` (POC), no integradas al app.
- Impacto: Riesgo de desalineación entre modelo conceptual y base real; bloquea HUs que dependen de entidades de negocio.
- Alternativas de mejora:
  - A1: Promover migraciones de POC a `pec_mvp/` (o mono-repo compartido) con un mapeo de entidades de `1_dominio/04_Modelo_de_Entidades.md`.
  - A2: Incorporar validación de esquema en CI (compatibilidad con MDLO) y checklist de cobertura de entidades críticas (`PrestacionEconomica`, `LiquidacionDePago`, `AcuerdoDePago`, etc.).
- Prioridad: Alta

4) Nomenclatura RDN no estandarizada: «CALC-MONTO-PENSION»
- Tipo: Inconsistencia
- Detalle: Sub-tarea 3.1.3 usa «CALC-MONTO-PENSION», que no existe en `1_dominio/06_Reglas_de_Negocio.md`. Las familias presentes: `CALC-OTG-*`, `CALC-PIM-*`, `CALC-PLI-*`, `CALC-MANT-*`, etc. En POC existe `CalcularMontoPensionV1.ts`.
- Impacto: Pérdida de trazabilidad y versionado normativo (DirectivaDeEjecucion) al no seguir el patrón.
- Alternativas de mejora:
  - A1: Renombrar a un identificador canónico (p. ej., `CALC-OTG-003` o `CALC-PLI-013`) y agregarlo formalmente al Anexo D.
  - A2: Registrar su versión (`vN`) y vigencias de marco en `12_Versionamiento_Normativo_y_Resolucion.md`.
- Prioridad: Alta

5) Tope del Art. 50 sin regla formal en RDN
- Tipo: Omisión
- Detalle: «HU 4.5: Implementar aplicación de tope del Art. 50». No existe RDN específica en el Anexo D.
- Impacto: Cálculo incompleto/no trazable; riesgo regulatorio.
- Alternativas de mejora:
  - A1: Incorporar `CALC-PLI-0xx: Tope Art. 50` en el catálogo, con entradas/salidas y fuente normativa.
  - A2: Añadir escenarios BDD de borde (mes parcial, multi-beneficio) en `3_especificacion_tecnica/pruebas/`.
- Prioridad: Alta

6) «Preliquidación» no modelada en el dominio
- Tipo: Omisión
- Detalle: «HU 4.9: Preliquidación como artefacto formal» pero el dominio solo define `LiquidacionDePago`.
- Impacto: Falta entidad/contrato para auditoría, flujo de revisión y trazabilidad previa a pago.
- Alternativas de mejora:
  - A1: Introducir entidad `Preliquidacion` (estado, periodo, totales, hash idempotente, referencias a conceptos provisionales).
  - A2: Extender `PDN-PAG-003` con etapa de preliquidación y regla de re-ejecución idempotente.
  - A3: Definir BDD «preliquidación → revisión → liquidación» con telemetría EDN/RDN.
- Prioridad: Alta

7) Cierres operativos y bloqueos post-cierre no definidos
- Tipo: Omisión
- Detalle: «HU 4.10 y 4.11: bloqueos por cierre de período y calendario de cierres/adelantos». No existen entidades/procesos explícitos en el dominio.
- Impacto: Riesgo de inconsistencias por modificaciones extemporáneas; incumplimiento operativo (ventanas, adelantos por aguinaldos).
- Alternativas de mejora:
  - A1: Agregar entidad `CalendarioOperativo` (cierres AF/pagos, reglas de adelanto) y políticas de escritura post-cierre.
  - A2: Incorporar guardas en `PDN-PAG-*` y reglas VERF para excepciones controladas.
  - A3: Definir BDD de intentos de cambio post-cierre (rechazo/diferimiento).
- Prioridad: Alta

8) «Bono por matrimonio» no trazado a RDN/PDN
- Tipo: Omisión
- Detalle: «HU 3.9: pago de bono por matrimonio (pago único)» carece de mapeo a RDN/PDN/Norma en los anexos actuales.
- Impacto: Falta de contrato de cálculo y evidencia normativa.
- Alternativas de mejora:
  - A1: Crear RDN específica (p. ej., `CALC-OTG-00x` o `CALC-PLI-00x`) con fuente normativa y condiciones de elegibilidad.
  - A2: Añadir PDN puntual si requiere flujo propio (solicitud, verificación, pago único, evidencias).
- Prioridad: Media-Alta

9) Retroactivo inicial de otorgamiento, finiquito y «liberación a pago» sin modelado
- Tipo: Omisión
- Detalle: «HU 3.10: retroactivo inicial + finiquito + liberación a pago (vale vista)» no cuentan con entidades/PDN explícitos.
- Impacto: Riesgo de auditoría insuficiente del detalle inicial; falta de evidencia formal (PDF/datos).
- Alternativas de mejora:
  - A1: Especificar artefacto `FiniquitoOtorgamiento` con conceptos y trazabilidad a RDN.
  - A2: Definir subproceso dentro de `PDN-OTG-002` y su relación con `PDN-PAG-001/003`.
  - A3: Agregar BDD para liberar a pago y generación de vale vista.
- Prioridad: Media-Alta

10) «Bypass controlado por excepción» vs. principios de inmutabilidad/trazabilidad
- Tipo: Riesgo conceptual
- Detalle: «HU 3.11: bypass controlado» podría contradecir principios de Inmutabilidad y Gobernanza (Anexo H). Debe enmarcarse como EXD + VERF.
- Impacto: Riesgo de atajos operativos sin evidencia suficiente.
- Alternativas de mejora:
  - A1: Alinear la HU a `PDN-GOB-001` + `VERF-GOB-001`, prohibiendo atajos sin incidente y aprobación.
  - A2: Exigir evidencia (WORM) y auditoría de todo bypass.
- Prioridad: Alta

11) Integración «SUSESO-PIES (sugerencias)» no definida en CIRN
- Tipo: Omisión
- Detalle: «HU 5.13: reportes de sugerencias SUSESO-PIES» no está en `1_dominio/11_Informes_Regulatorios.md`.
- Impacto: Backlog de reportería inconsistente; riesgo de brecha regulatoria.
- Alternativas de mejora:
  - A1: Añadir informes a CIRN (IDs, frecuencia, formato, fuentes) y su mapeo a INTs.
  - A2: Definir RDN de mapeo (`MAP-REP-*`) para estandarización de códigos.
- Prioridad: Media

12) Pago a terceros en el extranjero sin interfaz externa formal
- Tipo: Omisión menor
- Detalle: «HU 5.11: pago a terceros en el extranjero (Tesorería/Western Union)». El dominio contempla `MetodoDePago` con SWIFT/BIC, pero no existe interfaz `INT-*-*` específica.
- Impacto: Ambigüedad técnica (layout, medio, conciliación).
- Alternativas de mejora:
  - A1: Crear `INT-TESO-001`/`INT-WU-001` con layout, validaciones y conciliación.
  - A2: Añadir escenarios BDD de remesas internacionales.
- Prioridad: Media

13) Aceptación clave de HU 4.2.1 exige doble marco; falta el mecanismo de prueba
- Tipo: Omisión de trazabilidad de pruebas
- Detalle: El criterio exige validar contra el marco vigente e histórico; los BDD de `3_especificacion_tecnica/pruebas/drafts/RELQ-*` existen, pero no se referencia su uso en la HU.
- Impacto: Riesgo de no ejecutar sistemáticamente la verificación multi-marco.
- Alternativas de mejora:
  - A1: Añadir a HU 4.2.1 la dependencia explícita de escenarios `RELQ-*` y dato semilla de marcos.
  - A2: Automatizar la evidencia de `MarcoNormativo` en telemetría (PDN→EDN/RDN) y artefactos de salida.
- Prioridad: Media-Alta

14) Decimal en CSV de reportería no estandarizado en plan
- Tipo: Omisión (formato de datos)
- Detalle: El plan no fija separador decimal/campo para CSV regulatorios; el proyecto usa coma como separador decimal en CSV.
- Impacto: Riesgo de rechazo de archivos o inconsistencias contables.
- Alternativas de mejora:
  - A1: Incluir en HU de reportería una sección de formato (separador decimal, encoding, locale) y tests de validación de salida.
  - A2: Añadir validadores de esquema/locale en `3_especificacion_tecnica/pruebas/`.
- Prioridad: Media

15) Épica 6 (Calidad y Verificación BDD) sin desglose
- Tipo: Omisión
- Detalle: El roadmap declara la épica pero en el desglose se omite, con la nota «El resto de las Épicas no sufren cambios». Falta backlog operativo.
- Impacto: Falta de plan de cobertura; riesgo de deuda de calidad.
- Alternativas de mejora:
  - A1: Desglosar HU específicas: generación de harness BDD, catálogo de escenarios mínimos (smoke, camino feliz, regresión por marco), cobertura de PAGO/OTG/MANT.
  - A2: Alinear con `adr_013_adopcion_bdd.md` y `adr_011_piramide_de_tests.md`.
- Prioridad: Alta

16) Telemetría PDN→EDN/RDN y outbox: plan los menciona pero sin criterios de done
- Tipo: Omisión de Definition of Done
- Detalle: HU 1.9 define telemetría y outbox, pero no fija mínimos (campos, correlación, hashing, idempotencia de publicación).
- Impacto: Difícil auditoría y depuración; riesgo de duplicados.
- Alternativas de mejora:
  - A1: Definir contrato mínimo de evento (ids, `marcoNormativoId`, correlación, hash de cálculo).
  - A2: Añadir pruebas de idempotencia en escenarios de re-ejecución (preliquidación/lote).
- Prioridad: Media-Alta

17) Monitores y automatizaciones «regulariza» sin catálogo de eventos/acciones
- Tipo: Omisión
- Detalle: HU 4.8 menciona motor «regulariza»; falta mapeo a `EVT-*` y a PDN-MON existentes.
- Impacto: Ambigüedad operativa y de evidencia automatizada.
- Alternativas de mejora:
  - A1: Mapear tareas del motor a `EVT-CICLO-*`/`EVT-MANT-*` y a `PDN-MON-*` correspondientes.
  - A2: Definir evidencias PDF/logs por subproceso y su almacenamiento.
- Prioridad: Media

18) Integraciones críticas (Banco, PREVIRED, SAP) sin referencia a validaciones cruzadas
- Tipo: Omisión de controles
- Detalle: HU 5.1–5.3 no incluyen controles de cuadratura con `PAGO-EVL-001/002/005` (drafts BDD existen).
- Impacto: Riesgo de desalineación entre liquidaciones, nómina y asientos.
- Alternativas de mejora:
  - A1: Añadir criterios de aceptación de cuadratura y referencia explícita a escenarios BDD correspondientes.
  - A2: Incorporar check automatizado en pipeline previo a despliegue.
- Prioridad: Media-Alta

19) Falta de mapeo explícito de «Nuevas nupcias (viudez)» a máquina de estados
- Tipo: Omisión
- Detalle: HU 3.9 implica transición `Activa → Cesada` por nuevo vínculo. Aunque `PDN-MANT-010` existe, conviene explicitar su relación a la tabla de estados (Anexo B, sección 8.1).
- Impacto: Brecha documental entre HU y modelo de estados.
- Alternativas de mejora:
  - A1: Añadir referencia directa a la tabla de transiciones y a `EVT-CICLO-002`.
  - A2: Incorporar BDD que ejercite prorrateo con mes de evento (coherente con `CALC-PLI-009/010`).
- Prioridad: Media

20) Catálogo de Domain Events no vinculado a artefactos de reportería
- Tipo: Omisión de trazabilidad
- Detalle: HU 1.9 define telemetría de eventos (p. ej., `pension:inactivada`, `archivo_banco:generado`) pero no se conecta al CIRN ni a auditoría WORM.
- Impacto: Eventos útiles sin consumo/almacenamiento formal.
- Alternativas de mejora:
  - A1: Trazar eventos a evidencias y a informes donde corresponda.
  - A2: Definir retención, WORM y accesos para auditoría.
- Prioridad: Media

---

### Recomendaciones transversales

- **Alinear el plan con nomenclaturas canónicas**: PDN/RDN/VERF/EVT con versión `vN` y vigencias por `MarcoNormativo` en `12_Versionamiento_*`.
- **Definition of Done por HU**: incluir evidencias (artefactos, telemetría, BDD, validaciones de salida) para asegurar auditabilidad.
- **Puente POC → App**: promover migraciones/esquema y servicios (`FrameworkResolverService`, `RuleExecutorService`) del POC a `pec_mvp/` con pruebas.
- **Calidad primero**: detallar Épica 6 con alcance mínimo (smoke, camino feliz, regresión multi-marco) y ligarlo a pipeline.

---

### Notas

- Este análisis prioriza riesgos regulatorios (cálculos, topes, reportería), coherencia de dominio (máquinas de estado) y trazabilidad (telemetría, evidencias WORM).


