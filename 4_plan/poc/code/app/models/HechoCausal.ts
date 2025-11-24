import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import PrestacionEconomica from './PrestacionEconomica.js'

export default class HechoCausal extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare tipoSiniestro: string

  @column.date()
  declare fechaSiniestro: DateTime

  @column()
  declare trabajadorId: string

  @column()
  declare sisesatFolio: string | null

  @column()
  declare estado: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => PrestacionEconomica)
  declare prestaciones: HasMany<typeof PrestacionEconomica>
}