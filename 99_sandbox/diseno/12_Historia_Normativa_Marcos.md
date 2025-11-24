### **PARTE VI: Gobernanza de la Evolución Normativa**

### **21. Catálogo Histórico de Snapshots Normativos (SNA)**

#### **21.1. Propósito y Utilización**

Este catálogo documenta la evolución de los parámetros de cálculo a lo largo del tiempo. Cada `SnapshotNormativo` es un artefacto de configuración inmutable y versionado que congela todas las constantes, porcentajes, topes y plazos vigentes para un período específico.

Cuando el sistema debe realizar un cálculo, ya sea para un nuevo otorgamiento o para una reliquidación, primero determina la fecha del `HechoCausal`. Luego, selecciona el `SNA` cuya `FechaVigencia` es inmediatamente anterior o igual a dicha fecha. Esto garantiza que cada cálculo se realice siempre con las reglas correctas de su tiempo, asegurando el cumplimiento y la auditabilidad total.

A continuación, se presenta un historial representativo de los SNA clave en su versión completa.

-----

#### **21.2. SNA v1.0.0 (01-03-1995)**

  * **Análisis del Cambio:** Este snapshot representa una línea base post-reformas de los años 90. Se establece un modelo de cálculo para trabajadores dependientes y un modelo simple para los independientes voluntarios. Las pensiones de sobrevivencia para viudez no distinguen su porcentaje por la existencia de hijos.

<!-- end list -->

```json
{
  "SnapshotVersion": "v1.0.0",
  "FechaVigencia": "1995-03-01",
  "HitoNormativo": "Línea Base Post-Reformas (Ej. Ley N°19.345 para Sector Público)",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezPct": 0.5,
      "MadreHijosNoMatrimonialesPct": 0.3,
      "OrfandadPct": 0.2
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```

-----

#### **21.3. SNA v2.0.0 (01-07-2004)**

  * **Análisis del Cambio:** La **Ley N° 19.953** modifica sustancialmente los porcentajes de las pensiones de sobrevivencia, creando una distinción clave para el/la cónyuge sobreviviente según si existen o no hijos con derecho a pensión. Esto requiere una actualización directa en los parámetros de `PensionesSobrevivencia`.

<!-- end list -->

```json
{
  "SnapshotVersion": "v2.0.0",
  "FechaVigencia": "2004-07-01",
  "HitoNormativo": "Ley N° 19.953 - Modifica porcentajes de Pensiones de Sobrevivencia.",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezSinHijosPct": 0.60,
      "ViudezConHijosPct": 0.50,
      "MadreSinHijosPct": 0.36,
      "MadreConHijosPct": 0.30,
      "OrfandadPct": 0.20
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```

-----

#### **21.4. SNA v3.0.0 (01-07-2008)**

  * **Análisis del Cambio:** La **Ley N° 20.255 (Reforma Previsional)** introduce la figura del "trabajador independiente obligado" a cotizar, basando su renta en la declaración anual de impuestos. Esto requiere una nueva `EstrategiaDeRecopilacionRentas` que priorice al Servicio de Impuestos Internos (SII) y un método de cálculo de renta anualizado. También introduce el Aporte Previsional Solidario (APS) para pensiones de sobrevivencia.

<!-- end list -->

```json
{
  "SnapshotVersion": "v3.0.0",
  "FechaVigencia": "2008-07-01",
  "HitoNormativo": "Ley N° 20.255 - Reforma Previsional (Independientes Obligados y APS)",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED", "SII"]
      },
      "IndependientesObligatorios": {
        "rentaEsAnual": true,
        "mesesRequeridos": 12,
        "ventanaMaximaBusquedaMeses": 24,
        "tratamientoLagunas": "INCLUIR_COMO_CERO",
        "fuentesPrioritarias": ["SII", "INTERNO_COTIZACIONES"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezSinHijosPct": 0.60,
      "ViudezConHijosPct": 0.50,
      "MadreSinHijosPct": 0.36,
      "MadreConHijosPct": 0.30,
      "OrfandadPct": 0.20
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "BeneficiosAdicionales": {
      "AplicaAportePrevisionalSolidario": true
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```

-----

#### **21.5. SNA v4.0.0 (22-10-2015)**

  * **Análisis del Cambio:** La **Ley N° 20.830** crea el Acuerdo de Unión Civil (AUC), otorgando nuevos derechos y estados civiles. El compendio instruye explícitamente equiparar al "conviviente civil" con el "cónyuge" para efectos de ser beneficiario de pensión de sobrevivencia y como causal de cese por nuevo vínculo. Este cambio se modela a nivel de lógica de reglas más que en parámetros numéricos, pero el SNA lo registra como hito.

<!-- end list -->

```json
{
  "SnapshotVersion": "v4.0.0",
  "FechaVigencia": "2015-10-22",
  "HitoNormativo": "Ley N° 20.830 - Acuerdo de Unión Civil (AUC)",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED", "SII"]
      },
      "IndependientesObligatorios": {
        "rentaEsAnual": true,
        "mesesRequeridos": 12,
        "ventanaMaximaBusquedaMeses": 24,
        "tratamientoLagunas": "INCLUIR_COMO_CERO",
        "fuentesPrioritarias": ["SII", "INTERNO_COTIZACIONES"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezSinHijosPct": 0.60,
      "ViudezConHijosPct": 0.50,
      "MadreSinHijosPct": 0.36,
      "MadreConHijosPct": 0.30,
      "OrfandadPct": 0.20
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "BeneficiosAdicionales": {
      "AplicaAportePrevisionalSolidario": true
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```

-----

#### **21.6. SNA v5.0.0 (01-07-2019)**

  * **Análisis del Cambio:** La **Ley N° 21.133** moderniza la legislación tributaria y previsional, estableciendo un mecanismo transitorio para las cotizaciones de independientes obligados, imputando pagos de 2018 al período 2019-2020. Esto modifica la lógica de cálculo y verificación de cotizaciones al día para este segmento, un cambio en las reglas de negocio que es registrado por este snapshot.

<!-- end list -->

```json
{
  "SnapshotVersion": "v5.0.0",
  "FechaVigencia": "2019-07-01",
  "HitoNormativo": "Ley N° 21.133 - Modernización Tributaria (Reglas transitorias para independientes)",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED", "SII"]
      },
      "IndependientesObligatorios": {
        "rentaEsAnual": true,
        "mesesRequeridos": 12,
        "ventanaMaximaBusquedaMeses": 24,
        "tratamientoLagunas": "INCLUIR_COMO_CERO",
        "fuentesPrioritarias": ["SII", "INTERNO_COTIZACIONES"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezSinHijosPct": 0.60,
      "ViudezConHijosPct": 0.50,
      "MadreSinHijosPct": 0.36,
      "MadreConHijosPct": 0.30,
      "OrfandadPct": 0.20
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "BeneficiosAdicionales": {
      "AplicaAportePrevisionalSolidario": true
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```

-----

#### **21.7. SNA v6.0.0 (01-02-2022)**

  * **Análisis del Cambio:** La **Ley N° 21.419** crea la Pensión Garantizada Universal (PGU), que reemplaza por el solo ministerio de la ley al Aporte Previsional Solidario (APS) de vejez que aplicaba a los pensionados de sobrevivencia. El sistema ahora debe interactuar con el IPS para determinar los montos de la PGU en lugar del antiguo APS.

<!-- end list -->

```json
{
  "SnapshotVersion": "v6.0.0",
  "FechaVigencia": "2022-02-01",
  "HitoNormativo": "Ley N° 21.419 - Pensión Garantizada Universal (PGU)",
  "Parametros": {
    "EstrategiasRecopilacionRentas": {
      "Dependientes": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES", "PREVIRED", "SII"]
      },
      "IndependientesObligatorios": {
        "rentaEsAnual": true,
        "mesesRequeridos": 12,
        "ventanaMaximaBusquedaMeses": 24,
        "tratamientoLagunas": "INCLUIR_COMO_CERO",
        "fuentesPrioritarias": ["SII", "INTERNO_COTIZACIONES"]
      },
      "IndependientesVoluntarios": {
        "mesesRequeridos": 6,
        "ventanaMaximaBusquedaMeses": 12,
        "fuentesPrioritarias": ["INTERNO_COTIZACIONES"]
      }
    },
    "PensionesInvalidez": {
      "InvalidezParcialPct": 0.35,
      "InvalidezTotalPct": 0.7,
      "GranInvalidezSuplementoPct": 0.3
    },
    "PensionesSobrevivencia": {
      "ViudezSinHijosPct": 0.60,
      "ViudezConHijosPct": 0.50,
      "MadreSinHijosPct": 0.36,
      "MadreConHijosPct": 0.30,
      "OrfandadPct": 0.20
    },
    "Indemnizaciones": {
      "TablaSueldosBase": [
        { "incapacidad": 15.0, "sueldosBase": 1.5 }, { "incapacidad": 17.5, "sueldosBase": 3.0 },
        { "incapacidad": 20.0, "sueldosBase": 4.5 }, { "incapacidad": 22.5, "sueldosBase": 6.0 },
        { "incapacidad": 25.0, "sueldosBase": 7.5 }, { "incapacidad": 27.5, "sueldosBase": 9.0 },
        { "incapacidad": 30.0, "sueldosBase": 10.5 }, { "incapacidad": 32.5, "sueldosBase": 12.0 },
        { "incapacidad": 35.0, "sueldosBase": 13.5 }, { "incapacidad": 37.5, "sueldosBase": 15.0 }
      ]
    },
    "BeneficiosAdicionales": {
      "AplicaAportePrevisionalSolidario": false,
      "AplicaPensionGarantizadaUniversal": true
    },
    "PlazosClave": {
      "PagoIndemnizacionDiasHabiles": 90,
      "PagoPensionInvalidezDiasHabiles": 30,
      "PrescripcionCobroSubsidioMeses": 6,
      "CaducidadRetroactivoSobrevivenciaAnios": 2,
      "SolicitudRevisionBeneficioAnios": 3
    },
    "TopesYLimites": {
      "TopeMaximoPensionInicialRef": "Ley N° 15.386, art. 25"
    }
  }
}
```
