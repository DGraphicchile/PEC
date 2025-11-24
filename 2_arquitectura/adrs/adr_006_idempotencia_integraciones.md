# ADR-006: Idempotencia e integridad en integraciones masivas (Banco, PREVIRED, SAP)

- Estado: Propuesta
- Fecha: 2025-08-09
- Deciders: Javier Errazuriz
- Authors: Javier Errazuriz

## Contexto
- Los procesos de pago y reportería dependen de archivos masivos y reintentos controlados. El riesgo de duplicidades o inconsistencias debe mitigarse.
- Se requieren SLIs de idempotencia (0 duplicados/mes) y verificaciones de cuadratura.

## Decisión
- Emplear claves `idempotency_hash` por operación externa (por fila) y por archivo, con persistencia para evitar reaplicaciones.
- Implementar reconciliaciones y cuadraturas para nóminas bancarias, PREVIRED y SAP.
- Gestionar DLQ y replays controlados con trazabilidad de causa y efecto.

## Alternativas consideradas
- Confiar en idempotencia del proveedor externo (riesgo alto; control limitado).

## Consecuencias
- (+) Reducción de duplicidades; recuperabilidad ante fallos; auditoría sólida.
- (–) Overhead de almacenamiento y procesos de reconciliación.

## Acciones
- Definir formatos de hash por integración y políticas de retención.
- Implementar validaciones previas y posteriores a envíos (cuadraturas, totales por estado).
- Documentar recetas operativas: `3_especificacion_tecnica/operacion/02_idempotencia.md`.

## Preguntas abiertas (para validación)
- ¿Cuál es la ventana de retención de `idempotency_hash` por integración (banco/PREVIRED/SAP)?
- ¿Qué métricas específicas (SLIs) se monitorearán y con qué umbrales de alerta?
- ¿Cómo se manejarán correcciones manuales fuera de sistema (archivos re-hechos)?

## Referencias
- MDLO v1: Anexos E (Interfaces) y G (EV)
- arc42: §6, §7, §10

