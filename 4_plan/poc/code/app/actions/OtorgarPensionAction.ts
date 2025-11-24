import { inject } from '@adonisjs/core'
import { FrameworkResolverService } from '#contracts/services'
import HechoCausal from '#models/HechoCausal'
import PrestacionEconomica from '#models/PrestacionEconomica'
import emitter from '@adonisjs/core/services/emitter'
import { DateTime } from 'luxon'
import RuleExecutorService from './RuleExecutorService.js'
import { OtorgamientoInput } from '#contracts/rules'

/**
 * Acción de negocio para ejecutar el PDN-OTG-002: Otorgamiento de Prestación.
 * Ahora actúa como un ORQUESTADOR que invoca reglas de negocio específicas.
 */
@inject()
export default class OtorgarPensionAction {
  constructor(
    protected frameworkResolver: FrameworkResolverService,
    protected ruleExecutor: RuleExecutorService
  ) {}

  async execute(hechoCausalId: string): Promise<PrestacionEconomica> {
    const hechoCausal = await HechoCausal.findOrFail(hechoCausalId)

    // 1. RESOLVER EL MARCO NORMATIVO
    const framework = await this.frameworkResolver.resolveByDate(hechoCausal.fechaSiniestro.toJSDate())
    this.logger.info(`Otorgando pensión bajo el marco: ${framework.name}`)

    const ruleInput: OtorgamientoInput = {
      hechoCausalId,
      normativa: {
        parametros: framework.parameters.content,
        directiva: framework.directive.content,
      },
    }

    // 2. EJECUTAR SECUENCIA DE REGLAS DE NEGOCIO
    // La acción orquesta la ejecución de reglas en el orden correcto.
    const esValido = await this.ruleExecutor.execute('VALID-OTG-001', framework.directive, ruleInput)
    if (!esValido) {
      throw new Error('La validación de cotizaciones falló.')
    }

    const { sueldoBase } = await this.ruleExecutor.execute(
      'CALC-OTG-001',
      framework.directive,
      ruleInput
    )

    const { monto: montoPension } = await this.ruleExecutor.execute(
      'CALC-MONTO-PENSION',
      framework.directive,
      { sueldoBase, normativa: { parametros: framework.parameters.content } }
    )

    // 3. PERSISTIR EL RESULTADO CON TRAZABILIDAD
    const prestacion = await PrestacionEconomica.create({
      hechoCausalId: hechoCausal.id,
      tipo: 'PensionInvalidezTotal',
      estado: 'Activa',
      montoBase: montoPension,
      fechaActivacion: DateTime.now(),
      marcoNormativoId: framework.id,
    })

    // 4. EMITIR EVENTO DE DOMINIO
    await emitter.emit('pension:otorgada', { prestacionId: prestacion.id })

    return prestacion
  }

  private get logger() {
    return { info: (msg: string) => console.log(msg) }
  }
}