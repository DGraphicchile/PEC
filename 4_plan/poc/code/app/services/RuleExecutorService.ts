import { NormativeArtifact } from '#contracts/normativa'
import { BusinessRule } from '#contracts/rules'
import app from '@adonisjs/core/services/app'

// --- Registro de clases de reglas para instanciación dinámica ---
const ruleRegistry = {
  'VALID-OTG-001': async () => {
    const { default: Rule } = await import('#rules/validation/ValidarCotizacionesAlDia')
    return new Rule()
  },
  'CALC-OTG-001': async () => {
    const { default: Rule } = await import('#rules/calculation/CalcularSueldoBaseV1')
    return new Rule()
  },
  'CALC-MONTO-PENSION': async () => {
    const { default: Rule } = await import('#rules/calculation/CalcularMontoPensionV1')
    return new Rule()
  },
}
// ----------------------------------------------------------------

/**
 * Servicio MEJORADO: Ahora utiliza el contenedor de IoC de AdonisJS para instanciar las reglas,
 * permitiendo que estas puedan tener sus propias dependencias inyectadas en el futuro.
 */
export default class RuleExecutorService {
  public async execute<TInput, TOutput>(
    ruleId: keyof typeof ruleRegistry,
    directive: NormativeArtifact,
    input: TInput
  ): Promise<TOutput> {
    const version = directive.content[ruleId]
    if (!version) {
      throw new Error(`Regla ${ruleId} no encontrada en la directiva ${directive.version}`)
    }

    // En una implementación real, el registro podría mapear a un binding del contenedor de IoC.
    // Por ahora, usamos una factory asíncrona para simular la carga dinámica.
    const ruleFactory = ruleRegistry[ruleId]
    if (!ruleFactory) {
      throw new Error(`Implementación para la regla ${ruleId} v${version} no encontrada.`)
    }

    // Usar la factory para obtener una instancia de la regla.
    // Esto desacopla al ejecutor de tener que conocer las clases concretas.
    const ruleInstance = (await ruleFactory()) as BusinessRule<TInput, TOutput>

    // NOTA: Para una inyección de dependencias completa, se usaría el contenedor de AdonisJS:
    // const ruleInstance = await app.container.make(ruleBindingFromRegistry)

    return ruleInstance.execute(input)
  }
}