# ADR-018: Herramientas de Scaffolding para Consistencia Arquitectónica

- **Estado:** Propuesta
- **Fecha:** 2025-08-10

## Contexto

Una arquitectura basada en patrones específicos, como la definida en `ADR-017`, requiere la creación de múltiples archivos y código repetitivo para cada nueva funcionalidad. Realizar este proceso manualmente es lento, propenso a errores y arriesga la consistencia de la arquitectura a largo plazo.

## Decisión

Se adopta como principio arquitectónico que "la forma correcta debe ser también la forma más fácil". Para ello, se implementará una **suite de herramientas de scaffolding personalizado** utilizando los sistemas de Comandos (`ace`) y Plantillas (`Stubs`) de AdonisJS. El objetivo es automatizar la creación de todos los componentes recurrentes de nuestra arquitectura.

### Suite de Comandos Propuesta

Se creará un comando `make:*` para cada componente clave:

1.  **`make:action <NombreProceso>`:** Genera la clase `Action` para un PDN, implementando la interfaz requerida y su archivo de prueba.
2.  **`make:rule <ID_Regla> --type=<tipo>`:** Genera el esqueleto para una RDN (`validation`, `calculation`, etc.), ubicándola en el directorio correcto.
3.  **`make:listener <NombreEvento>`:** Genera una nueva clase `Listener` en `app/Listeners/` y la registra para escuchar un evento de dominio específico.
4.  **`make:builder <NombreObjeto>`:** Genera una clase `Builder` en `app/Builders/` con la estructura estándar del patrón.
5.  **`make:test <ID_Escenario>`:** Genera un archivo de prueba (`.spec.ts`) con la estructura BDD (Given/When/Then) para un Escenario de Verificación (EV) del dominio.
6.  **`make:adr "<Título>"`:** Genera un nuevo archivo ADR en `2_arquitectura/adrs/` a partir de una plantilla estándar.

## Consecuencias

- **(+) Productividad Acelerada:** Reduce significativamente el tiempo de desarrollo para nuevas funcionalidades.
- **(+) Consistencia Arquitectónica:** Garantiza que todos los componentes sigan las mismas convenciones y estructura, previniendo la deriva arquitectónica.
- **(+) Reducción de Errores:** Minimiza errores comunes de tipeo o de estructura en el código repetitivo.
- **(+) Facilita el Onboarding:** Los nuevos desarrolladores son guiados por las herramientas para construir componentes de la manera correcta.
- **(-) Costo de Mantenimiento del Tooling:** La suite de scaffolding debe ser mantenida y actualizada si la arquitectura evoluciona.

## Relación con Otros ADRs

- **Soporta `ADR-017`:** Provee las herramientas para implementar de manera eficiente los patrones de Acción, Listener y Builder definidos en dicho ADR.

