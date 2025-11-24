# ADR-004: Catálogo de Conceptos de Liquidación (CCL) como fuente única de verdad

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- MDLO v1 define un Catálogo de Conceptos de Liquidación (CCL) que estandariza haberes y descuentos con códigos, descripciones, regla RDN asociada y fundamento normativo.
- Se requiere consistencia entre cálculo, reportería y contabilidad, y trazabilidad transparente a la normativa.

## Decisión
- El CCL será la fuente única de verdad para cualquier `ConceptoLiquidacion` en el sistema.
- Cada línea de liquidación deberá referenciar un código del CCL y opcionalmente un fundamento normativo específico.
- Cambios al CCL siguen versionado y política de aprobación (VERF) con pruebas de regresión.

## Alternativas consideradas
- Definir conceptos dispersos por módulo (riesgo de divergencia y duplicidad).
- Generar conceptos ad-hoc en runtime (opacidad normativa y contable).

## Consecuencias
- (+) Unificación semántica; mejor comunicación y auditoría; reportería consistente.
- (–) Necesidad de gobierno del catálogo y tooling de validación y publicación.

## Acciones
- Definir esquema y repositorio del CCL; validar referencialidad en el dominio (`ConceptoLiquidacion.CodigoConcepto`).
- Incorporar validaciones en CI para evitar códigos huérfanos/duplicados.

## Preguntas abiertas (para validación)
- ¿El CCL debe incluir cuentas contables SAP por código o mantenerse externo con mapeo por período?
- ¿Requiere multi-idioma o descripciones “para beneficiario” vs “técnicas” separadas?
- ¿Qué subtaxonomía adicional se necesita (por ejemplo, agrupaciones para reportes)?

## Referencias
- MDLO v1: `1_dominio/03_Glosario_y_Catalogos.md` (CCL)
- arc42: §5, §8, §10

