import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import FichaPersona from './FichaPersona.js'

export default class Persona extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare rut: string

  @column()
  declare nombreCompleto: string

  @column.date()
  declare fechaNacimiento: DateTime

  @column()
  declare sexo: string

  @column()
  declare estadoCivil: string

  @column.date()
  declare fechaDefuncion: DateTime | null

  @column()
  declare direccion: string | null

  @column()
  declare telefono: string | null

  @column()
  declare email: string | null

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

  @hasOne(() => FichaPersona)
  declare fichaPersona: HasOne<typeof FichaPersona>
}