### Análisis comparativo: `plan/plan_v2/plan_desarrollo_ideal.md` vs `plan/plan_v1/plan_desarrollo_reemplazo_iseries.md` vs `plan/plan_v0/especificacion_y_plan_de_ejecucion_PEC.md`

#### Resumen ejecutivo
- El plan “ideal” (v2) prioriza valor de negocio por vertical slices y progresión funcional con fuerte alineamiento PDN/RDN/IR/INT/EV, excelente para reducir riesgo funcional y ordenar la expansión del dominio.
- El plan “reemplazo iSeries” (v1) prioriza ejecución y certificación operativa temprana (archivos, cierres, FTP/SAP/RC/GRIS), excelente para go‑live piloto y transición controlada desde iSeries con criterios de aceptación y cronograma.
- La “Especificación y Plan de Ejecución” (v0) aporta un plan técnico unificado con arquitectura target (NestJS 11, Prisma, DDD) y estimación detallada por fases mediante PCC, excelente para planificación, dimensionamiento y DevEx.

---

### Tabla comparativa (resumen)

| Dimensión | Plan ideal (v2) | Plan reemplazo iSeries (v1) | Plan unificado ejecución (v0) | Observación |
|---|---|---|---|---|
| Enfoque | Roadmap por etapas de negocio (vertical slices E2E) | Roadmap por releases con fundaciones técnicas y certificaciones | Especificación técnica unificada + plan por fases con PCC (DDD/NestJS) | Complementarios: negocio vs ejecución/certificación vs estimación/arquitectura |
| Primera entrega | Etapa 1: otorgamiento dependiente simple E2E | R1: núcleo iSeries amplio (OTG/MANT/PAG/FIN/MON) | Fase 0–1: fundación + MVP de otorgamiento | v1 más ambicioso; v2/v0 más acotados y seguros |
| Arquitectura/cimientos | Dominio canónico, motor de reglas, orquestador, observabilidad | R0: jobs/lotes, SFTP/archivos, PDFs, CI/CD, seguridad | NestJS 11, Prisma, DDD/Clean, IaC/CI, testing; módulos MDLO | v0 define arquitectura target y DevEx detallado |
| Alineamiento PDN/RDN/IR/INT/EV | Muy explícito por etapa | Explícito por release (incluye GRIS y certificaciones) | Mapea módulos/paquetes MDLO por fase | v2 aporta plantilla; v0 aporta estructura de módulos |
| Integraciones tempranas | BCH, SAP mínimos; SIVEGAM/IPS/CCAF/FONASA posteriores | BCH, SAP, RC, GRIS ya en R1 | PREVIRED/Banco en F2; IPS/RC/SIVEGAM posteriores | v1 acelera certificaciones; v0 planifica paquetes |
| Cierres mensuales | Orquestación PDN y criterios transversales | Ventanas 1–8, idempotencia, reintentos | PAG completo en F2; ventanas no explicitadas | v1 más operativo en cierres |
| Datos y migración | “Datos” en plantilla por etapa | Doble corrida y reconciliación | Excluye migración (proyecto separado) | v1 superior en transición desde iSeries |
| Pruebas/certificaciones | EV y trazabilidad transversal | Certificaciones Banco/SAP/RC/SUSESO | QA/E2E y carga; sin certificaciones externas definidas | v1 líder en certificaciones; v0 sólido en QA |
| Excepciones/gobernanza | Etapa 7 dedicada | Excepciones ya en R1 | GOB/VERF-GOB en F4 | v2 focaliza, v1 adelanta, v0 planifica por fase |
| Reportería regulatoria | IR por etapa (GRIS, SUSESO, IPS) | GRIS en R1; ampliada en R5 | REP y GRIS R01 en F5 | v1 acelera GRIS; v0 lo agenda con PCC |
| Riesgos y mitigaciones | Criterios transversales | Sección por release | No hay sección dedicada explícita | v1 más accionable en riesgos |
| Trazabilidad/auditoría | Matriz de trazabilidad, bitácora de decisiones | PDFs uniformes y rastro por regla | Principios de auditabilidad/linaje; PDFs no enfatizados | v1 concreta evidencias operativas |
| Cronograma e hitos | No explicita tiempos | Semanas por release y DoD | Sprints por fase y PCC totales | v0 excelente para estimación/capacidad |
| Complejidad inicial | Baja-media (Etapa 1 acotada) | Alta (R1 amplia) | Media (ingeniería intensa F0; funcional escalonado) | v2/v0 reducen sobre‑alcance inicial |

---

### Fortalezas y debilidades

#### Plan ideal (v2)
- Fortalezas
  - Enfoque por valor regulatorio/operacional; “vertical slices” E2E bien definidos.
  - Catálogo PDN/RDN/IR/INT/EV por etapa claro y trazable; plantilla por etapa reutilizable.
  - Secuenciación progresiva de complejidad (Ej.: AF/SIVEGAM, finanzas, correcciones).
  - Criterios transversales (trazabilidad, seguridad, observabilidad) consistentes.
- Debilidades
  - Menos detalle operativo sobre cierres mensuales, archivos y certificaciones tempranas.
  - Sin duración/hitos concretos; dependencias externas no aterrizadas por etapa.
  - Plan de datos/migración se menciona pero no se operacionaliza.

#### Plan reemplazo iSeries (v1)
- Fortalezas
  - Fundaciones técnicas (R0) accionables: SFTP/archivos, jobs, PDFs, CI/CD, seguridad.
  - R1 orientada a go‑live piloto: integra BCH, SAP, RC, GRIS con DoD y certificaciones.
  - Plan de migración y reconciliación robusto (doble corrida, difs determinísticas).
  - Riesgos/mitigaciones, cronograma, hitos y dependencias claros.
- Debilidades
  - R1 con alcance amplio eleva riesgo de sobrecarga y tiempos; mayor complejidad inicial.
  - Menor progresión funcional por verticales acotados; puede tensionar capacidad de prueba.
  - Gobernanza de excepciones temprana puede dispersar foco si no se restringe el alcance.

#### Especificación y Plan de Ejecución (v0)
- Fortalezas
  - Base técnica clara: NestJS 11, Prisma, DDD/Clean, módulos MDLO; DevEx, CI y QA desde el inicio.
  - Estimación cuantificada por PCC y desagregada por rol/artefacto; facilita planificación y capacity.
  - Cobertura amplia del MDLO con secuenciación por fases y listas de paquetes (PDN/RDN/INT/REP/MON/FIN/GOB).
  - Pruebas E2E/carga/seguridad previstas y runway de infraestructura como código.
- Debilidades
  - Excluye migración de datos legados; vacío para transición operativa.
  - Certificaciones externas y ventanas operativas no detalladas; riesgo de gap regulatorio.
  - Prescripción tecnológica fuerte (lock‑in a NestJS/Prisma) y menor foco en aceptación por terceros.
  - Cierres mensuales/ventanas 1–8 no explicitados al nivel operativo de v1.

---

### Dimensiones clave de comparación (con evaluación)

- Enfoque de entrega: v2 sobresale en valor incremental por casos; v1 sobresale en habilitar operación/certificación temprana.
- Orquestación y cierres: v1 más maduro (ventanas 1–8, idempotencia, reintentos).
- Integraciones y certificaciones: v1 prioriza aceptación de archivos y certificaciones en R1.
- Dominio y reglas: v2 excelente mapeo PDN/RDN y progresión; v1 cumple con amplitud en R1.
- Datos/migración: v1 ampliamente superior (cohorte piloto, reconciliación).
- Observabilidad/trazabilidad: ambos fuertes; v1 concreta PDFs y evidencias desde R0/R1.
- Gestión de riesgos: v1 más explícito y operativo.
- Planificación (tiempos/hitos): v1 facilita scheduling; v2 sirve como mapa funcional macro.
- Estimación y capacity planning: v0 destaca con PCC por artefacto/fase, útil para dimensionar equipos y sprints.
- Tecnología/arquitectura: v0 define stack y módulos MDLO prescriptivos; v1 define plataformas operativas; v2 define el mapa funcional.

---

### Recomendación práctica (integrada)
- Combinar: usar R0 del v1 (jobs/archivos/CI/CD/seguridad) + base y artefactos técnicos del v0 (NestJS/Prisma, módulos, QA) y la secuenciación por etapas del v2 para el alcance funcional.
- Redefinir R1: alinearla con Etapa 1 de v2 (caso dependiente simple E2E) + certificaciones mínimas del v1 (BCH, SAP y GRIS) + entregables de evidencia; estimar con PCC del v0.
- Gobernar alcance: limitar excepciones en R1 a lo imprescindible; mover el resto a una “Etapa 7/R3” controlada.
- Mantener plantilla v2 por etapa como ficha de planificación; añadir a cada etapa el nivel de detalle de v1 (DoD, riesgos, dependencias, semanas, certificaciones) y la estimación PCC/roles del v0.
- Establecer mapeo Etapas↔Releases y ventanas regulatorias por hito.


