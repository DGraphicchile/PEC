import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import LiquidacionDePago from './LiquidacionDePago.js'

export default class ConceptoLiquidacion extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare liquidacionId: string

  @column()
  declare codigoConcepto: string

  @column()
  declare descripcionConcepto: string

  @column()
  declare monto: number

  @column()
  declare tipo: string

  @column()
  declare codigoContableSAP: string | null

  @column()
  declare origenConceptoId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => LiquidacionDePago)
  declare liquidacion: BelongsTo<typeof LiquidacionDePago>
}