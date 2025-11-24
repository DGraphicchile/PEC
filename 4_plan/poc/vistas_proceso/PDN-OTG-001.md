# Vista Detallada de Proceso: PDN-OTG-001 - Consolidación de Rentas para Cálculo

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Propósito y Contexto

El **PDN-OTG-001** es un proceso de negocio automático y crítico que se activa tras el registro de un `HechoCausal` (siniestro). Su único objetivo es analizar el historial de ingresos de un trabajador para calcular un **Sueldo Base de Cálculo** único, auditable y normalizado. 

Este sueldo base es el principal insumo para el posterior proceso de otorgamiento (`PDN-OTG-002`), que determinará el monto de la pensión o indemnización.

## 2. Diagrama de Flujo

```mermaid
graph TD
    A[Inicio: HechoCausal Registrado] --> B{Resolver Marco Normativo Aplicable};
    B --> C{Determinar Tipo de Trabajador};
    C -->|Dependiente| D[Ejecutar RDN: CALC-OTG-001];
    C -->|Independiente| E[Ejecutar RDN: CALC-OTG-001-IND (Variación)];
    D --> F[Obtener Rentas Históricas];
    E --> F;
    F --> G{Validar Suficiencia de Datos (VALID-DATOS-001)};
    G -->|No Cumple| H[Gatillar Excepción EXD-DATOS-002];
    G -->|Cumple| I[Aplicar Topes Legales por Renta];
    I --> J[Calcular Promedio];
    J --> K[Persistir Entidad 'CalculoSueldoBase'];
    K --> L[Fin: Sueldo Base Disponible];
    H --> M[Fin: Proceso Detenido];
```

## 3. Etapas del Proceso (EDN)

1.  **`EDN-OTG-001-1: Identificar Contexto de Cálculo`**
    - El proceso recibe un `hechoCausalId`.
    - Se obtiene la `fechaSiniestro` y los datos de la `FichaPersona` asociada.
    - Se invoca al `FrameworkResolverService` con la `fechaSiniestro` para obtener el `MarcoNormativo` que regirá todo el cálculo.

2.  **`EDN-OTG-001-2: Seleccionar Estrategia de Cálculo`**
    - Basándose en el tipo de trabajador (dependiente, independiente) y la directiva del marco, se selecciona la regla principal a ejecutar (ej. `CALC-OTG-001`).

3.  **`EDN-OTG-001-3: Ejecutar Reglas de Negocio`**
    - Se orquesta la ejecución de la secuencia de RDNs. El `RuleExecutorService` se encarga de instanciar la versión correcta de cada regla según la directiva.

4.  **`EDN-OTG-001-4: Persistir Resultado o Excepción`**
    - Si el cálculo es exitoso, se crea una instancia inmutable de la entidad `CalculoSueldoBase`, que almacena el monto final y el `marcoNormativoId` utilizado para la trazabilidad.
    - Si una validación clave falla (como la suficiencia de datos), el proceso se detiene y se genera un `IncidenteDeDominio` con el código `EXD-DATOS-002` para que sea revisado por un analista.

## 4. Reglas de Negocio (RDN) Involucradas

- **`CALC-OTG-001`: Cálculo Sueldo Base para Dependientes**
    - **Propósito:** Regla principal que orquesta el cálculo para trabajadores con contrato.
    - **Lógica Detallada:**
        1.  Consume el parámetro `mesesCalculoSueldoBase` desde el `MarcoNormativo` (ej. 6 meses).
        2.  Invoca a una regla interna o repositorio para obtener las remuneraciones imponibles de los últimos `N` meses previos al siniestro.
        3.  Invoca la regla `VALID-DATOS-001` para asegurar que se tiene el mínimo de rentas requeridas.
        4.  Para cada renta mensual, invoca la regla `Aplicar-Tope-Imponible`.
        5.  Calcula el promedio de las rentas ya topeadas.
        6.  Retorna el `SueldoBase` final.

- **`VALID-DATOS-001`: Validación de Suficiencia de Datos**
    - **Propósito:** Asegurar que existen suficientes datos históricos para realizar un cálculo normativamente válido.
    - **Lógica Detallada:**
        1.  Recibe la lista de rentas históricas obtenidas.
        2.  Consume el parámetro `minimoMesesRenta` del `MarcoNormativo`.
        3.  Compara el número de rentas obtenidas con el mínimo requerido. Si es menor, retorna `false` y gatilla la excepción `EXD-DATOS-002`.

- **`RDN-INTERNA: Aplicar-Tope-Imponible`**
    - **Propósito:** Normalizar cada renta mensual según el tope imponible legal vigente en *ese mes*.
    - **Lógica Detallada:**
        1.  Recibe una renta y el mes al que corresponde.
        2.  Consulta un servicio de indicadores económicos para obtener el valor de la UF o UTM para ese mes histórico.
        3.  Consume el parámetro `topeImponibleUf` del `MarcoNormativo`.
        4.  Calcula el tope en CLP para ese mes (`valor_uf * topeImponibleUf`).
        5.  Retorna `min(renta, tope_en_clp)`.

## 5. Entradas y Salidas

- **Entrada Principal:**
    - `hechoCausalId: string`

- **Salidas Posibles:**
    - **Éxito:** Una nueva entidad `CalculoSueldoBase` persistida en la base de datos.
    - **Fallo:** Una nueva entidad `IncidenteDeDominio` con el código `EXD-DATOS-002`.
