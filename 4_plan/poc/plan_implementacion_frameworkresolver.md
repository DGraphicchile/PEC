# Plan Detallado: Implementación del FrameworkResolverService

**Versión:** 1.0
**Fecha:** 2025-08-11

---

## 1. Objetivo

Implementar un `FrameworkResolverService` robusto, versionado y auditable que sirva como la única fuente de verdad para la resolución de la normativa aplicable en el sistema. Este componente es crítico para cumplir con los requisitos de auditabilidad y correcta aplicación de la ley a lo largo del tiempo.

El objetivo es que cualquier proceso de negocio pueda solicitar el conjunto correcto de reglas y parámetros para una fecha de negocio específica, garantizando cálculos consistentes y reproducibles.

## 2. Alcance

#### Incluido en este Plan:
- **Diseño y Migración de Base de Datos:** Creación de las tablas para persistir los Marcos Normativos y sus artefactos versionados.
- **Servicio de Carga de Artefactos:** Un mecanismo (comando `ace`) para cargar y versionar los artefactos normativos (parámetros y directivas) desde archivos `json` o `yaml`.
- **Implementación del `FrameworkResolverService`:** El servicio principal con la lógica para resolver un marco por fecha o por ID, incluyendo una capa de caché para optimizar el rendimiento.
- **Integración y Auditoría:** Modificación de los servicios de negocio clave (ej. `PagoService`) para que consuman este servicio y registren qué marco se utilizó en las transacciones resultantes (ej. en cada `LiquidacionDePago`).
- **Estrategia de Pruebas:** Definición de pruebas unitarias, de integración y E2E para validar la correcta selección de marcos, especialmente en casos de borde.

#### Excluido de este Plan:
- Una interfaz de usuario (UI) para la gestión de los marcos normativos. Esta se considera una funcionalidad de una fase posterior.
- La carga de *todas* las versiones históricas de la normativa. Este plan se enfocará en implementar la estructura y probarla con 2-3 marcos de ejemplo.

## 3. Plan de Implementación por Tareas

El trabajo se desglosa en las siguientes Historias de Usuario:

- **HU-FRS-01: Diseño y Migración de la Base de Datos**
    - *Como Desarrollador, quiero las tablas `marcos_normativos`, `parametros_normativos` y `directivas_de_ejecucion` para persistir la configuración versionada de la normativa.*
    - **Tareas:**
        - Crear migración de AdonisJS para la tabla `parametros_normativos` (id, version, contenido_jsonb, hash_contenido).
        - Crear migración para la tabla `directivas_de_ejecucion` (similar a la anterior).
        - Crear migración para la tabla `marcos_normativos` (id, nombre, fecha_inicio_vigencia, fecha_fin_vigencia, parametros_id, directiva_id).

- **HU-FRS-02: Implementación del Cargador de Artefactos**
    - *Como Administrador de Gobernanza, necesito un comando `ace` para cargar de forma segura archivos de `ParametrosNormativos` y `DirectivasDeEjecucion` a la base de datos.*
    - **Tareas:**
        - Definir la estructura de los archivos de artefactos (ej. `params-v1.0.0.json`).
        - Crear el comando `node ace normativa:cargar --tipo=parametros --ruta=...`.
        - El comando debe validar el archivo, calcular su hash y evitar la inserción de duplicados.

- **HU-FRS-03: Implementación del `FrameworkResolverService`**
    - *Como Desarrollador, quiero un `FrameworkResolverService` que, dada una fecha, me devuelva el `MarcoNormativo` activo y sus artefactos asociados.*
    - **Tareas:**
        - Implementar el método `resolveByDate(fecha: Date)` que busca en la tabla `marcos_normativos` el registro cuya vigencia contenga la fecha proporcionada.
        - Implementar el método `resolveById(id: string)`.
        - Añadir una capa de caché en memoria (ej. `node-cache`) para los artefactos, ya que son inmutables y de lectura frecuente.

- **HU-FRS-04: Integración y Auditoría**
    - *Como Desarrollador, quiero que el `PagoService` solicite el marco normativo al `FrameworkResolverService` y registre el `marco_normativo_id` en cada `LiquidacionDePago` generada.*
    - **Tareas:**
        - Inyectar el `FrameworkResolverService` en los servicios de negocio que lo requieran.
        - Extender el modelo y la tabla `liquidaciones_de_pago` para añadir la columna `marco_normativo_id`.
        - Modificar la lógica de cálculo para que siempre opere con el marco resuelto.

- **HU-FRS-05: Pruebas y Validación**
    - *Como QA, quiero probar que el `FrameworkResolverService` selecciona el marco correcto para fechas de borde y casos históricos.*
    - **Tareas:**
        - Crear pruebas unitarias para `resolveByDate` con fechas de borde (ej. primer y último día de vigencia), fechas intermedias y fechas fuera de cualquier rango (que debe lanzar un error).
        - Crear una prueba de integración que verifique que el `PagoService` registra correctamente el `marco_normativo_id`.

## 4. Modelo de Datos Propuesto

```sql
-- Artefacto con los parámetros (valores, topes, porcentajes)
CREATE TABLE parametros_normativos (
  id UUID PRIMARY KEY,
  version VARCHAR(20) NOT NULL UNIQUE, -- SemVer ej. "1.2.0"
  contenido JSONB NOT NULL,
  hash_contenido VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 del contenido
  created_at TIMESTAMPTZ NOT NULL
);

-- Artefacto con la lógica (mapeo de PDN/RDN a versiones de código)
CREATE TABLE directivas_de_ejecucion (
  id UUID PRIMARY KEY,
  version VARCHAR(20) NOT NULL UNIQUE, -- SemVer ej. "1.2.0"
  contenido JSONB NOT NULL,
  hash_contenido VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL
);

-- Registro que une los artefactos y les da una vigencia
CREATE TABLE marcos_normativos (
  id UUID PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  fecha_inicio_vigencia DATE NOT NULL,
  fecha_fin_vigencia DATE, -- Nulo significa "hasta el presente"
  parametros_id UUID NOT NULL REFERENCES parametros_normativos(id),
  directiva_id UUID NOT NULL REFERENCES directivas_de_ejecucion(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL,
  -- Constraint para evitar solapamiento de fechas
  EXCLUDE USING GIST (daterange(fecha_inicio_vigencia, fecha_fin_vigencia, '[]') WITH &&) WHERE (is_active)
);
```

## 5. Contrato del Servicio (Interfaz TypeScript)

```typescript
// DTO para los artefactos
interface NormativeArtifact {
  id: string;
  version: string;
  content: Record<string, any>;
}

// DTO para el marco resuelto
interface ResolvedFramework {
  id: string;
  name: string;
  parameters: NormativeArtifact;
  directive: NormativeArtifact;
}

// Interfaz del servicio
interface IFrameworkResolverService {
  /**
   * Resuelve el marco normativo vigente para una fecha específica.
   * @param businessDate La fecha de negocio para la cual resolver el marco.
   * @returns El marco normativo resuelto.
   * @throws {Error} Si no se encuentra un marco activo para la fecha dada.
   */
  resolveByDate(businessDate: Date): Promise<ResolvedFramework>;

  /**
   * Resuelve un marco normativo por su ID específico.
   * @param frameworkId El UUID del marco a resolver.
   * @returns El marco normativo resuelto.
   * @throws {Error} Si no se encuentra el marco con el ID dado.
   */
  resolveById(frameworkId: string): Promise<ResolvedFramework>;
}
```
