# Anexo A: Glosario y Catálogos

*Propósito: Definir y centralizar todos los vocabularios controlados (listas de valores, enumeraciones) que se utilizan a lo largo del dominio. Este anexo es la fuente única de verdad para los valores permitidos en los atributos de las entidades.*

---

## 1. Catálogos de Estado y Tipología

### 1.1. Catálogo de Estados de `PrestacionEconomica`
*Define el estado principal en el ciclo de vida de un beneficio.*

| Estado | Descripción |
| :--- | :--- |
| `En_Evaluacion` | La prestación ha sido solicitada y se están recopilando y validando antecedentes. |
| `Activa` | La prestación ha sido aprobada y está generando pagos. |
| `Activa_Transitoria` | La prestación corresponde a una **Pensión de Invalidez Total Transitoria**, otorgada al agotarse el período máximo de subsidio (104 semanas) mientras existen terapias pendientes. No es un estado genérico. |
| `Denegada` | La solicitud de prestación ha sido rechazada formalmente. |
| `Suspendida` | El pago de la prestación ha sido detenido temporalmente por una causa específica (ver Códigos de Inactivación). |
| `Cesada` | El derecho a la prestación ha terminado de forma definitiva. |
| `Otorgada_Retenida` | Se ha otorgado el derecho, pero el pago está retenido hasta que se regularice una condición (ej. deuda de cotizaciones). |
| `En_Revision` | La prestación está siendo re-evaluada por una solicitud de revisión o un dictamen. |

### 1.2. Catálogo de Códigos de Inactivación
*Detalla la razón específica por la cual una `PrestacionEconomica` se encuentra en estado `Suspendida` o `Cesada`.*

| Código | Descripción Larga | Estado Asociado |
| :--- | :--- | :--- |
| `0` | Sin Inactivación (Activa) | `Activa` |
| `1` | Cese por Cumplimiento de Edad de Vejez | `Cesada` |
| `2` | Cese por Nuevo Vínculo (Matrimonio/AUC) | `Cesada` |
| `3` | Cese por Fallecimiento del Beneficiario | `Cesada` |
| `10` | Suspensión Viudez por Inactivación de Carga Familiar | `Suspendida` |
| `11` | Suspensión Orfandad por Falta de Certificado de Estudios | `Suspendida` |
| `12` | Suspensión por Negativa a Tratamiento | `Suspendida` |

### 1.3. Catálogo de Tipos de `PrestacionEconomica`

| Tipo | Descripción |
| :--- | :--- |
| `Indemnizacion` | Pago único por incapacidad permanente parcial. |
| `PensionInvalidezParcial` | Pensión mensual por invalidez parcial. |
| `PensionInvalidezTotal` | Pensión mensual por invalidez total. |
| `PensionInvalidezTransitoria`| Pensión mensual de carácter temporal. |
| `PensionSobrevivencia` | Pensión para beneficiarios de un causante fallecido. |

### 1.4. Catálogo de Tipos de `HechoCausal` (Siniestro)

| Tipo | Descripción |
| :--- | :--- |
| `AccidenteTrabajo` | Accidente ocurrido a causa o con ocasión del trabajo. |
| `AccidenteTrayecto` | Accidente ocurrido en el trayecto directo entre la habitación y el lugar de trabajo. |
| `EnfermedadProfesional` | Enfermedad causada de manera directa por el ejercicio de la profesión. |
| `Fallecimiento` | Muerte del trabajador o pensionado. |

---

## 2. Catálogos de Actores y Acuerdos

### 2.1. Catálogo de Roles y Terceros

| Rol | Descripción |
| :--- | :--- |
| `Trabajador` | La persona que origina el derecho a prestación. |
| `BeneficiarioSobrevivencia` | Persona con derecho a pensión de sobrevivencia. |
| `CausanteAsignacionFamiliar` | Carga familiar reconocida que genera derecho a asignación. |
| `Apoderado` | Persona con poder para actuar en nombre de un beneficiario. |
| `Empleador` | Entidad para la cual el trabajador presta servicios. |
| `OrganismoAdministrador` | Mutualidad o ISL. |
| `EnteRegulador` | SUSESO, COMERE, etc. |
| `EntidadExterna` | Cualquier otra institución (ej. AFP, Isapre, CCAF). |

#### 2.1.1. Catálogo de Tipos de Beneficiario de Sobrevivencia

| Tipo | Descripción |
| :--- | :--- |
| `CONYUGE` | Cónyuge sobreviviente. |
| `CONVIVIENTE_CIVIL` | Conviviente civil sobreviviente, en virtud de un Acuerdo de Unión Civil (AUC) vigente. |
| `HIJO_MENOR` | Hijo menor de 18 años. |
| `HIJO_ESTUDIANTE` | Hijo mayor de 18 y menor de 24 años, que acredite estudios. |
| `HIJO_INVALIDO` | Hijo inválido de cualquier edad. |
| `MADRE_HIJOS_CAUSANTE` | Madre de los hijos del causante (soltera, viuda o divorciada) que vivía a expensas de éste. |
| `PADRES_CAUSANTE` | Padre o madre del causante que vivían a expensas de éste. |

### 2.2. Catálogo de Tipos de `AcuerdoDePago`
*Clasifica la naturaleza legal y funcional de cualquier instrucción que altere el pago de una prestación.*

| Tipo | Descripción |
| :--- | :--- |
| `PagoTitular` | El beneficiario de la prestación es el cobrador por defecto. |
| `Apoderado` | Un tercero cobra en nombre del titular, con poder notarial. |
| `Curador` | Un tercero cobra en nombre de un titular declarado interdicto. |
| `RetencionJudicial` | Un tercero (demandante) recibe una parte de la pensión por orden de un tribunal. |
| `PagoDirectoAsignacionFamiliar` | Un causante de asignación familiar solicita recibir el monto de ese beneficio directamente. |
| `DescuentoInternoProgramado` | Descuento por deudas internas (ej. Asignación Familiar indebida), a menudo en cuotas. |
| `DescuentoExternoConvenio` | Descuento por convenios con terceros (ej. CCAF). |

---

## 3. Catálogos de Liquidación y Financieros

### 3.1. Catálogo de Conceptos de Liquidación (CCL)

#### 3.1.1. Propósito y Estructura

El Catálogo de Conceptos de Liquidación (CCL) es el registro maestro y la fuente única de verdad para cada línea de haber o descuento que puede componer una `LiquidacionDePago`. Su propósito es estandarizar la nomenclatura, asociar cada concepto a una regla de negocio específica y vincularlo a su fundamento normativo.

Cada `ConceptoLiquidacion` en el sistema debe originarse a partir de una entrada en este catálogo.

La estructura del catálogo es la siguiente:
- **Código Concepto:** Identificador único y programático del concepto. Sigue la nomenclatura `TIPO-ORIGEN-ID`.
- **Descripción:** Nombre funcional y claro del concepto, tal como podría aparecer en una liquidación para el beneficiario.
- **Tipo:** Define la naturaleza contable del concepto:
    - `Haber`: Suma al monto bruto de la liquidación.
    - `Descuento`: Resta del monto bruto de la liquidación.
- **Regla de Negocio (RDN) Asociada:** La regla de cálculo (`CALC`) específica que determina el monto del concepto.
- **Fuente Normativa:** Referencia directa al artículo o sección del Compendio u otra ley que fundamenta la existencia y cálculo del concepto.

#### 3.1.2. Catálogo Detallado

##### A. Conceptos de Tipo HABER

| Código Concepto | Descripción | Tipo | Regla de Negocio (RDN) Asociada | Fuente Normativa |
| :--- | :--- | :--- | :--- | :--- |
| **`HAB-BASE-001`** | Monto Base de Pensión | `Haber` | `CALC-OTG-001` / `CALC-OTG-002` | Ley N°16.744, Art. 39, 40 |
| **`HAB-ASIGFAM-001`** | Asignación Familiar | `Haber` | `CALC-PLI-003` | D.F.L. N°150, de 1981, Art. 2 |
| **`HAB-BONLEY-19403`** | Bonificación Ley N°19.403 | `Haber` | `CALC-PIM-001` | Ley N°19.403 |
| **`HAB-BONLEY-19539`** | Bonificación Ley N°19.539 | `Haber` | `CALC-PIM-002` | Ley N°19.539 |
| **`HAB-BONLEY-19953`** | Bonificación Ley N°19.953 | `Haber` | `CALC-PIM-003` | Ley N°19.953 |
| **`HAB-GRANINV-001`** | Suplemento por Gran Invalidez | `Haber` | `CALC-PIM-004` | Ley N°16.744, Art. 40 |
| **`HAB-INCHJ-001`** | Incremento por Hijo (Asig. Familiar) | `Haber` | `CALC-PIM-005` | Ley N°16.744, Art. 41 |
| **`HAB-PGU-001`** | Pensión Garantizada Universal (PGU) | `Haber` | `CALC-PLI-004` | Ley N°21.419 |
| **`HAB-BONEX-20531`** | Bonificación Fiscal Salud Ley N°20.531 | `Haber` | `CALC-PLI-005` | Ley N°20.531 |

##### B. Conceptos de Tipo DESCUENTO

| Código Concepto | Descripción | Tipo | Regla de Negocio (RDN) Asociada | Fuente Normativa |
| :--- | :--- | :--- | :--- | :--- |
| **`DESC-SALUD-001`** | Cotización Legal de Salud (7%) | `Descuento` | `CALC-PLI-001` | D.L. N°3.500, Art. 85 |
| **`DESC-SALUD-002`** | Cotización Adicional de Salud (ISAPRE) | `Descuento` | `CALC-PLI-001` | D.L. N°3.500, Art. 85 |
| **`DESC-PREV-001`** | Cotización Previsional (AFP/IPS) | `Descuento` | `CALC-PLI-002` | Ley N°16.744, Art. 54 |
| **`DESC-CCAF-001`** | Descuento por Crédito Social CCAF | `Descuento` | `CALC-PLI-008` | (Convenio con `AcuerdoDePago`) |
| **`DESC-RETJUD-001`** | Retención Judicial (Pensión de Alimentos) | `Descuento` | `CALC-PLI-007` | (Orden judicial) |
| **`DESC-DEUDA-001`** | Descuento por Deuda de Indemnización | `Descuento` | (Interactúa con la entidad `Deuda`) | Ley N°16.744, Art. 35 (modificado por reclamo) |
| **`DESC-DEUDA-002`** | Descuento por Préstamo Interno | `Descuento` | (Interactúa con la entidad `Deuda`) | (Política interna) |
| **`DESC-SIND-001`** | Cuota Sindical | `Descuento` | (Convenio con sindicato) | (Autorización del beneficiario) |
| **`DESC-BIENS-001`** | Descuento por Bienestar | `Descuento` | (Convenio con Bienestar) | (Autorización del beneficiario) |
| **`DESC-IMPTO-001`** | Impuesto Único de Segunda Categoría | `Descuento` | `CALC-IMP-001` | Ley sobre Impuesto a la Renta, Art. 42 |


### 3.2. Catálogo de Bancos
*Contiene los códigos y nombres de todas las entidades bancarias nacionales. (Fuente: `CPS-PME-AGR-001`, Apéndice 9.1)*

### 3.3. Catálogo de Tipos de Cuenta Bancaria
*Contiene los tipos de cuenta válidos para realizar pagos. (Fuente: `CPS-PME-AGR-001`, Apéndice 9.2)*

| Código | Descripción |
| :--- | :--- |
| `CC` | Cuenta Corriente |
| `CV` | Cuenta Vista / RUT |
| `CA` | Cuenta de Ahorro |

### 3.4. Catálogo de Países (ISO 3166-1)
*Contiene los códigos de país para la gestión de pagos en el extranjero.*

---

## 4. Configuración Normativa y Versionamiento

### 4.1. MarcoNormativo
*`MarcoNormativo` es la unidad coherente y versionada que referencia una versión de `ParametrosNormativos` (SemVer `params-vX.Y.Z`) y una versión de `DirectivaDeEjecucion` (SemVer `logic-vX.Y.Z`), con un período de `Vigencia` (inicio/fin). Cada cálculo en el sistema se ejecuta en el contexto de un `MarcoNormativo`, garantizando auditabilidad y reproducibilidad.*

### 4.2. Definiciones
- **`ParametrosNormativos`**: Artefacto inmutable (SemVer) que contiene valores, topes, porcentajes, plazos y tablas normativas.
- **`DirectivaDeEjecucion`**: Artefacto inmutable (SemVer) que mapea identificadores de `PDN`/`RDN` a su versión (`vN`).
- **`Vigencia`**: Intervalo con `inicio` y `fin` (este último puede ser `null`). No deben existir solapes para un mismo ámbito.
- **`FrameworkResolverService`**: Servicio que resuelve el `MarcoNormativo` aplicable según contexto (p. ej., fecha) y ensambla los artefactos.

### 4.3. Nomenclaturas e Identificadores
- **PDN**: `PDN-<DOMINIO>-<CÓDIGO>`; versión `vN`.
- **RDN**: `<CATEGORÍA>-<CÓDIGO>`; versión `vN`.
- **Parámetros**: `params-vX.Y.Z` (SemVer).
- **Directiva**: `logic-vX.Y.Z` (SemVer).
- **Marco**: `MN-YYYY-<CLAVE>`.

Para matrices y ejemplos, ver el capítulo `12_Versionamiento_Normativo_y_Resolucion.md`.
