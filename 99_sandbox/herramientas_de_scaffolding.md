# Especificación Técnica: Herramientas de Scaffolding del Dominio

**Versión:** 1.0

**Autor:** Gemini

**Relacionado con:** `ADR-010: Estrategia de Scaffolding Personalizado para el Dominio`

## 1. Propósito

Este documento proporciona la especificación técnica detallada para la implementación de la suite de herramientas de scaffolding personalizado para el proyecto. El objetivo es estandarizar la creación de los componentes de nuestra arquitectura, acelerar el desarrollo y reducir errores.

## 2. Estructura de Directorios Requerida

La implementación de estas herramientas requiere la siguiente estructura de directorios dentro del proyecto:

```
.
├── commands/
│   ├── MakeActionCommand.ts
│   ├── MakeRuleCommand.ts
│   ├── MakeTestCommand.ts
│   ├── MakeAdrCommand.ts
│   ├── MakeServiceCommand.ts
│   └── MakeBuilderCommand.ts
├── stubs/
│   ├── action.stub
│   ├── adr.stub
│   ├── builder.stub
│   ├── service.stub
│   ├── test.stub
│   └── rdn/
│       ├── calculation.stub
│       ├── lifecycle.stub
│       └── validation.stub
└── app/
    ├── Actions/
    │   └── BaseAction.ts
    ├── Builders/
    ├── Rules/
    │   ├── BaseRule.ts
    │   ├── Calculations/
    │   ├── Validations/
    │   ├── Lifecycle/
    │   └── Other/
    ├── Services/
    └── Types/
        └── Money.ts
```

## 3. Definiciones de Tipos Base

Los stubs dependen de un conjunto de interfaces y tipos base para asegurar la consistencia.

**`app/Actions/BaseAction.ts`**
```typescript
export interface ActionPayload {
  [key: string]: any
}

export interface ActionResult {
  success: boolean
  message: string
  data?: any
}

export default interface BaseAction<TPayload extends ActionPayload, TResult extends ActionResult> {
  execute(payload: TPayload): Promise<TResult>
  undo?(payload: TPayload): Promise<void>
}
```

**`app/Rules/BaseRule.ts`**
```typescript
export interface RuleResult {
  success: boolean
  data?: any
}

export type BaseRule<TPayload, TResult> = (payload: TPayload) => TResult
```

**`app/Types/Money.ts`**
```typescript
export interface Money {
  amount: number
  currency: 'CLP' // u otra moneda
}
```

## 4. Especificación de Comandos y Stubs

A continuación se detalla la implementación de cada comando `ace`.

### 4.1. Comando `make:action`

-   **Nombre:** `make:action`
-   **Clase:** `MakeActionCommand.ts`
-   **Argumento:** `name` (string, requerido) - El nombre de la Acción (ej. `Pensiones/SuspenderPension`).
-   **Lógica:** Parsea el nombre para determinar el subdirectorio y el nombre de la clase. Prepara los datos y los pasa al stub.
-   **Stub Asociado:** `stubs/action.stub`

    ```hbs
    {{{
      exports({
        to: to
      })
    }}}
    import BaseAction, { type ActionPayload, type ActionResult } from '#app/Actions/BaseAction'
    import { inject } from '@adonisjs/core'
    import vine from '@vinejs/vine'

    export interface {{ name }}Payload extends ActionPayload {}

    export interface {{ name }}Result extends ActionResult {}

    @inject()
    export default class {{ name }}Action implements BaseAction<{{ name }}Payload, {{ name }}Result> {
      constructor() {}

      public static validator = vine.object({})

      async execute(payload: {{ name }}Payload): Promise<{{ name }}Result> {
        // TODO: Implementar lógica
        return { success: true, message: 'Acción completada' }
      }
    }
    ```

### 4.2. Comando `make:rule`

-   **Nombre:** `make:rule`
-   **Clase:** `MakeRuleCommand.ts`
-   **Argumento:** `id` (string, requerido) - El ID único de la regla (ej. `CALC-PIM-001`).
-   **Flags:** `--description`, `--type` (validation, calculation, lifecycle).
-   **Lógica:** Infiere el tipo de regla y el directorio de destino a partir del prefijo del ID. Permite que el flag `--type` sobreescriba la inferencia.
-   **Stubs Asociados:** `stubs/rdn/validation.stub`, `stubs/rdn/calculation.stub`, `stubs/rdn/lifecycle.stub` (ver archivos generados previamente).

### 4.3. Comando `make:test`

-   **Nombre:** `make:test`
-   **Clase:** `MakeTestCommand.ts`
-   **Argumento:** `id` (string, requerido) - El ID del Escenario de Verificación (ej. `EVP-001`).
-   **Flags:** `--group`, `--description`.
-   **Lógica:** Genera un archivo de prueba en el directorio `tests/functional/{group}/`.
-   **Stub Asociado:** `stubs/test.stub`

    ```hbs
    {{{
      exports({
        to: to
      })
    }}}
    import { test } from '@japa/runner'

    /**
     * @escenario {{ id }}
     * @descripcion {{ description }}
     */
    test.group('{{ group }}: {{ description }}', (group) => {
      test('debe cumplir el escenario de negocio', async ({ assert }) => {
        // GIVEN: Configuración inicial

        // WHEN: Se ejecuta la acción

        // THEN: Se verifican los resultados
        assert.isTrue(true)
      }).tags(['{{ group_tag }}'])
    })
    ```

### 4.4. Comando `make:adr`

-   **Nombre:** `make:adr`
-   **Clase:** `MakeAdrCommand.ts`
-   **Argumento:** `title` (string, requerido) - El título del ADR.
-   **Lógica:** Genera un nuevo archivo `.md` en el directorio `mvp/` con un ID secuencial.
-   **Stub Asociado:** `stubs/adr.stub`

    ```hbs
    {{{
      exports({
        to: to
      })
    }}}
    ### ADR-{{ id }}: {{ title }}

    **Estado:** Propuesto

    **Fecha:** {{ date }}

    #### **Contexto**

    #### **Decisión**

    #### **Consecuencias**

    ```
