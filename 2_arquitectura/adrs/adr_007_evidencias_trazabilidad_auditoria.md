# ADR-007: Estrategia de evidencias y trazabilidad para auditoría y reportería

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- Auditorías regulatorias y revisiones internas requieren evidencias claras: por qué, cómo y bajo qué marco se tomó una decisión o se calculó un monto.
- Es necesario definir un mínimo común de evidencia vinculada a transacciones, eventos y artefactos generados.

## Decisión
- Registrar por transacción/liquidación: IDs de `MarcoNormativo` aplicado (parámetros/directiva), hash del conjunto, `correlation_id/causation_id` y referencias a documentos/resultados.
- Mantener `ExpedienteDeTramite` como contenedor auditable (CUN) y vincular evidencias y comunicaciones (COMM-*).
- Estandarizar formatos de evidencias (metadatos obligatorios) y políticas de retención.

## Alternativas consideradas
- Evidencias ad-hoc por módulo (heterogeneidad; riesgo de omisiones).

## Consecuencias
- (+) Respuestas rápidas a auditorías; trazabilidad end-to-end.
- (–) Esfuerzo inicial de estandarización y capacitación.

## Acciones
- Definir esquema de metadatos y contratos de evidencias; integrar con `AppAudit` y almacenamiento seguro.
- Incluir en EV (Anexo G) verificaciones de presencia de evidencias mínimas.

## Preguntas abiertas (para validación)
- ¿Cuál es el set mínimo de metadatos de evidencia requerido por Cumplimiento? (ej. hash de ejecución, usuario, timestamp, IDs de artefactos)
- ¿Qué plazos de retención aplican por tipo de evidencia y por ente regulador?
- ¿Cuándo requiere VERF explícito (firma) y bajo qué roles?

## Referencias
- 1_dominio/05_Procesos_de_Negocio.md, 1_dominio/08_Eventos_y_Excepciones.md
- arc42: §6, §8, §10, §11

