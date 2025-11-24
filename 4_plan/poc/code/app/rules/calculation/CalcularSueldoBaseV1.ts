import { BusinessRule, OtorgamientoInput, SueldoBaseOutput } from '#contracts/rules'

// Se simula un repositorio que obtiene las rentas históricas de un trabajador.
class RentasRepository {
  public async obtenerUltimasRentas(personaId: string, meses: number): Promise<number[]> {
    console.log(`  [Repo] Obteniendo las últimas ${meses} rentas para la persona ${personaId}...`)
    // Se retornan valores simulados.
    return [600000, 610000, 590000, 620000, 580000, 605000]
  }
}

/**
 * RDN CALC-OTG-001 (v1)
 * Lógica MEJORADA: La regla ahora consume parámetros normativos para su cálculo.
 */
export default class CalcularSueldoBaseV1 implements BusinessRule<OtorgamientoInput, SueldoBaseOutput> {
  private rentasRepo: RentasRepository

  constructor() {
    this.rentasRepo = new RentasRepository()
  }

  async execute(input: OtorgamientoInput): Promise<SueldoBaseOutput> {
    const { normativa } = input
    const version = normativa.directiva['CALC-OTG-001']
    console.log(`[RDN: CALC-OTG-001 v${version}] - Iniciando cálculo de sueldo base.`)

    // 1. Consumir parámetros del marco normativo resuelto
    const mesesAConsiderar = normativa.parametros.mesesCalculoSueldoBase || 6
    const topeImponibleUF = normativa.parametros.topeImponibleUf || 81.6
    const valorUF = 36000 // Este valor debería venir de un servicio de indicadores económicos
    const topeImponibleCLP = topeImponibleUF * valorUF

    console.log(`  [RDN] Parámetros aplicados: { meses: ${mesesAConsiderar}, topeImponible: ${topeImponibleCLP} }`)

    // 2. Obtener datos crudos a través del repositorio
    const rentas = await this.rentasRepo.obtenerUltimasRentas('uuid-persona-simulada', mesesAConsiderar)

    // 3. Aplicar la lógica de negocio
    const rentasTopeadas = rentas.map((renta) => Math.min(renta, topeImponibleCLP))
    const sumaRentas = rentasTopeadas.reduce((acc, curr) => acc + curr, 0)
    const sueldoBase = Math.round(sumaRentas / rentasTopeadas.length)

    console.log(`[RDN: CALC-OTG-001 v${version}] - RESULTADO: Sueldo Base calculado: ${sueldoBase}`)

    return { sueldoBase }
  }
}