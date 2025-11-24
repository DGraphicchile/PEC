import { BusinessRule, OtorgamientoInput } from '#contracts/rules'
import HechoCausal from '#models/HechoCausal'

// Se simula un repositorio que podría consultar un sistema externo o una tabla local.
class CotizacionesRepository {
  public async tieneCotizacionesAlDia(personaId: string): Promise<boolean> {
    console.log(`  [Repo] Consultando estado de cotizaciones para persona ${personaId}...`)
    // En un caso real, aquí iría la lógica de consulta.
    return true // Simulamos que siempre está al día.
  }
}

/**
 * RDN VALID-OTG-001 (v1)
 * Lógica MEJORADA: Esta regla ahora depende de un repositorio para cumplir su función.
 */
export default class ValidarCotizacionesAlDiaV1 implements BusinessRule<OtorgamientoInput, boolean> {
  private cotizacionesRepo: CotizacionesRepository

  constructor() {
    // La inyección de dependencias se manejará de forma más robusta en el RuleExecutorService.
    this.cotizacionesRepo = new CotizacionesRepository()
  }

  async execute(input: OtorgamientoInput): Promise<boolean> {
    const { hechoCausalId, normativa } = input
    const version = normativa.directiva['VALID-OTG-001']

    console.log(`[RDN: VALID-OTG-001 v${version}] - Iniciando validación de cotizaciones.`)

    const hechoCausal = await HechoCausal.findOrFail(hechoCausalId)
    // const personaId = hechoCausal.personaId; // Se necesitaría la relación en el modelo
    const personaId = 'uuid-persona-simulada'

    const estaAlDia = await this.cotizacionesRepo.tieneCotizacionesAlDia(personaId)

    if (!estaAlDia) {
      console.log(`[RDN: VALID-OTG-001 v${version}] - RESULTADO: FALLÓ. El trabajador no tiene cotizaciones al día.`)
      return false
    }

    console.log(`[RDN: VALID-OTG-001 v${version}] - RESULTADO: ÉXITO. El trabajador cumple con el requisito.`)
    return true
  }
}