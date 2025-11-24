import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import ParametroNormativo from './ParametroNormativo.js'
import DirectivaDeEjecucion from './DirectivaDeEjecucion.js'

export default class MarcoNormativo extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nombre: string

  @column.date()
  declare fechaInicioVigencia: DateTime

  @column.date()
  declare fechaFinVigencia: DateTime | null

  @column()
  declare parametrosId: string

  @column()
  declare directivaId: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => ParametroNormativo)
  declare parametros: BelongsTo<typeof ParametroNormativo>

  @belongsTo(() => DirectivaDeEjecucion)
  declare directiva: BelongsTo<typeof DirectivaDeEjecucion>
}
