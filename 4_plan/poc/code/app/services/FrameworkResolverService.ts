import { inject } from '@adonisjs/core'
import { FrameworkResolverService } from '#contracts/services'
import { ResolvedFramework } from '#contracts/normativa'
import MarcoNormativo from '#models/MarcoNormativo'
import { DateTime } from 'luxon'

// Implementación del servicio de resolución de marcos normativos
@inject()
export default class FrameworkResolverServiceImpl implements FrameworkResolverService {
  // Aquí se podría inyectar un servicio de caché

  async resolveByDate(businessDate: Date): Promise<ResolvedFramework> {
    const date = DateTime.fromJSDate(businessDate).toISODate()

    const marco = await MarcoNormativo.query()
      .where('fecha_inicio_vigencia', '<=', date)
      .andWhere((query) => {
        query.whereNull('fecha_fin_vigencia').orWhere('fecha_fin_vigencia', '>=', date)
      })
      .andWhere('is_active', true)
      .preload('parametros')
      .preload('directiva')
      .first()

    if (!marco) {
      throw new Error(`No se encontró un marco normativo activo para la fecha: ${date}`)
    }

    return {
      id: marco.id,
      name: marco.nombre,
      parameters: {
        id: marco.parametros.id,
        version: marco.parametros.version,
        content: marco.parametros.contenido,
      },
      directive: {
        id: marco.directiva.id,
        version: marco.directiva.version,
        content: marco.directiva.contenido,
      },
    }
  }

  async resolveById(frameworkId: string): Promise<ResolvedFramework> {
    const marco = await MarcoNormativo.findOrFail(frameworkId)
    await marco.load('parametros')
    await marco.load('directiva')

    return {
      id: marco.id,
      name: marco.nombre,
      parameters: {
        id: marco.parametros.id,
        version: marco.parametros.version,
        content: marco.parametros.contenido,
      },
      directive: {
        id: marco.directiva.id,
        version: marco.directiva.version,
        content: marco.directiva.contenido,
      },
    }
  }
}
