# Guía Técnica: Aplicación de PERT en una WBS 📊

Esta guía detalla el proceso técnico para integrar la **Técnica de Evaluación y Revisión de Programas (PERT)** con una **Estructura de Desglose del Trabajo (WBS)**. La combinación de ambas herramientas permite no solo estimar la duración de un proyecto, sino también cuantificar su incertidumbre y riesgo.

---

##  Prerequisites

Antes de comenzar, es indispensable tener una **WBS completa y bien definida**. El trabajo debe estar desglosado hasta el nivel más bajo, conocido como **Paquete de Trabajo**. Las estimaciones PERT se aplicarán a cada uno de estos paquetes.

---

## Proceso de Aplicación PERT

Sigue estos pasos para cada paquete de trabajo identificado en tu WBS.

### Paso 1: Estimación de Tres Puntos

Para cada paquete de trabajo, reúne al equipo o a los expertos responsables y obtén tres estimaciones de duración:

* **Optimista (O):** El tiempo mínimo posible. Representa el escenario "mejor caso", donde todo sale a la perfección, sin retrasos ni imprevistos.
* **Más Probable (M):** La estimación más realista. Considera una cantidad normal de problemas y contratiempos. Es la duración que ocurriría con mayor frecuencia si el trabajo se repitiera muchas veces.
* **Pesimista (P):** El tiempo máximo posible. Representa el escenario "peor caso", donde se materializan riesgos significativos (Ley de Murphy).

> **Nota:** La clave es que la diferencia entre (M) y (P) suele ser mayor que entre (O) y (M), ya que hay más factores que pueden retrasar una tarea que acelerarla.



### Paso 2: Calcular la Duración Esperada (Te)

La fórmula PERT utiliza una media ponderada para calcular la duración más probable o **esperada (Te)**, dando cuatro veces más peso a la estimación más probable.

La fórmula es:
$$
T_e = \frac{O + 4M + P}{6}
$$

**Ejemplo:** Para el paquete de trabajo "1.2.1 Desarrollar API de Autenticación":
* Estimación Optimista (O) = 8 días
* Estimación Más Probable (M) = 10 días
* Estimación Pesimista (P) = 24 días

$$
T_e = \frac{8 + 4(10) + 24}{6} = \frac{8 + 40 + 24}{6} = \frac{72}{6} = 12 \text{ días}
$$
La duración esperada para este paquete es de **12 días**.

### Paso 3: Calcular la Incertidumbre (Varianza y Desviación Estándar)

PERT permite medir el nivel de incertidumbre o riesgo de cada estimación.

1.  **Desviación Estándar (σ):** Mide la dispersión de la estimación. Una desviación alta implica mayor incertidumbre.
    $$
    \sigma = \frac{P - O}{6}
    $$
    Para nuestro ejemplo:
    $$
    \sigma = \frac{24 - 8}{6} = \frac{16}{6} \approx 2.67 \text{ días}
    $$

2.  **Varianza (σ²):** Es simplemente la desviación estándar al cuadrado. Este valor es fundamental para agregar la incertidumbre total del proyecto.
    $$
    \sigma^2 = \left( \frac{P - O}{6} \right)^2
    $$
    Para nuestro ejemplo:
    $$
    \sigma^2 \approx (2.67)^2 \approx 7.11
    $$

### Paso 4: Agregar las Estimaciones en la WBS

Ahora, documenta estos cálculos y súmalos para obtener las cifras totales del proyecto.

1.  **Duración Total del Proyecto:** Suma las duraciones esperadas (Te) de **todos** los paquetes de trabajo en la ruta crítica.
    $$
    T_{e(\text{Proyecto})} = \sum T_{e(\text{Paquete})}
    $$

2.  **Varianza Total del Proyecto:** Suma las varianzas (σ²) de **todos** los paquetes de trabajo en la ruta crítica.
    > **¡Importante!** Se suman las varianzas, no las desviaciones estándar.
    $$
    \sigma^2_{(\text{Proyecto})} = \sum \sigma^2_{(\text{Paquete})}
    $$

3.  **Desviación Estándar Total del Proyecto:** Calcula la raíz cuadrada de la varianza total del proyecto.
    $$
    \sigma_{(\text{Proyecto})} = \sqrt{\sigma^2_{(\text{Proyecto})}}
    $$

### Ejemplo de Tabla WBS con PERT

| WBS | Paquete de Trabajo | O | M | P | Duración Esperada (Te) | Varianza (σ²) |
| :-- | :--- |:-:|:-:|:-:|:---:|:---:|
| 1.1 | Módulo A | 5 | 8 | 11 | 8.00 | 1.00 |
| 1.2 | Módulo B | 8 | 10| 24 | 12.00| 7.11 |
| 1.3 | Módulo C | 4 | 5 | 12 | 6.00 | 1.78 |
| ... | ... |...|...|...| ... | ... |
| **TOTAL**| **(Suma de la ruta crítica)** | | | | **26.00** | **9.89** |

* **Desviación Estándar del Proyecto** = √9.89 ≈ **3.14 días**

---

## Análisis de Resultados y Probabilidad

Con la duración total esperada y la desviación estándar del proyecto, puedes calcular la probabilidad de cumplir con una fecha límite específica, basándote en la distribución normal.

* Hay un **~68%** de probabilidad de terminar el proyecto entre (Te - σ) y (Te + σ).
    * *En nuestro ejemplo: entre 22.86 y 29.14 días.*
* Hay un **~95%** de probabilidad de terminar entre (Te - 2σ) y (Te + 2σ).
    * *En nuestro ejemplo: entre 19.72 y 32.28 días.*
* Hay un **~99.7%** de probabilidad de terminar entre (Te - 3σ) y (Te + 3σ).

Esta información es extremadamente valiosa para comunicar el riesgo a los interesados y establecer colchones de tiempo (buffers) de manera justificada.