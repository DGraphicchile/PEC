import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import FichaPersona from './FichaPersona.js'
import HechoCausal from './HechoCausal.js'
import LiquidacionDePago from './LiquidacionDePago.js'

export default class PrestacionEconomica extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare hechoCausalId: string

  @column()
  declare fichaPersonaId: string

  @column()
  declare tipo: string

  @column()
  declare estado: string

  @column()
  declare codigoInactivacion: number

  @column()
  declare montoBase: number

  @column()
  declare esVitalicia: boolean

  @column.date()
  declare fechaActivacion: DateTime

  @column.date()
  declare fechaFinVigencia: DateTime | null

  @column.date()
  declare fechaFinVigenciaTeorico: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => FichaPersona)
  declare fichaPersona: BelongsTo<typeof FichaPersona>

  @belongsTo(() => HechoCausal)
  declare hechoCausal: BelongsTo<typeof HechoCausal>

  @hasMany(() => LiquidacionDePago)
  declare liquidaciones: HasMany<typeof LiquidacionDePago>
}