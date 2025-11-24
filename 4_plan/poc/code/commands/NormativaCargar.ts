import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import ParametroNormativo from '#models/ParametroNormativo'
import DirectivaDeEjecucion from '#models/DirectivaDeEjecucion'

export default class NormativaCargar extends BaseCommand {
  static commandName = 'normativa:cargar'
  static options: CommandOptions = {
    startApp: true,
  }

  /**
   * Carga un artefacto normativo (parámetros o directiva) desde un archivo JSON.
   * @param tipo El tipo de artefacto: 'parametros' o 'directivas'.
   * @param ruta La ruta al archivo JSON.
   */
  async run(tipo: 'parametros' | 'directivas', ruta: string) {
    this.logger.info(`Cargando artefacto de tipo '${tipo}' desde ${ruta}`)

    const fileContent = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(fileContent)

    if (!data.version || !data.content) {
      this.logger.error('El archivo JSON debe tener las propiedades "version" y "content".')
      return
    }

    const hash = crypto.createHash('sha256').update(JSON.stringify(data.content)).digest('hex')

    try {
      if (tipo === 'parametros') {
        await ParametroNormativo.create({
          version: data.version,
          contenido: data.content,
          hashContenido: hash,
        })
      } else {
        await DirectivaDeEjecucion.create({
          version: data.version,
          contenido: data.content,
          hashContenido: hash,
        })
      }
      this.logger.info(`Artefacto ${data.version} cargado exitosamente.`)
    } catch (error) {
      if (error.code === '23505') { // Código de error para violación de constraint unique
        this.logger.warning(`El artefacto con versión ${data.version} o con este contenido ya existe. Se omite.`)
      } else {
        this.logger.error('Error al guardar el artefacto:', error.message)
      }
    }
  }
}
