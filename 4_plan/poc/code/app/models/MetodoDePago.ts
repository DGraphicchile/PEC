import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import AcuerdoDePago from './AcuerdoDePago.js'

export default class MetodoDePago extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare acuerdoPagoId: string

  @column()
  declare tipoDestino: string

  @column()
  declare bancoCodigo: string | null

  @column()
  declare numeroCuenta: string

  @column()
  declare tipoCuenta: string

  @column()
  declare moneda: string

  @column()
  declare swiftBIC: string | null

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