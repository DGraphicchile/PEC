import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'

export default class OrganismoAdministrador extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare codigo: string

  @column()
  declare nombre: string

  @column()
  declare razonSocial: string

  @column()
  declare rut: string

  @column()
  declare tipo: string

  @column()
  declare activo: boolean

  @column()
  declare direccion: string | null

  @column()
  declare telefono: string | null

  @column()
  declare email: string | null

  @column()
  declare sitioWeb: string | null

  @column()
  declare codigoSUSESO: string | null

  @column.date()
  declare fechaInicioOperaciones: DateTime | null

  @column.date()
  declare fechaCese: DateTime | null

  @column()
  declare observaciones: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}