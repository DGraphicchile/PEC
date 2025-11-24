# Especificación del Sistema Iserie – ACHS
## Sistema de Cálculo, Liquidación y Pago de Prestaciones Económicas

Documento alineado 100% a las notas de la reunión del 8 de agosto de 2025 (`version_actual/iseries/reunion_20250808.md`).

---

## 1. Resumen ejecutivo

El sistema Iserie opera como mantenedor y motor de cálculo para prestaciones económicas. La gestión documental y diversas validaciones se realizan de forma manual fuera del sistema. Este documento consolida las capacidades, procesos, automatizaciones, excepciones e integraciones manuales descritas en la reunión.

---

## 2. Alcance funcional confirmado

### 2.1 Constitución del derecho a pensión
- Recepción y validación de documentos médicos y legales.
- Armado de expediente y revisión legal por Fiscalía.
- Ingreso a Iserie solo con visto bueno legal.
- Cálculo del monto mensual y del retroactivo (desde la fecha de derecho hasta la formalización).
- Generación de finiquito, firma, digitalización y activación de la pensión.

### 2.2 Asignación familiar
- Ingreso, actualización y extinción de cargas familiares con validación documental (certificados de nacimiento/estudios, declaraciones juradas, etc.).
- Validación mensual de vigencia, con especial atención a viudas menores de 45 años.
- Cierre de modificaciones entre el 1 y el 8 de cada mes; cambios posteriores quedan para el mes siguiente.
- Coordinación con el programa nacional PIES para evitar duplicidad de cargas; actualización manual basada en reportes de Iserie.

### 2.3 Concurrencia y prorrata
- Aplicación de prorrata según años trabajados en diferentes mutualidades.
- Pago completo al beneficiario por parte de H y conciliación financiera trimestral entre entidades.
- Generación de archivos de conciliación con porcentajes y montos.
- Uso de una plataforma externa para el cálculo y conciliación de concurrencias.

### 2.4 Control mensual de pensiones, liquidación y pago
- Inactivaciones y reactivaciones según normativa y dictámenes.
- Gestión de cobrantes (poderes, interdicción), retenciones judiciales y modificaciones de sistema de salud.
- Preliquidación y validación antes del envío del archivo definitivo.
- Generación de archivos planos para Banco de Chile y pagos a terceros, incluyendo pensionados en el extranjero.
- Reportes detallados por tipo de pago y descuento.

---

## 3. Integraciones, reportes y operaciones con terceros (manuales)
- Envío de archivos para integración contable con SAP.
- Reporte GRIS a SUSESO.
- Consultas masivas al Registro Civil (fallecimientos, estado civil, cambios de nombre) vía archivo; resultado puede gatillar inactivaciones automáticas o gestión de excepciones.
- Actualización manual en el programa PIES según reportes emitidos por Iserie.
- Archivos de concurrencia para conciliación entre entidades.
- Gestión y resguardo de credenciales (incluyendo FTP) documentadas y disponibles para analistas responsables.

---

## 4. Automatizaciones y cierres operativos
- Al cierre mensual, el sistema automatiza:
  - Inactivación por edad.
  - Validación de certificados de estudio.
  - Actualización por cambios de estado civil.
  - Generación de reportes para IPS, Tesorería y SUSESO.
- Cada automatización genera un reporte PDF para auditoría y validación interna.
- En asignación familiar, solo se permiten cambios hasta el cierre; modificaciones posteriores quedan diferidas.

---

## 5. Reglas de cálculo y criterios confirmados
- Cálculo de pensión por incapacidad o fallecimiento.
- Cálculo de retroactivos desde la fecha de derecho hasta la formalización o reactivación.
- Cálculo de asignación familiar por tramo de ingresos (con declaración jurada).
- Cálculo prorrata por años trabajados en distintas mutualidades y porcentajes de concurrencia.
- Cálculo de días a pagar según fecha de cumplimiento de edad.
- Cálculo de pensión mínima según rango etario.
- Cálculo de bonificaciones asociadas a cargas familiares.
- Descuentos previsionales y de salud.
- Tope máximo de pago total del 100% cuando hay múltiples beneficiarios (artículo 50) mediante ajuste proporcional.
- Reajustes por IPC y variaciones anuales.

---

## 6. Excepciones y particularidades operativas

### 6.1 Excepciones de negocio
- Reactivación manual de pensiones por dictamen especial (casos extraordinarios).
- Modificación manual de vigencias no cubiertas por lógica automática.
- Pago de pensión sin información del Registro Civil, con regularización posterior.
- Ingreso/renovación de cobrantes por mandato vencido.
- Retención judicial por dictamen de tribunal, con pago a terceros.
- Pagos extraordinarios/no formulables para correcciones no previstas.
- Reactivación por presentación tardía de certificados de estudio (con pago retroactivo).
- Inactivación por cumplimiento de edad aun con certificados de estudio vigentes (tope legal aplicable).

### 6.2 Excepciones de sistema
- Falta de integraciones automáticas con sistemas externos; uso de archivos planos y actualizaciones manuales.
- Validación manual de formato/contenido de documentos cargados (p. ej., sensibilidad a mayúsculas/minúsculas).
- Posibilidad de avanzar sin documentos obligatorios bajo excepción formal, con posterior regularización (no bloqueo duro).
- Generación de reportes para actualización manual en sistemas externos.
- Acceso operativo a documentos PDF generados por el sistema; no se dispone de acceso directo a tablas.
- Restricción de modificaciones solo hasta el cierre mensual para evitar incongruencias.

---

## 7. Beneficiarios y límites legales
- Categorización y validación de beneficiarios para pensiones de sobrevivencia y orfandad.
- Aplicación del artículo 50 para limitar el pago total al 100% cuando existen múltiples beneficiarios, ajustando porcentajes en proporción.
- Aplicación de pagos mínimos según rango etario y normativa vigente.

---

## 8. Documentación y trazabilidad
- Cada etapa del proceso cuenta con documentación asociada y trazabilidad.
- Los procesos generan reportes y PDFs uniformes para auditoría.
- Las credenciales y accesos están documentados y disponibles para el equipo responsable.

---

## 9. Fuera de alcance de esta especificación (por no haber sido mencionado en la reunión)
- Detalles técnicos de la plataforma, arquitectura o interfaz de usuario.
- Nomenclaturas o codificaciones internas de procesos, eventos o reglas.
- Parámetros normativos específicos (porcentajes, vigencias, edades exactas) no citados explícitamente.
- Listados exhaustivos de leyes o productos específicos no mencionados.

Esta especificación solo recoge afirmaciones presentes en la reunión. Cualquier detalle adicional deberá incorporarse con su fuente explícita.

---

Autor: Equipo de Análisis de Dominio ACHS
Fecha: 2025-08-08

