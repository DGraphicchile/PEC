# ADR-001: Uso de arc42 como marco y estructura de documentación

- Estado: Aceptada
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- Se requiere organizar la documentación técnica de forma coherente, mantenible y comunicable para múltiples interesados.
- La especificación crece en amplitud (datos, normativa/SNA, seguridad, integraciones, operación, pruebas, performance) y profundidad (guías, políticas, decisiones).
- Fuerzas (drivers):
  - Claridad y navegabilidad para stakeholders técnicos y de negocio.
  - Trazabilidad entre decisiones (ADRs), vistas de arquitectura y especificación detallada.
  - Alineamiento con prácticas reconocidas de documentación.

## Decisión
- Adoptar arc42 como marco de documentación de arquitectura.
- Implementar el directorio `2_arquitectura/` con las 12 secciones oficiales (01–12), numeradas y enlazadas desde `README.md`.
- Mantener `3_especificacion_tecnica/*` como repositorio autoritativo de vistas profundas por tema.
- Usar la sección 5 (Building Blocks) como “portal” hacia dichas vistas autoritativas.

## Alcance de la implementación
- Creación de archivos base: `01_introduccion_objetivos.md` … `12_glosario.md`.
- Índice en `README.md` con los 12 apartados y enlaces a `3_especificacion_tecnica/*`.
- Migración del antiguo “CEN” a Building Blocks + vistas autoritativas.

## Alternativas consideradas
1) Estructura ad-hoc por carpetas temáticas sin marco
- Pros: rapidez inicial; flexibilidad total.
- Contras: deriva y duplicidad; difícil onboarding; nula estandarización.

2) 4+1/C4 únicamente (sin plantilla de calidad/proceso)
- Pros: foco visual en arquitectura; comunicación sencilla.
- Contras: no cubre requisitos de calidad, riesgos, decisiones ni gobernanza documental de forma integral.

## Consecuencias
- Positivas
  - Consistencia y trazabilidad entre decisiones y vistas.
  - Onboarding más fácil; referencias cruzadas claras.
  - Facilidad para auditar y evolucionar documentación.
- Negativas
  - Disciplina para mantener numeración y enlaces.
  - Overhead inicial de estructura y convenciones.

## Convenciones y estilo
- Nombrado: `NN_nombre.md` (NN = 01..12) según arc42.
- Idioma: español; títulos consistentes con la plantilla arc42.
- Enlaces relativos preferidos dentro del repo.
- Política de numeración/ubicación de ADRs: `2_arquitectura/adrs/adr-NNN_<slug>.md; numeración secuencial y monótona; no reutilizar números; marcar “Superseded by ADR-XXX” cuando corresponda (ver ADR-000).

## Flujo de contribución
- Nuevas decisiones: ADRs en `2_arquitectura/adrs/` y referencia en sección 9.
- Cambios sustantivos: PR con revisión técnica; actualizar enlaces en `README.md` y Building Blocks.
- Etiquetas sugeridas de commit/PR: `docs(arc42)`, `docs(datos)`, `docs(eventos-auditoria)`.

## Historial de estado
- 2025-08-09: Proposed → Accepted (Javier Errazuriz)

## Referencias
- ADR-000: Adopción de ADRs (Nygard): `2_arquitectura/adrs/adr_000_adoptar_adr_nygard.md`
- arc42 Template Overview: https://r.jina.ai/arc42.org/overview
- Documenting Architecture Decisions (Michael Nygard): https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
