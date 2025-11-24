Procedo a realizar una verificación exhaustiva y a presentar la estructura de archivos actualizada, asegurando que cada entidad definida en el `Capítulo 04: Modelo de Entidades` del MDLO tiene una correspondencia directa en el modelo de la aplicación.

### **1. Matriz de Verificación de Entidades (MDLO vs. Implementación)**

La siguiente tabla detalla cada entidad especificada en el MDLO y su archivo de modelo correspondiente en la estructura de AdonisJS. Este análisis garantiza una cobertura completa.

| Entidad MDLO | Sección MDLO | Archivo de Modelo AdonisJS (`app/models/`) |
| :--- | :--- | :--- |
| `Persona` | 1.1 | `Persona.ts` |
| `FichaPersona` | 1.2 | `FichaPersona.ts` |
| `HechoCausal` | 1.3 | `HechoCausal.ts` |
| `PrestacionEconomica`| 1.4 | `PrestacionEconomica.ts` |
| `LiquidacionDePago` | 1.5 | `LiquidacionDePago.ts` |
| `AcuerdoDePago` | 2.1 | `AcuerdoDePago.ts` |
| `MetodoDePago` | 2.2 | `MetodoDePago.ts` |
| `ConfiguracionDescuento` | 2.3 | `ConfiguracionDescuento.ts` |
| `CalculoSueldoBase` | 3.1 | `CalculoSueldoBase.ts` |
| `ConceptoLiquidacion`| 3.2 | `ConceptoLiquidacion.ts` |
| `ComprobanteContable`| 3.3 | `ComprobanteContable.ts` |
| `CapitalRepresentativo`| 3.4 | `CapitalRepresentativo.ts` |
| `AjusteManualLiquidacion`| 3.5 | `AjusteManualLiquidacion.ts` |
| `Deuda` | 3.6 | `Deuda.ts` |
| `Trabajador` | 4.1 | `Trabajador.ts` |
| `CausanteAsignacionFamiliar`| 4.2 | `CausanteAsignacionFamiliar.ts`|
| `Empleador` | 4.3 | `Empleador.ts` |
| `HistorialAfiliacion`| 4.4 | `HistorialAfiliacion.ts` |
| `BeneficioPrevisionalExterno`| 4.5 | `BeneficioPrevisionalExterno.ts`|
| `ExpedienteDeTramite`| 5.1 | `ExpedienteDeTramite.ts` |
| `Tramite` | 5.2 | `Tramite.ts` |
| `DocumentoAdjunto` | 5.3 | `DocumentoAdjunto.ts` |
| `GestionDeContacto` | 5.4 | `GestionDeContacto.ts` |
| `ResolucionRegulador`| 5.5 | `ResolucionRegulador.ts` |
| `InformeRegulatorio` | 5.6 | `InformeRegulatorio.ts` |
| `ReembolsoAEmpleador`| 5.7 | `ReembolsoAEmpleador.ts` |
| `IncidenteDeDominio` | 6.1 (Ref. Cap. 10) | `IncidenteDeDominio.ts` |

La verificación ha identificado entidades de soporte, contabilidad y trámite que deben ser explícitamente añadidas al directorio de modelos para una cobertura completa.

-----

### **2. Estructura de Directorios y Archivos Completa y Actualizada**

A continuación se presenta la estructura refinada. La sección `app/models/` ha sido expandida para incluir todas las entidades verificadas en la matriz anterior.

```
pec-adonis/
│
├── .vscode/
├── .adonisrc.ts
├── .env
├── .env.example
├── .gitignore
├── ace.js
├── package.json
├── README.md
├── start/
│   ├── kernel.ts       // Registro de middleware global
│   └── routes.ts       // Definición de rutas API
│
├── app/
│   │
│   ├── controllers/      // Capa HTTP: Recibe peticiones, delega a servicios, retorna respuestas.
│   │   ├── PrestacionesController.ts
│   │   ├── AcuerdosPagoController.ts
│   │   ├── GobernanzaController.ts
│   │   └── ReportesController.ts
│   │
│   ├── models/           // Capa de Datos (Lucid ORM): Cobertura 1:1 con Entidades del Anexo B.
│   │   │
│   │   ├── # Entidades Principales
│   │   ├── Persona.ts
│   │   ├── FichaPersona.ts
│   │   ├── HechoCausal.ts
│   │   ├── PrestacionEconomica.ts
│   │   ├── LiquidacionDePago.ts
│   │   │
│   │   ├── # Entidades de Acuerdos y Pagos
│   │   ├── AcuerdoDePago.ts
│   │   ├── MetodoDePago.ts
│   │   ├── ConfiguracionDescuento.ts
│   │   │
│   │   ├── # Entidades de Cálculo y Contabilidad
│   │   ├── CalculoSueldoBase.ts
│   │   ├── ConceptoLiquidacion.ts
│   │   ├── ComprobanteContable.ts
│   │   ├── CapitalRepresentativo.ts
│   │   ├── AjusteManualLiquidacion.ts
│   │   ├── Deuda.ts
│   │   │
│   │   ├── # Entidades de Soporte y Relacionales
│   │   ├── Trabajador.ts
│   │   ├── CausanteAsignacionFamiliar.ts
│   │   ├── Empleador.ts
│   │   ├── HistorialAfiliacion.ts
│   │   ├── BeneficioPrevisionalExterno.ts
│   │   │
│   │   ├── # Entidades de Trámite y Comunicación
│   │   ├── ExpedienteDeTramite.ts
│   │   ├── Tramite.ts
│   │   ├── DocumentoAdjunto.ts
│   │   ├── GestionDeContacto.ts
│   │   ├── ResolucionRegulador.ts
│   │   ├── InformeRegulatorio.ts
│   │   ├── ReembolsoAEmpleador.ts
│   │   │
│   │   ├── # Entidades de Gobernanza
│   │   ├── IncidenteDeDominio.ts
│   │   │
│   │   └── # Entidad de Configuración Normativa
│   │   └── SnapshotNormativo.ts
│   │
│   ├── validators/       // Reglas de validación para los datos de entrada de las API.
│   │   ├── CrearAcuerdoPagoValidator.ts
│   │   ├── SolicitarRevisionValidator.ts
│   │   └── CrearIncidenteManualValidator.ts
│   │
│   ├── services/         // Servicios de Aplicación: Orquestan los procesos de negocio (PDN).
│   │   ├── OtorgamientoService.ts    // Implementa PDN-OTG-*
│   │   ├── MantenimientoService.ts   // Implementa PDN-MANT-*
│   │   ├── CorreccionService.ts      // Implementa PDN-COR-*
│   │   ├── CicloPagoService.ts      // Implementa PDN-PAG-*
│   │   └── GobernanzaService.ts      // Implementa PDN-GOB-*
│   │
│   ├── jobs/             // Tareas en segundo plano (colas): Para procesos largos o programados.
│   │   ├── CicloPagoMensualJob.ts            // Orquestador de PDN-PAG-001
│   │   ├── MonitoreoCesePorEdadJob.ts       // Implementa PDN-MON-004
│   │   ├── VerificacionRegistroCivilJob.ts   // Implementa PDN-MON-005 y 006
│   │   └── GeneracionReporteRegulatorioJob.ts
│   │
│   ├── exceptions/       // Clases de Excepciones personalizadas.
│   │   ├── BaseDomainException.ts
│   │   ├── HistorialRentasInsuficienteException.ts  // Para EXD-DATOS-002
│   │   └── TransicionEstadoInvalidaException.ts   // Para EXD-CICLOVIDA-001
│   │
│   ├── mailers/          // Clases para envío de correos electrónicos.
│   │   └── NotificacionProximidadCeseMailer.ts // Para COMM-MANT-001
│   │
│   └── lib/              // Lógica de Dominio Pura: El corazón del sistema, sin dependencias de HTTP o AdonisJS.
│       │
│       ├── shared/
│       │   ├── Types.ts              // Enumeraciones y tipos del Glosario y Catálogos (Anexo A).
│       │   └── index.ts
│       │
│       ├── calculo/          // Implementación del "Motor de Cálculo y Liquidación".
│       │   ├── rdn/                  // Directorio para la implementación de Reglas de Negocio atómicas.
│       │   │   ├── valid/
│       │   │   │   └── ValidOtorg001_CotizacionesIndependiente.ts
│       │   │   ├── calc/
│       │   │   │   ├── CalcPli001_DescuentoSalud.ts
│       │   │   │   └── CalcOtg001_SueldoBaseDependiente.ts
│       │   │   └── cump/
│       │   │       └── CumpOtorg001_PlazoPagoIndemnizacion.ts
│       │   │
│       │   └── LiquidacionBuilder.ts  // Construye una LiquidacionDePago aplicando las RDN.
│       │
│       ├── ciclo_de_vida/
│       │   └── MaquinaEstadosPrestacion.ts // Implementa la máquina de estados del Anexo B.
│       │
│       ├── normativa/
│       │   └── SnapshotNormativoProvider.ts // Servicio para obtener el SNA correcto según fecha de siniestro.
│       │
│       └── integraciones/    // Clientes y parsers para Interfaces Externas (Anexo E).
│           ├── ips/
│           │   ├── IpsApiClient.ts
│           │   └── parsers/
│           │       └── PguParser.ts   // Parsea el archivo aIII_tapsAAAAMM.rutcsv
│           ├── sivegam/
│           │   └── SivegamReportGenerator.ts
│           ├── previred/
│           │   └── CotizacionesFileGenerator.ts
│           ├── banco_chile/
│           │   └── NominaPagoGenerator.ts
│           └── sap/
│               └── ComprobanteContableGenerator.ts
│
├── config/
│   ├── app.ts
│   ├── cors.ts
│   ├── database.ts
│   ├── hash.ts
│   ├── mail.ts
│   └── integraciones.ts  // Configuración de URLs, credenciales para servicios externos (IPS, SIVEGAM, etc.)
│
├── database/
│   ├── migrations/       // Un archivo por cada entidad del modelo. La numeración debe ser secuencial.
│   │   ├── 001_create_personas_table.ts
│   │   ├── 002_create_empleadores_table.ts
│   │   ├── 003_create_fichas_persona_table.ts
│   │   ├── 004_create_hechos_causales_table.ts
│   │   ├── ...etc...
│   │
│   └── seeders/          // Datos iniciales para poblar el sistema.
│       ├── 1_CatalogosSeeder.ts        // Carga todos los catálogos del Anexo A.
│       ├── 2_SnapshotsNormativosSeeder.ts // Carga todos los SNA del Anexo J.
│       └── 3_UsuariosTestSeeder.ts
│
├── contracts/            // Definiciones de tipos y interfaces para TypeScript.
│   ├── adonis.d.ts
│   └── domain.d.ts       // Tipos específicos del dominio para extender el intellisense.
│
├── public/               // Archivos estáticos.
│
└── tests/
    ├── bootstrap.ts
    ├── functional/       // Pruebas de API (end-to-end).
    │   ├── otorgamiento.spec.ts
    │   └── mantenimiento_acuerdos.spec.ts
    │
    ├── unit/             // Pruebas de componentes aislados.
    │   ├── lib/
    │   │   ├── calculo/
    │   │   │   └── rdn/
    │   │   │       └── calc_pli_001_descuento_salud.spec.ts
    │   │   └── integraciones/
    │   │       └── ips/
    │   │           └── pgu_parser.spec.ts
    │   └── models/
    │       └── PrestacionEconomica.spec.ts
    │
    └── scenarios/        // Pruebas que validan los Escenarios de Verificación (Anexo G).
        ├── otg_evp_001_otorg_pension_dependiente.spec.ts
        ├── mant_evp_002_regularizacion_sobrevivencia.spec.ts
        └── cese_evl_002_calculo_pago_exceso.spec.ts
```

La estructura ha sido corregida y expandida. El mapeo entre el modelo de entidades del MDLO y los modelos de AdonisJS es ahora completo, proporcionando una base exhaustiva para la implementación.