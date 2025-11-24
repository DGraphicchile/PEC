### **Estructura Exhaustiva de Directorios y Archivos del Proyecto PEC**

```
pec-adonis/
│
├── .adonisrc.ts
├── .env
├── ace.js
├── package.json
├── start/
│   ├── kernel.ts
│   └── routes.ts
│
├── providers/
│   └── PdnProvider.ts      // Registra todos los componentes PDN y RDN versionados en el contenedor IoC.
│
├── config/
│   ├── app.ts
│   ├── cors.ts
│   ├── database.ts
│   ├── hash.ts
│   ├── mail.ts
│   ├── marcos_normativos.ts          // Contiene el Registro de Marcos Normativos y sus composiciones.
│   ├── repositorio_directivas.ts     // Contiene el Repositorio de Directivas de Ejecución versionadas.
│   └── repositorio_parametros.ts     // Contiene el Repositorio de Parámetros Normativos versionados.
│
├── app/
│   │
│   ├── controllers/
│   │   ├── PrestacionesController.ts
│   │   ├── AcuerdosPagoController.ts
│   │   ├── GobernanzaController.ts
│   │   └── ReportesController.ts
│   │
│   ├── models/           // Mapeo 1:1 con Entidades del Anexo B.
│   │   ├── AjusteManualLiquidacion.ts
│   │   ├── AcuerdoDePago.ts
│   │   ├── BeneficioPrevisionalExterno.ts
│   │   ├── CalculoSueldoBase.ts
│   │   ├── CapitalRepresentativo.ts
│   │   ├── CausanteAsignacionFamiliar.ts
│   │   ├── ComprobanteContable.ts
│   │   ├── ConceptoLiquidacion.ts
│   │   ├── ConfiguracionDescuento.ts
│   │   ├── Deuda.ts
│   │   ├── DocumentoAdjunto.ts
│   │   ├── Empleador.ts
│   │   ├── ExpedienteDeTramite.ts
│   │   ├── FichaPersona.ts
│   │   ├── GestionDeContacto.ts
│   │   ├── HechoCausal.ts
│   │   ├── HistorialAfiliacion.ts
│   │   ├── IncidenteDeDominio.ts
│   │   ├── InformeRegulatorio.ts
│   │   ├── LiquidacionDePago.ts
│   │   ├── MetodoDePago.ts
│   │   ├── Persona.ts
│   │   ├── PrestacionEconomica.ts
│   │   ├── ReembolsoAEmpleador.ts
│   │   ├── ResolucionRegulador.ts
│   │   ├── SnapshotNormativo.ts
│   │   ├── Trabajador.ts
│   │   └── Tramite.ts
│   │
│   ├── services/         // Orquestadores de alto nivel.
│   │   ├── CicloPagoService.ts
│   │   ├── CorreccionService.ts
│   │   ├── GobernanzaService.ts
│   │   ├── MantenimientoService.ts
│   │   └── OtorgamientoService.ts
│   │
│   ├── domain/           // Lógica y tipos puros del dominio.
│   │   ├── core/
│   │   │   └── FrameworkResolverService.ts // Servicio de resolución de Marcos Normativos.
│   │   │
│   │   └── enums/        // Representación de los Catálogos del Anexo A como Enums de TypeScript.
│   │       ├── acuerdo_pago_tipo.enum.ts
│   │       ├── banco.enum.ts
│   │       ├── cuenta_bancaria_tipo.enum.ts
│   │       ├── hecho_causal_tipo.enum.ts
│   │       ├── inactivacion_codigo.enum.ts
│   │       ├── pais.enum.ts
│   │       ├── prestacion_economica_estado.enum.ts
│   │       ├── prestacion_economica_tipo.enum.ts
│   │       ├── rol_tercero.enum.ts
│   │       └── sobrevivencia_beneficiario_tipo.enum.ts
│   │
│   ├── lib/              // Implementaciones de lógica de negocio versionada.
│   │   ├── pdn/            // Implementaciones de Procesos de Negocio.
│   │   │   ├── otorgamiento/ // OTG
│   │   │   │   ├── PDN-OTG-001/
│   │   │   │   │   ├── PdnOtg001_v1.ts
│   │   │   │   │   ├── PdnOtg001_v2.ts
│   │   │   │   │   └── PdnOtg001_v3.ts
│   │   │   │   ├── PDN-OTG-002/
│   │   │   │   │   └── PdnOtg002_v1.ts
│   │   │   │   ├── PDN-OTG-003/
│   │   │   │   │   └── PdnOtg003_v1.ts
│   │   │   │   ├── PDN-OTG-004/
│   │   │   │   │   └── PdnOtg004_v1.ts
│   │   │   │   ├── PDN-OTG-005/
│   │   │   │   │   └── PdnOtg005_v1.ts
│   │   │   │   └── PDN-OTG-006/
│   │   │   │       ├── PdnOtg006_v1.ts
│   │   │   │       ├── PdnOtg006_v2.ts
│   │   │   │       ├── PdnOtg006_v3.ts
│   │   │   │       └── PdnOtg006_v4.ts
│   │   │   ├── mantenimiento/ // MANT
│   │   │   │   ├── PDN-MANT-001/
│   │   │   │   │   └── PdnMant001_v1.ts
│   │   │   │   ├── ... (y así sucesivamente para los 20 procesos MANT)
│   │   │   │   └── PDN-MANT-010/
│   │   │   │       ├── PdnMant010_v1.ts
│   │   │   │       └── PdnMant010_v2.ts
│   │   │   ├── correccion/   // COR
│   │   │   │   ├── PDN-COR-001/
│   │   │   │   │   └── PdnCor001_v1.ts
│   │   │   │   └── ... (para los 4 procesos COR)
│   │   │   ├── pagos/        // PAG
│   │   │   │   ├── PDN-PAG-001/
│   │   │   │   │   └── PdnPag001_v1.ts
│   │   │   │   ├── PDN-PAG-003/
│   │   │   │   │   ├── PdnPag003_v1.ts
│   │   │   │   │   ├── PdnPag003_v2.ts
│   │   │   │   │   └── PdnPag003_v3.ts
│   │   │   │   └── ... (para los 10 procesos PAG)
│   │   │   ├── finanzas/     // FIN
│   │   │   │   └── ... (para los 4 procesos FIN)
│   │   │   ├── reporteria/   // REP
│   │   │   │   └── ... (para los 4 procesos REP)
│   │   │   ├── monitoreo/    // MON
│   │   │   │   └── ... (para los 8 procesos MON)
│   │   │   └── gobernanza/   // GOB
│   │   │       └── PDN-GOB-001/
│   │   │           └── PdnGob001_v1.ts
│   │   │
│   │   └── rdn/            // Implementaciones de Reglas de Negocio.
│   │       ├── valid/        // Reglas de Validación
│   │       │   ├── VALID-OTORG-001/
│   │       │   │   └── ValidOtorg001_v1.ts
│   │       │   ├── VALID-SOBREV-001/
│   │       │   │   ├── ValidSobrev001_v1.ts
│   │       │   │   └── ValidSobrev001_v2.ts
│   │       │   └── ... (para las 10 reglas VALID)
│   │       ├── calc/         // Reglas de Cálculo
│   │       │   ├── CALC-OTG-001/
│   │       │   │   └── CalcOtg001_v1.ts
│   │       │   ├── CALC-PIM-001/
│   │       │   │   └── CalcPim001_v1.ts
│   │       │   ├── CALC-PLI-001/
│   │       │   │   └── CalcPli001_v1.ts
│   │       │   └── ... (para todas las subcategorías y 19 reglas CALC)
│   │       ├── map/          // Reglas de Mapeo
│   │       │   └── MAP-REP-001/
│   │       │       └── MapRep001_v1.ts
│   │       ├── ciclo/        // Reglas de Ciclo de Vida
│   │       │   └── ... (para las 3 reglas CICLO)
│   │       ├── cump/         // Reglas de Cumplimiento
│   │       │   └── ... (para las 7 reglas CUMP)
│   │       ├── comm/         // Reglas de Comunicación
│   │       │   └── ... (para la regla COMM)
│   │       └── verf/         // Reglas de Verificación Humana
│   │           └── VERF-GOB-001/
│   │               └── VerfGob001_v1.ts
│   │
│   └── ... (resto de directorios de app como mailers, exceptions, etc.)
│
└── ... (resto de directorios raíz como database, tests, etc.)
```