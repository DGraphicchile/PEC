import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import AcuerdoDePago from './AcuerdoDePago.js'

export default class ConfiguracionDescuento extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare acuerdoPagoId: string

  @column()
  declare tipoCalculo: string

  @column()
  declare valor: number

  @column()
  declare baseDeCalculo: string

  @column()
  declare formaDePago: string

  @column()
  declare montoInicialTotal: number | null

  @column()
  declare cuotasIniciales: number | null

  @column()
  declare saldoPendiente: number

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column()
  declare deletedBy: string | null

  @column()
  declare deletedReason: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => AcuerdoDePago)
  declare acuerdoPago: BelongsTo<typeof AcuerdoDePago>
}