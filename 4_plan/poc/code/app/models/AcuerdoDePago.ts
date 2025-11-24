import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import PrestacionEconomica from './PrestacionEconomica.js'
import FichaPersona from './FichaPersona.js'
import MetodoDePago from './MetodoDePago.js'
import ConfiguracionDescuento from './ConfiguracionDescuento.js'

export default class AcuerdoDePago extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare prestacionId: string

  @column()
  declare fichaPersonaCobradorId: string

  @column()
  declare tipoAcuerdo: string

  @column()
  declare estado: string

  @column.date()
  declare fechaInicioVigencia: DateTime

  @column.date()
  declare fechaFinVigencia: DateTime | null

  @column()
  declare prioridad: number

  @column()
  declare documentoRespaldoId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => PrestacionEconomica)
  declare prestacion: BelongsTo<typeof PrestacionEconomica>

  @belongsTo(() => FichaPersona)
  declare fichaPersonaCobrador: BelongsTo<typeof FichaPersona>

  @hasOne(() => MetodoDePago)
  declare metodoPago: HasOne<typeof MetodoDePago>

  @hasOne(() => ConfiguracionDescuento)
  declare configuracionDescuento: HasOne<typeof ConfiguracionDescuento>
}