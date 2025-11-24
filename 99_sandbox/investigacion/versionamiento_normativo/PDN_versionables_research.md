# Especificación Técnica: Implementación de PDN Versionables

**Proyecto:** PEC (Prestaciones Económicas Chile)
**Autor:** MDLO
**Versión:** 1.0

## 1. Resumen

Este documento detalla el plan de implementación en dos fases para la gestión de **Procesos de Negocio (PDN)** versionables dentro de la plataforma PEC, utilizando AdonisJS.

* **Fase 1 - Implementación Directa:** Establece el patrón fundamental de versionado registrando cada versión del PDN como un servicio independiente en el contenedor de IoC. La resolución se realiza de forma explícita en el código orquestador.
* **Fase 2 - Refactorización a Servicio de Fábrica:** Introduce una capa de abstracción (`Factory Service`) para desacoplar el orquestador de los detalles de implementación del contenedor, centralizando la lógica de resolución y mejorando la mantenibilidad y testabilidad del sistema.

El objetivo es pasar de una solución funcional y explícita a una arquitectura más robusta y desacoplada.

---

## 2. Fase 1: Implementación con Múltiples Bindings y Resolución Directa

En esta fase, cada versión de cada PDN se registrará como un servicio único en el contenedor. El orquestador será responsable de construir el identificador del servicio y solicitarlo al contenedor.

### 2.1. Paso 1: Definir la Interfaz Común del PDN

Es imperativo definir un contrato común que todas las versiones de todos los PDN deben cumplir para garantizar la polimorfia y la seguridad de tipos.

1.  **Acción:** Crear el archivo `app/services/pdn/pdn_interface.ts`.
2.  **Contenido:**
    ```typescript
    // app/services/pdn/pdn_interface.ts

    /**
     * Define la estructura de datos que un PDN recibe para su ejecución.
     * Se debe tipar con mayor especificidad según el dominio.
     */
    export type PdnInputData = {
      // Ejemplo: datos de la solicitud, afiliado, etc.
      [key: string]: any;
    };

    /**
     * Define la estructura del resultado de la ejecución de un PDN.
     * Se debe tipar con mayor especificidad.
     */
    export type PdnResult = {
      success: boolean;
      message?: string;
      data: { [key: string]: any; };
    };

    /**
     * Interfaz que define el contrato para todos los servicios de Proceso de Negocio (PDN).
     * Toda implementación de un PDN, sin importar su versión, debe adherir a esta interfaz.
     */
    export interface PdnInterface {
      /**
       * Ejecuta la lógica de negocio del PDN.
       * @param input Los datos de entrada necesarios para el proceso.
       * @returns Una promesa que resuelve con el resultado de la operación.
       */
      execute(input: PdnInputData): Promise<PdnResult>;
    }
    ```

### 2.2. Paso 2: Implementar los Servicios PDN Versionados

Cada lógica de PDN se implementará en su propia clase, siguiendo una convención de nombrado estricta.

1.  **Acción:** Crear los archivos para las implementaciones. Usaremos `PDN-OTG-002` como ejemplo, con dos versiones.
    * `app/services/pdn/otg/pdn_otg_002_v1.service.ts`
    * `app/services/pdn/otg/pdn_otg_002_v2.service.ts`

2.  **Contenido de Ejemplo (`v1`):**
    ```typescript
    // app/services/pdn/otg/pdn_otg_002_v1.service.ts
    import type { PdnInputData, PdnInterface, PdnResult } from '#services/pdn/pdn_interface'

    export class PdnOtg002V1Service implements PdnInterface {
      public async execute(input: PdnInputData): Promise<PdnResult> {
        console.log('Ejecutando lógica de PDN-OTG-002 - Versión 1', input);
        // Lógica de negocio específica de la versión 1...
        return {
          success: true,
          data: {
            version: '1.0',
            message: 'Proceso de otorgamiento v1 completado.'
          }
        };
      }
    }
    ```

3.  **Contenido de Ejemplo (`v2`):**
    ```typescript
    // app/services/pdn/otg/pdn_otg_002_v2.service.ts
    import type { PdnInputData, PdnInterface, PdnResult } from '#services/pdn/pdn_interface'

    export class PdnOtg002V2Service implements PdnInterface {
      public async execute(input: PdnInputData): Promise<PdnResult> {
        console.log('Ejecutando lógica de PDN-OTG-002 - Versión 2', input);
        // Lógica de negocio mejorada o modificada de la versión 2...
        return {
          success: true,
          data: {
            version: '2.0',
            message: 'Proceso de otorgamiento v2 con validaciones adicionales completado.'
          }
        };
      }
    }
    ```

### 2.3. Paso 3: Crear y Configurar el Proveedor de Servicios

Un proveedor de servicios centralizará el registro de todos los PDN en el contenedor de IoC.

1.  **Acción:** Generar el proveedor.
    ```bash
    node ace make:provider Pdn
    ```

2.  **Acción:** Registrar los bindings en `providers/pdn_provider.ts`. La convención del nombre del binding es `pdn/{código_pdn}/v{version}`.

3.  **Contenido:**
    ```typescript
    // providers/pdn_provider.ts
    import type { ApplicationService } from '@adonisjs/core/types'
    import { PdnOtg002V1Service } from '#services/pdn/otg/pdn_otg_002_v1.service'
    import { PdnOtg002V2Service } from '#services/pdn/otg/pdn_otg_002_v2.service'

    export default class PdnProvider {
      constructor(protected app: ApplicationService) {}

      public register(): void {
        // Bindings para PDN-OTG-002
        this.app.container.bind('pdn/PDN-OTG-002/v1', async () => new PdnOtg002V1Service())
        this.app.container.bind('pdn/PDN-OTG-002/v2', async () => new PdnOtg002V2Service())

        // ... Aquí se añadirían los bindings para otros PDNs y sus versiones
        // this.app.container.bind('pdn/PDN-PAG-003/v1', async () => new PdnPag003V1Service())
      }
    }
    ```

4.  **Acción:** Activar el proveedor en `adonisrc.ts`.
    ```typescript
    // adonisrc.ts
    // ...
    providers: [
      // ...
      () => import('#providers/pdn_provider'),
    ],
    // ...
    ```

### 2.4. Paso 4: Modificar el Orquestador para Resolución Directa

El orquestador de procesos contendrá la lógica para resolver el servicio apropiado.

1.  **Acción:** Modificar la clase del orquestador (ej. `app/orchestrators/main_orchestrator.ts`).
2.  **Contenido de Ejemplo:**
    ```typescript
    // app/orchestrators/main_orchestrator.ts
    import app from '@adonisjs/core/services/app'
    import type { PdnInterface, PdnResult } from '#services/pdn/pdn_interface'

    type BusinessObject = {
      pdnCode: string;   // ej: "PDN-OTG-002"
      pdnVersion: string; // ej: "1" o "2"
      data: object;
    };

    export class MainOrchestrator {
      public async process(bo: BusinessObject): Promise<PdnResult> {
        const bindingName = `pdn/${bo.pdnCode}/v${bo.pdnVersion}`;

        // Verificación de seguridad para evitar errores en tiempo de ejecución
        const hasBinding = await app.container.hasBinding(bindingName);
        if (!hasBinding) {
          console.error(`Binding no encontrado para ${bindingName}`);
          throw new Error(`PDN no soportado: ${bo.pdnCode} en versión ${bo.pdnVersion}`);
        }

        console.log(`Resolviendo servicio con binding: ${bindingName}`);
        const pdnService = await app.container.make<PdnInterface>(bindingName);

        return pdnService.execute(bo.data);
      }
    }
    ```

### 2.5. Resumen de Fase 1

Al finalizar esta fase, el sistema será capaz de ejecutar diferentes versiones de un PDN. Sin embargo, el orquestador presenta un alto acoplamiento con el contenedor de IoC, una responsabilidad que no le corresponde.

---

## 3. Fase 2: Refactorización a Servicio de Fábrica

En esta fase, se refactorizará el código de la Fase 1 para introducir una capa de abstracción que elimine el acoplamiento del orquestador y centralice la lógica de resolución de servicios.

### 3.1. Paso 1: Crear el Servicio de Fábrica

Este servicio encapsulará toda la lógica de resolución que actualmente reside en el orquestador.

1.  **Acción:** Crear el archivo `app/services/pdn_factory.service.ts`.
2.  **Contenido:**
    ```typescript
    // app/services/pdn_factory.service.ts
    import app from '@adonisjs/core/services/app'
    import type { PdnInterface } from '#services/pdn/pdn_interface'

    export class PdnFactoryService {
      /**
       * Obtiene una instancia de un servicio PDN basado en su código y versión.
       * Este método contiene la lógica de resolución que antes estaba en el orquestador.
       * @param pdnCode El código único del PDN (ej. "PDN-OTG-002").
       * @param version La versión requerida (ej. "1").
       * @returns Una instancia del servicio PDN que cumple con PdnInterface.
       */
      public async getService(pdnCode: string, version: string): Promise<PdnInterface> {
        const bindingName = `pdn/${pdnCode}/v${version}`;

        const hasBinding = await app.container.hasBinding(bindingName);
        if (!hasBinding) {
          console.error(`Binding no encontrado para ${bindingName}`);
          throw new Error(`PDN no soportado: ${pdnCode} en versión ${version}`);
        }

        console.log(`Fábrica resolviendo servicio con binding: ${bindingName}`);
        return app.container.make<PdnInterface>(bindingName);
      }
    }
    ```

### 3.2. Paso 2: Registrar la Fábrica en el Contenedor

Para que la fábrica pueda ser inyectada, debe ser registrada.

1.  **Acción:** Añadir el binding de la fábrica en `providers/pdn_provider.ts`.
2.  **Contenido Modificado:**
    ```typescript
    // providers/pdn_provider.ts
    import type { ApplicationService } from '@adonisjs/core/types'
    import { PdnOtg002V1Service } from '#services/pdn/otg/pdn_otg_002_v1.service'
    import { PdnOtg002V2Service } from '#services/pdn/otg/pdn_otg_002_v2.service'
    import { PdnFactoryService } from '#services/pdn_factory.service' // IMPORTAR

    export default class PdnProvider {
      constructor(protected app: ApplicationService) {}

      public register(): void {
        // --- Registro del Servicio de Fábrica ---
        this.app.container.singleton(PdnFactoryService, async () => new PdnFactoryService());

        // --- Bindings de Implementaciones de PDN (sin cambios) ---
        this.app.container.bind('pdn/PDN-OTG-002/v1', async () => new PdnOtg002V1Service())
        this.app.container.bind('pdn/PDN-OTG-002/v2', async () => new PdnOtg002V2Service())
        // ...
      }
    }
    ```

### 3.3. Paso 3: Refactorizar el Orquestador

El orquestador será simplificado drásticamente. Su única dependencia será la `PdnFactoryService`.

1.  **Acción:** Modificar `app/orchestrators/main_orchestrator.ts` para usar inyección de dependencias.
2.  **Contenido Refactorizado:**
    ```typescript
    // app/orchestrators/main_orchestrator.ts
    import { inject } from '@adonisjs/core'
    import { PdnFactoryService } from '#services/pdn_factory.service'
    import type { PdnResult } from '#services/pdn/pdn_interface'

    type BusinessObject = {
      pdnCode: string;
      pdnVersion: string;
      data: object;
    };

    @inject()
    export class MainOrchestrator {
      // La fábrica se inyecta automáticamente en el constructor.
      constructor(protected pdnFactory: PdnFactoryService) {}

      public async process(bo: BusinessObject): Promise<PdnResult> {
        // La lógica de resolución se delega completamente a la fábrica.
        // El orquestador ya no conoce el contenedor ni los nombres de los bindings.
        console.log(`Orquestador delegando la obtención del servicio a la fábrica.`);
        const pdnService = await this.pdnFactory.getService(bo.pdnCode, bo.pdnVersion);

        return pdnService.execute(bo.data);
      }
    }
    ```

### 3.4. Paso 4: Actualizar las Pruebas

Las pruebas del orquestador ahora son más simples y robustas, ya que pueden hacer mock de la fábrica en lugar de interactuar con el contenedor.

1.  **Acción:** Modificar el archivo de prueba del orquestador.
2.  **Ejemplo de Prueba:**
    ```typescript
    // tests/integration/main_orchestrator.spec.ts
    import { test } from '@japa/runner'
    import { PdnFactoryService } from '#services/pdn_factory.service'
    import { MainOrchestrator } from '#app/orchestrators/main_orchestrator'

    test.group('MainOrchestrator', (group) => {
      test('debe llamar a la fábrica con el código y versión correctos', async ({ assert, mock }) => {
        // 1. Crear un mock del PdnService para simular su comportamiento
        const fakePdnService = {
          execute: async () => ({ success: true, data: { mocked: true } }),
        };

        // 2. Hacer mock del método getService de PdnFactoryService
        const factoryMock = mock.method(PdnFactoryService.prototype, 'getService', async () => fakePdnService);

        // 3. Instanciar el orquestador (AdonisJS lo haría con DI, aquí lo hacemos manual para la prueba)
        const orchestrator = new MainOrchestrator(new PdnFactoryService());

        const businessObject = {
          pdnCode: 'PDN-OTG-002',
          pdnVersion: '2',
          data: { id: 123 },
        };

        // 4. Ejecutar el método a probar
        await orchestrator.process(businessObject);

        // 5. Verificar que el mock fue llamado correctamente
        assert.equal(factoryMock.callCount(), 1);
        assert.deepEqual(factoryMock.getCall(0).args, ['PDN-OTG-002', '2']);
      });
    });
    ```

### 3.5. Resumen de Fase 2

Al finalizar esta fase, el sistema mantiene la misma funcionalidad que en la Fase 1, pero con una arquitectura superior:
-   **Desacoplada:** El orquestador no conoce los detalles de implementación de la resolución de servicios.
-   **Centralizada:** La lógica de resolución reside en un único lugar (`PdnFactoryService`).
-   **Testeable:** Las pruebas unitarias/integración del orquestador son más sencillas y fiables.

Esta arquitectura es la recomendada para la versión final del proyecto PEC.