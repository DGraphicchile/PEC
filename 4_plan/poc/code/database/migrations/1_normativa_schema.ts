import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('parametros_normativos', (table) => {
      table.uuid('id').primary()
      table.string('version', 20).notNullable().unique()
      table.jsonb('contenido').notNullable()
      table.string('hash_contenido', 64).notNullable().unique()
      table.timestamp('created_at').notNullable()
    })

    this.schema.createTable('directivas_de_ejecucion', (table) => {
      table.uuid('id').primary()
      table.string('version', 20).notNullable().unique()
      table.jsonb('contenido').notNullable()
      table.string('hash_contenido', 64).notNullable().unique()
      table.timestamp('created_at').notNullable()
    })

    this.schema.createTable('marcos_normativos', (table) => {
      table.uuid('id').primary()
      table.string('nombre').notNullable()
      table.date('fecha_inicio_vigencia').notNullable()
      table.date('fecha_fin_vigencia')
      table.uuid('parametros_id').references('id').inTable('parametros_normativos').notNullable()
      table.uuid('directiva_id').references('id').inTable('directivas_de_ejecucion').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at').notNullable()

      // Idealmente, usar un constraint de exclusión para evitar solapamientos
      // table.specificType('periodo_vigencia', 'daterange').excludeWhere('is_active', true).with('&&')
    })

    // Añadir la columna de auditoría a la tabla de liquidaciones
    this.schema.alterTable('liquidaciones_de_pago', (table) => {
      table.uuid('marco_normativo_id').references('id').inTable('marcos_normativos')
    })
  }

  async down() {
    this.schema.alterTable('liquidaciones_de_pago', (table) => {
      table.dropColumn('marco_normativo_id')
    })
    this.schema.dropTable('marcos_normativos')
    this.schema.dropTable('directivas_de_ejecucion')
    this.schema.dropTable('parametros_normativos')
  }
}
