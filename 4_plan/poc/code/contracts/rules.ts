// Define la estructura de una regla de negocio genérica.
export interface BusinessRule<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput> | TOutput;
}

// DTOs (Data Transfer Objects) para la entrada y salida de nuestras reglas.
export interface OtorgamientoInput {
  hechoCausalId: string;
  // Las props resueltas por el FrameworkResolverService se pasan como contexto.
  normativa: {
    parametros: Record<string, any>;
    directiva: Record<string, any>;
  };
}

export interface SueldoBaseOutput {
  sueldoBase: number;
}

export interface MontoPensionOutput {
  monto: number;
}
