A continuación, se presenta un análisis comparativo exhaustivo entre las dos alternativas de planificación propuestas para el desarrollo del sistema PEC.

# Análisis Comparativo de Planes de Desarrollo: Alternativa 1 vs. Alternativa 2

## 1. Resumen Ejecutivo

Se presentan dos planes para el desarrollo del sistema de Prestaciones Económicas (PEC), ambos con el objetivo de reemplazar la funcionalidad del sistema iSeries existente como Fase 1.

1.  **Alternativa 1 (Enfoque por Etapas Secuenciales):** Propone un plan de desarrollo incremental donde cada "etapa" construye un bloque de funcionalidad específico (ej. Otorgamiento, Ingesta, Pagos) de manera secuencial. El valor de negocio completo solo se materializa al final, cuando todas las piezas se integran en la Etapa 5 (Cálculo y Generación de Pagos).
2.  **Alternativa 2 (Enfoque por Capacidades de Negocio):** Propone un plan organizado en torno a "capacidades" de negocio (ej. Otorgamiento y Mantenimiento, Ciclo de Pago Mensual). Prioriza la construcción de un "Camino Feliz" (un flujo de valor completo y simple) para demostrar funcionalidad end-to-end de manera temprana, aunque con una cobertura de casos de uso limitada al principio.

Ambas alternativas comparten los mismos fundamentos técnicos y de dominio, pero difieren fundamentalmente en cómo estructuran el trabajo y gestionan la entrega de valor y el riesgo.

---

## 2. Análisis desde la Perspectiva del Equipo de Negocio

### Alternativa 1: Enfoque por Etapas Secuenciales

1.  **Ventajas y Beneficios:**
    1.  **Claridad Funcional por Bloques:** El plan es muy fácil de entender para el negocio, ya que cada etapa se concentra en un área funcional específica (ej. "todo sobre ingestas", "todo sobre ceses"). Esto facilita la asignación de expertos de negocio para las validaciones de cada etapa.
    2.  **Progreso Medible en Componentes Aislados:** El avance es tangible en términos de componentes completados. Es fácil comunicar que "el módulo de ingesta de IPS ya está listo" o "la gestión de ceses por Registro Civil está terminada".

2.  **Desventajas y Contras:**
    3.  **Valor de Negocio Tardío (Big Bang):** El principal inconveniente es que no se puede realizar una operación de negocio completa (desde el otorgamiento hasta el pago) hasta la Etapa 5. El valor real y la capacidad de reemplazar a iSeries solo se materializan al final del proceso, lo que retrasa el retorno de la inversión y la validación del sistema en su conjunto.
    4.  **Alto Riesgo de Integración Tardía:** Al construir los componentes de forma aislada, el riesgo de que no se integren correctamente entre sí se acumula y solo se descubre al final del proyecto (Etapa 5). Un problema en la integración en esa fase puede generar retrasos significativos y costosos.
    5.  **Visibilidad Limitada del Flujo Completo:** El equipo de negocio no puede ver ni validar un flujo de trabajo completo hasta muy avanzado el proyecto. Esto dificulta la detección temprana de problemas en la orquestación de los procesos.

### Alternativa 2: Enfoque por Capacidades de Negocio ("Camino Feliz")

1.  **Ventajas y Beneficios:**
    6.  **Entrega de Valor Temprana:** La estrategia del "Camino Feliz" permite tener un hilo de funcionalidad completo (otorgamiento simple -> cálculo simple -> pago simple) mucho antes. Esto permite una validación temprana del flujo end-to-end y demuestra valor tangible rápidamente.
    7.  **Mitigación de Riesgos de Integración:** Al construir un flujo completo desde el principio, los riesgos de integración entre los componentes (Otorgamiento, Cálculo, Pagos) se abordan y resuelven de manera temprana y continua, no al final.
    8.  **Feedback Continuo y Realista:** El equipo de negocio puede interactuar con un sistema que "funciona" de principio a fin desde las primeras etapas. Este feedback es mucho más valioso porque se basa en un ciclo de vida real, aunque simplificado.
    9.  **Alineamiento Directo con Capacidades de Negocio:** La estructura del plan en torno a capacidades como "Ciclo de Pago Mensual" refleja mejor cómo opera el negocio, facilitando la priorización y la comprensión del impacto de cada entrega.

2.  **Desventajas y Contras:**
    10. **Complejidad Inicial Mayor:** Construir un "Camino Feliz" requiere implementar versiones mínimas de varios componentes (Otorgamiento, Cálculo, Pagos) simultáneamente, lo que puede ser más complejo de coordinar al principio.
    11. **Cobertura Funcional Parcial al Inicio:** Aunque el flujo está completo, las primeras entregas solo cubrirán los casos más simples. La gestión de casos complejos y excepciones se añade de forma incremental, lo que puede generar la percepción de un sistema "incompleto" en las primeras etapas si no se gestionan bien las expectativas.

---

## 3. Análisis desde la Perspectiva del Equipo de Desarrollo

### Alternativa 1: Enfoque por Etapas Secuenciales

1.  **Ventajas y Beneficios:**
    12. **Foco Técnico Aislado:** Permite al equipo concentrarse en un solo tipo de problema a la vez (ej. solo lógica de ingesta, solo lógica de ciclo de vida). Esto puede simplificar la planificación técnica a corto plazo.
    13. **Dependencias Claras y Secuenciales:** El flujo de trabajo es lineal. El equipo sabe que no necesita preocuparse por el cálculo de pagos (Etapa 5) mientras está en la Etapa 2 (Ciclo de Vida).

2.  **Desventajas y Contras:**
    14. **Acumulación de Deuda Técnica de Integración:** El mayor riesgo técnico es la "deuda de integración". Las decisiones de diseño tomadas en la Etapa 2 pueden no ser compatibles con los requisitos de la Etapa 5, forzando refactorizaciones costosas y tardías.
    15. **Pruebas End-to-End Retrasadas:** Es imposible realizar pruebas de integración completas hasta el final del proyecto. Esto aumenta la probabilidad de descubrir defectos críticos tarde, cuando son más difíciles y caros de solucionar.
    16. **Menor Agilidad para Cambios:** Si un requisito cambia en una etapa temprana, el impacto en las etapas posteriores es difícil de evaluar hasta que se llega a ellas, lo que reduce la capacidad de adaptación del plan.

### Alternativa 2: Enfoque por Capacidades de Negocio ("Camino Feliz")

1.  **Ventajas y Beneficios:**
    17. **Arquitectura Robusta y Validada:** El enfoque obliga a pensar en la arquitectura completa desde el principio. La necesidad de que los componentes interactúen tempranamente asegura que la arquitectura sea coherente y robusta.
    18. **Refinamiento Iterativo:** El equipo puede refinar y mejorar continuamente cada componente (Otorgamiento, Cálculo, Pagos) a medida que se añaden nuevos casos de uso, en lugar de construir cada uno una sola vez y esperar que funcione.
    19. **Pipeline de Pruebas E2E desde el Inicio:** Se pueden construir y ejecutar pruebas de integración end-to-end desde los primeros sprints, lo que mejora drásticamente la calidad y la confianza en el sistema.
    20. **Mayor Coherencia Técnica:** Al trabajar en la capacidad completa, es más fácil asegurar que las decisiones técnicas (ej. logging, auditoría, manejo de errores) sean consistentes a lo largo de todo el flujo de negocio.

2.  **Desventajas y Contras:**
    21. **Gestión de Múltiples Frentes:** El equipo necesita manejar el desarrollo de varios componentes en paralelo para construir el "Camino Feliz", lo que requiere una buena coordinación y planificación.
    22. **Necesidad de "Stubs" o "Mocks":** Para que el flujo funcione, es posible que se necesiten versiones simuladas (mocks) de componentes o integraciones que se completarán más adelante, añadiendo una capa de trabajo temporal.

---

## 4. Comparación de Estimaciones (WBS)

| Métrica | Alternativa 1 | Alternativa 2 | Análisis |
| :--- | :--- | :--- | :--- |
| **PCC Totales (Fase 1)** | 220 | 218 | Las estimaciones de esfuerzo total son prácticamente idénticas, lo que indica que la cantidad de trabajo es la misma. La diferencia no está en el "qué", sino en el "cómo" y "cuándo". |
| **Duración Esperada (Te)** | 230.84 | 226.34 | Similar a los PCC, la duración estimada teórica es muy parecida. |
| **Varianza del Proyecto** | 31.58 | 29.22 | La Alternativa 2 presenta una varianza ligeramente menor, lo que sugiere un plan marginalmente menos riesgoso o con estimaciones un poco más acotadas. Esto puede deberse a que el enfoque por capacidades permite una mejor descomposición de las tareas más complejas (como el motor de cálculo). |

## 5. Conclusión y Recomendación

Ambas alternativas proponen un alcance de trabajo similar para la Fase 1. Sin embargo, difieren radicalmente en la estrategia de ejecución y gestión de riesgos.

23. **La Alternativa 1 (Etapas Secuenciales)** es un enfoque más tradicional y en cascada. Es simple de entender pero acumula el riesgo de integración y retrasa la entrega de valor real hasta el final del proyecto. Es una estrategia de **alto riesgo y bajo feedback**.

24. **La Alternativa 2 (Capacidades de Negocio)** es un enfoque Agile moderno. Prioriza la mitigación de riesgos de integración y la entrega de valor temprana a través de un "Camino Feliz". Aunque requiere más coordinación inicial, resulta en una arquitectura más robusta, mayor calidad y una visibilidad mucho mejor del progreso real para el negocio. Es una estrategia de **bajo riesgo y alto feedback**.

**Recomendación:**

Se recomienda **adoptar la Alternativa 2**. Sus beneficios en términos de mitigación de riesgos, validación temprana y entrega de valor incremental superan con creces la aparente simplicidad secuencial de la Alternativa 1. La Alternativa 2 está mucho más alineada con las mejores prácticas de desarrollo de software moderno y ofrece una mayor probabilidad de éxito del proyecto al permitir la adaptación y el aprendizaje continuo.
