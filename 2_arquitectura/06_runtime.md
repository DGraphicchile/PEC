# 6. Vista de Ejecución (Runtime)

Escenarios y secuencias clave (resumen; ver detalles en MDLO v1 y `3_especificacion_tecnica/*`).

## 6.1 Otorgamiento de pensión
- Entradas: `HechoCausal`, `FichaPersona`, `MarcoNormativo` vigente.
- Flujo: VALID-* → CALC-OTG/PIM → crear `PrestacionEconomica` y EVT correspondiente.
- Salidas: `En_Evaluacion` → `Activa`/`Activa_Transitoria`/`Denegada`; evidencias y documentos.

Secuencia (Mermaid):

```mermaid
sequenceDiagram
  autonumber
  participant U as Usuario/Proceso
  participant OTG as OtorgamientoService
  participant FR as FrameworkResolverService
  participant DB as DB (SoR)
  participant AA as AppAudit

  Note over U,AA: correlation_id se propaga end-to-end

  U->>OTG: Solicitar otorgamiento (correlation_id)
  OTG->>FR: resolveByDate(fecha_siniestro)
  FR-->>OTG: MarcoNormativo (id: MN-*)
  OTG->>DB: VALID-* (idempotency_key en requests mutantes)
  OTG->>DB: CALC-OTG/PIM (usa MN-*)
  OTG->>DB: Crear PrestacionEconomica (ref MN-*)
  OTG->>AA: Registrar evidencia {correlation_id, marco_normativo_id, evidencia}
  OTG-->>U: Resultado (estado, referencias)
```

## 6.2 Ciclo de pago mensual
- Entradas: prestaciones activas, acuerdos de pago, parámetros del período, `MarcoNormativo` aplicable.
- Flujo: `PDN-PAG-002/003` (PIM/PLI); aplicar acuerdos; generar nómina bancaria, PREVIRED y comprobante SAP.
- Salidas: totales por nómina, eventos de aplicación, artefactos listos para envío.

Secuencia (Mermaid):

```mermaid
sequenceDiagram
  autonumber
  participant J as Job Scheduler
  participant PAG as PagoService
  participant FR as FrameworkResolverService
  participant DB as DB (SoR)
  participant AA as AppAudit
  participant W as WORM Storage

  Note over J,AA: correlation_id=batch_id
  Note over J,AA: dataset_hash de liquidaciones

  J->>PAG: Iniciar ciclo (periodo) (correlation_id)
  PAG->>FR: resolveByDate(periodo)
  FR-->>PAG: MarcoNormativo (id: MN-*)
  loop por prestación activa
    PAG->>DB: Calcular PIM (MN-*)
    PAG->>DB: Calcular PLI (MN-*)
    PAG->>DB: Guardar LiquidacionDePago {marco_normativo_id, hash_ejecucion}
  end
  PAG->>DB: Generar nómina (dataset_hash, idempotency_key)
  PAG->>W: Escribir archivo nómina (hash archivo)
  PAG->>AA: Registrar evidencias {dataset_hash, file_hash, correlation_id}
```

## 6.3 Reliquidación multi-marco
- Entradas: rango de períodos, cortes de marco, directiva activa.
- Flujo: ejecutar por mes con `FrameworkResolverService`; registrar evidencia del marco aplicado.
- Salidas: nuevas liquidaciones/ajustes; evidencia de marcos aplicados por período.

Secuencia (Mermaid):

```mermaid
sequenceDiagram
  autonumber
  participant U as Usuario/Proceso
  participant REL as Reliquidacion (Orquestador)
  participant FR as FrameworkResolverService
  participant DB as DB (SoR)
  participant AA as AppAudit

  Note over U,AA: correlation_id
  Note over U,AA: MarcoNormativo aplicado por período

  U->>REL: Solicitar reliquidación (rango)
  loop por mes del rango
    REL->>FR: resolveByDate(fecha_mes)
    FR-->>REL: MarcoNormativo (id: MN-*)
    REL->>DB: Recalcular (PIM/PLI) con MN-*
    REL->>DB: Guardar LiquidacionDePago {marco_normativo_id, hash_ejecucion}
    REL->>AA: Evidencia {mes, marco_normativo_id}
  end
  REL-->>U: Resultado y evidencias
```

## 6.4 Gestión de excepciones y VERF
- Entradas: EXD/EXP, roles autorizados.
- Flujo: diagnóstico, plan de acción, aprobación (VERF), ejecución y cierre.
- Salidas: eventos de negocio y actualización de proyecciones.

Secuencia (Mermaid):

```mermaid
sequenceDiagram
  autonumber
  participant DET as Proceso Detecta EXD
  participant GOB as Gobernanza (PDN-GOB-001)
  participant VERF as VERF (Aprobador)
  participant DB as DB (SoR)
  participant AA as AppAudit

  Note over DET,AA: correlation_id
  Note over DET,AA: evidencia obligatoria por transición

  DET->>GOB: Crear IncidenteDeDominio (correlation_id)
  GOB->>AA: Evidencia de registro (CUN?, EXD)
  GOB->>VERF: Solicitar aprobación plan (VERF)
  VERF-->>GOB: Aprobación/ rechazo (firma, usuario)
  GOB->>DB: Ejecutar corrección (auditable)
  GOB->>AA: Evidencia de resolución/cierre
```
