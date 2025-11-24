# ADR-005: Modelo unificado de Acuerdos de Pago y aplicación en liquidación

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- El dominio requiere modelar acuerdos que alteran destino/composición del pago: apoderados, curadores, retenciones judiciales, convenios CCAF, pagos directos AF, etc.
- MDLO v1 propone un modelo central con `AcuerdoDePago` + `MetodoDePago` + `ConfiguracionDescuento` y procesos PDN asociados.

## Decisión
- Unificar acuerdos en la entidad `AcuerdoDePago` con tipificación y vigencias, enlazada a `PrestacionEconomica` y `FichaPersona` del cobrador.
- Aplicar acuerdos en `PDN-PAG-003` (PLI) mediante reglas `CALC-PLI-007/008/011` y validaciones `VALID-ACUERDO-*`.
- Exigir VERF cuando corresponda (mandatos, retenciones, etc.) y registrar evidencia documental.

## Alternativas consideradas
- Modelos separados por tipo de acuerdo (complejidad y duplicidad de lógica).
- Incrustar datos de acuerdo directamente en liquidaciones (pérdida de gobernanza/vida útil del acuerdo).

## Consecuencias
- (+) Consistencia y trazabilidad; reglas reutilizables para aplicar acuerdos; menor duplicidad.
- (–) Necesidad de tooling para gestionar vida útil de acuerdos y prioridades.

## Acciones
- Normalizar catálogo de tipos y prioridades; definir política de conflictos entre acuerdos.
- Validaciones de vigencia, límites legales y consistencia con CCL.

## Preguntas abiertas (para validación)
- ¿Cuál es la política de prioridad y composición de múltiples acuerdos activos en el mismo período?
- ¿Mandatos (apoderados) deben caducar automáticamente a los 2 años o requieren verificación documental periódica manual?
- ¿Se deben notificar cambios de cobrador a entes externos automáticamente?

## Referencias
- MDLO v1: `1_dominio/04_Modelo_de_Entidades.md` (Acuerdos) y `05_Procesos_de_Negocio.md`
- arc42: §5, §6, §8

