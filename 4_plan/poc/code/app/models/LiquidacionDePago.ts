import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import PrestacionEconomica from './PrestacionEconomica.js'
import ConceptoLiquidacion from './ConceptoLiquidacion.js'

export default class LiquidacionDePago extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare prestacionId: string

  @column()
  declare periodo: string

  @column()
  declare montoImponible: number

  @column()
  declare totalHaberes: number

  @column()
  declare totalDescuentos: number

  @column()
  declare montoLiquido: number

  @column()
  declare estado: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => PrestacionEconomica)
  declare prestacion: BelongsTo<typeof PrestacionEconomica>

  @hasMany(() => ConceptoLiquidacion)
  declare conceptos: HasMany<typeof ConceptoLiquidacion>
}