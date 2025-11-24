# ADR-003: Gobierno del Marco Normativo y Resolver de Versiones

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- La normativa que regula prestaciones evoluciona de forma discontinua. Necesitamos reproducibilidad exacta de cálculos históricos y seguridad en cambios.
- MDLO v1 define `MarcoNormativo` como la composición de `ParametrosNormativos (params-vX.Y.Z)` y `DirectivaDeEjecucion (logic-vX.Y.Z)` con `Vigencia`.
- Se requiere un `FrameworkResolverService` que, dada una fecha o ID de marco, ensamble el contexto de ejecución correcto y evidencie su uso.

## Decisión
- Adoptar `MarcoNormativo` como unidad de gobierno normativo con:
  - Repositorio de parámetros versionado (SemVer) e inmutable.
  - Repositorio de directivas de ejecución (mapa PDN/RDN→versión) versionado (SemVer) e inmutable.
  - Registro de marcos con vigencias sin solapes y estados (propuesto/activo/retirado).
- Implementar `FrameworkResolverService` con API pública `resolveByDate` y `resolveById`, registrando evidencia del marco aplicado por transacción/liquidación.
- Validar en CI/CD matrices de versión y ausencia de solapes antes de activar un marco.

## Alternativas consideradas
- Fijar parámetros/rules por registro (aumenta cardinalidad y complica operación).
- Asumir “último vigente” en huecos de vigencia (riesgo regulatorio; no trazable).

## Consecuencias
- (+) Reproducibilidad y gobernanza claras; activación controlada; auditoría robusta.
- (–) Overhead en gestión de versiones y matrices; necesidad de tooling.

## Acciones
- Especificar esquemas de repositorios y contratos de `FrameworkResolverService` (ver arc42 §8 y MDLO v1 cap. 12).
- Integrar validaciones de matrices en pipeline de publicación de marcos.

## Preguntas abiertas (para validación)
- ¿Cuáles son los estados formales del ciclo de vida de un `MarcoNormativo` (propuesto, validado, activo, retirado, superseded)?
- ¿Se requiere fallback explícito para huecos de vigencia (por política), o se debe rechazar la operación con error controlado?
- ¿Qué artefactos constituyen la “evidencia mínima” por transacción/liquidación: IDs de parámetros/directiva, hash del conjunto, firma temporal?
- ¿Se necesita auditoría de “quién activó” un marco y bajo qué aprobación (VERF)?

## Referencias
- MDLO v1: `1_dominio/12_Versionamiento_Normativo_y_Resolucion.md`
- arc42: §4, §5, §8, §10

