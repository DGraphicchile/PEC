# 9. Decisiones Arquitectónicas (ADRs)

Lista y enlaces a ADRs relevantes del proyecto (arc42).

- ADR-000: Adopción de ADRs (Nygard) — `2_arquitectura/adrs/adr_000_adoptar_adr_nygard.md`
- ADR-001: Uso de arc42 como marco y estructura — `2_arquitectura/adrs/adr_001_arc42_estructura.md`
- ADR-002: CRUD + eventos + auditoría (sin replays deterministas) — `2_arquitectura/adrs/adr_002_crud_eventos_auditoria.md`
- ADR-008: Adopción de AdonisJS 6 como framework base y extensiones del stack — `2_arquitectura/adrs/adr_008_adonisjs6_stack.md`
- ADR-009: Invocación interna de PDN vía Servicios (IoC) y Comandos/Jobs (sin APIs HTTP internas) — `2_arquitectura/adrs/adr_009_pdn_invocacion_interna_servicios_y_commands.md`
- ADR-010: Estrategia de ejecución masiva de liquidaciones de fin de mes — `2_arquitectura/adrs/adr_010_ejecucion_masiva_liquidaciones_fin_de_mes.md`
- ADR-011: Estrategia de Pirámide de Tests (SQLite para rápidos; Postgres para E2E) — `2_arquitectura/adrs/adr_011_piramide_de_tests.md`
- ADR-012: Aplicación separada para generación de escenarios de verificación (AdonisJS) y reutilización en E2E — `2_arquitectura/adrs/adr_012_app_separada_escenarios_verificacion.md`
- ADR-013: Adopción de BDD (Behavior-Driven Development) como marco de especificación ejecutable — `2_arquitectura/adrs/adr_013_adopcion_bdd.md`

Propuestas nuevas en esta iteración (archivos en `adrs/`):
- ADR-003: Gobierno del Marco Normativo y Resolver de Versiones — `2_arquitectura/adrs/adr_003_marco_normativo_resolver.md`
- ADR-004: Catálogo de Conceptos de Liquidación (CCL) como fuente única de verdad — `2_arquitectura/adrs/adr_004_catalogo_conceptos_liquidacion.md`
- ADR-005: Modelo unificado de Acuerdos de Pago y aplicación en liquidación — `2_arquitectura/adrs/adr_005_acuerdos_de_pago.md`
- ADR-006: Idempotencia e integridad en integraciones masivas (banco, PREVIRED, SAP) — `2_arquitectura/adrs/adr_006_idempotencia_integraciones.md`
- ADR-007: Estrategia de evidencias y trazabilidad para auditoría y reportería — `2_arquitectura/adrs/adr_007_evidencias_trazabilidad_auditoria.md`
 - ADR-014: Criterios de activación ES/CDC por módulo — `2_arquitectura/adrs/adr_014_criterios_es_cdc_por_modulo.md`
 - ADR-015: Activación de CDC para reportería y almacenes de lectura — `2_arquitectura/adrs/adr_015_cdc_para_reporteria.md`
 - ADR-016: Aplicación inicial de ES/CDC y Evidencias (PEC) — `2_arquitectura/adrs/adr_016_aplicacion_inicial_es_cdc_y_evidencias.md`
 - ADR-017: Patrones para Implementación de Lógica de Negocio — `2_arquitectura/adrs/adr_017_patrones_logica_de_negocio.md`
 - ADR-018: Herramientas de Scaffolding para Consistencia Arquitectónica — `2_arquitectura/adrs/adr_018_herramientas_scaffolding.md`
 - ADR-019: Stack Tecnológico para el Front-end Interno — `2_arquitectura/adrs/adr_019_stack_tecnologico_frontend.md`

Guía:
- Crear nuevas ADRs numeradas y fechadas al introducir decisiones de alto impacto (tecnología, estructura, contratos, calidad).
- Estructura recomendada: contexto, decisión, alternativas consideradas, consecuencias.
- Enlazar desde esta sección y referenciar en las vistas afectadas.
