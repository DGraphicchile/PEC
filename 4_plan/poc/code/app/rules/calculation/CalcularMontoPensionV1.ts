import { BusinessRule, MontoPensionOutput } from '#contracts/rules'

interface CalcularMontoPensionInput {
  sueldoBase: number;
  normativa: {
    parametros: Record<string, any>;
  };
}

/**
 * Implementación de una regla de cálculo para el monto de la pensión (versión 1).
 */
export default class CalcularMontoPensionV1 implements BusinessRule<CalcularMontoPensionInput, MontoPensionOutput> {
  execute(input: CalcularMontoPensionInput): MontoPensionOutput {
    // La regla obtiene el porcentaje desde los parámetros resueltos, no de un valor hardcodeado.
    const porcentaje = input.normativa.parametros.porcentajeInvalidezTotal || 0.7;
    const monto = input.sueldoBase * porcentaje;

    console.log(`[RDN: CALC-MONTO-PENSION v1] - Calculando ${input.sueldoBase} * ${porcentaje} = ${monto}`)

    return { monto };
  }
}
