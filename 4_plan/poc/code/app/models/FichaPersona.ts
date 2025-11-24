import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import Persona from './Persona.js'
import PrestacionEconomica from './PrestacionEconomica.js'
import AcuerdoDePago from './AcuerdoDePago.js'
import OrganismoAdministrador from './OrganismoAdministrador.js'

export default class FichaPersona extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare personaId: string

  @column()
  declare afiliacionAFPId: string | null

  @column()
  declare tasaCotizacionAFP: number | null

  @column()
  declare afiliacionSaludId: string | null

  @column()
  declare planSalud: string | null

  @column()
  declare montoPlanSalud: number | null

  @column()
  declare pagaAguinaldo: boolean

  @column()
  declare pagaBonoInvierno: boolean

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

  @belongsTo(() => Persona)
  declare persona: BelongsTo<typeof Persona>

  @hasMany(() => PrestacionEconomica)
  declare prestaciones: HasMany<typeof PrestacionEconomica>

  @hasMany(() => AcuerdoDePago)
  declare acuerdosPago: HasMany<typeof AcuerdoDePago>

  @belongsTo(() => OrganismoAdministrador, {
    foreignKey: 'afiliacionAFPId'
  })
  declare afiliacionAFP: BelongsTo<typeof OrganismoAdministrador>

  @belongsTo(() => OrganismoAdministrador, {
    foreignKey: 'afiliacionSaludId'
  })
  declare afiliacionSalud: BelongsTo<typeof OrganismoAdministrador>
}