# Anexo I: Catálogo de Informes Regulatorios y Notificaciones (CIRN)

## **20. Catálogo de Informes Regulatorios y Notificaciones (CIRN)****

### **20.1. Propósito y Alcance**

Este catálogo define y estandariza todos los informes y notificaciones que el sistema debe generar y enviar a entidades externas, ya sean entes reguladores (SUSESO, IPS), otros organismos administradores o empleadores.

El propósito del CIRN es:

  - Asegurar que el sistema cumpla con todas las obligaciones de información estipuladas por la normativa.
  - Proporcionar especificaciones claras al equipo de desarrollo sobre el contenido, formato, frecuencia y destinatario de cada informe.
  - Crear un marco para la gestión de la evolución normativa, permitiendo versionar y adaptar los informes a medida que cambien las regulaciones.

Cada informe definido aquí se corresponde con una instancia o un conjunto de instancias de la entidad `InformeRegulatorio` o una notificación formal generada por el sistema.

### **20.2. Catálogo Detallado**

#### **A. Informes a la Superintendencia de Seguridad Social (SUSESO)**

| ID del Informe | Nombre del Informe | Proceso (PDN) Asociado | Frecuencia / Disparador | Formato y Medio | Contenido Clave / Fuente Normativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`IR-SUSESO-001`** | Informe Mensual de Otorgamientos | `PDN-REP-001` | Mensual | CSV vía SFTP | - Datos del beneficiario, tipo de prestación (`Pensión`, `Indemnización`), monto, fecha de otorgamiento. <br>- Cumple con la necesidad de reportería general. |
| **`IR-SUSESO-002`** | Informe Mensual de Modificaciones | `PDN-COR-001`, `PDN-MANT-004`, `PDN-MANT-005` | Mensual | CSV vía SFTP | - Identificación de la prestación modificada, causal de modificación (reliquidación, revisión, reevaluación), monto anterior, monto nuevo. |
| **`IR-SUSESO-003`** | Informe Mensual de Ceses | `PDN-MANT-001`, `PDN-MANT-010` | Mensual | CSV vía SFTP | - Identificación de la prestación cesada, causal de cese (edad de vejez, nuevo vínculo, fallecimiento), fecha efectiva del cese. |
| **`IR-SUSESO-004`** | Notificación de Suspensión de Subsidio | `PDN-MANT-002` (implícito) | **Disparador:** Al suspender un subsidio por negativa del trabajador a continuar tratamiento. <br> **Plazo:** Dentro de 5 días hábiles de la suspensión. | Documento PDF vía Portal SUSESO | - Identificación del trabajador, médico tratante, antecedentes que fundamentan la suspensión. <br>- **Fuente:** Compendio Libro VI, Título II, Letra P. |
| **`IR-SUSESO-005`** | Entrega de Expediente de Trámite por Requerimiento | (Proceso de Gobernanza) | **Disparador:** Solicitud explícita de SUSESO. <br> **Plazo:** Máximo 5 días hábiles desde el requerimiento. | Expediente digital (PDFs, datos estructurados) vía Portal SUSESO | - Entrega completa del `ExpedienteDeTramite` físico o electrónico, conteniendo todos los documentos y gestiones. <br>- **Fuente:** Compendio Libro VI, Título I, Letra C, Número 5. |

#### **B. Informes al Instituto de Previsión Social (IPS)**

| ID del Informe | Nombre del Informe | Proceso (PDN) Asociado | Frecuencia / Disparador | Formato y Medio | Contenido Clave / Fuente Normativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`IR-IPS-001`** | Nómina de Pensionados Próximos a Cumplir Edad de Vejez | (Proceso de Vigilancia) | Mensual | Archivo electrónico (formato Anexo N°11) vía Interconexión de Datos Previsionales | - Envío con 6 meses de antelación de la nómina de pensionados por invalidez que cumplirán la edad para pensionarse por vejez. <br>- **Fuente:** Compendio Libro VI, Título III, Letra D, Número 12, literal b). |
| **`IR-IPS-002`** | Flujo de Intercambio de Datos (Ley N°20.531) | (Proceso de Vigilancia y Pago) | Mensual (flujo bidireccional) | Archivos electrónicos vía Interconexión de Datos Previsionales | - **Envío a IPS:** Monto de la cotización legal de salud de beneficiarios para cálculo de bonificación. <br>- **Recepción de IPS:** Nómina de beneficiarios con derecho a exención de cotización de salud. <br>- **Fuente:** Compendio Libro VI, Título V. |
| **`IR-IPS-003`** | Solicitud de Estimación de Pensión (Leyes Antiguas) | `PDN-OTG-002` (para funcionarios públicos específicos) | **Disparador:** Al calcular una pensión para un funcionario público cubierto por Art. 1° Ley N°19.345. | Oficio formal / Interconexión | - Solicitud al IPS para que estime la pensión que habría correspondido bajo las normas anteriores al 1 de marzo de 1995. <br>- **Fuente:** Compendio Libro VI, Título III, Letra D, Número 6. |

#### **C. Notificaciones a Otras Entidades**

| ID del Informe | Nombre del Informe | Proceso (PDN) Asociado | Frecuencia / Disparador | Formato y Medio | Contenido Clave / Fuente Normativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`NOTIF-EMP-001`** | Notificación de Cese de Funciones por Pensión | `PDN-MANT-011` | **Disparador:** Al otorgarse una pensión de invalidez (parcial o total) a un funcionario público. | Documento PDF formal vía correo electrónico certificado o portal de empleadores. | - Informa a la entidad empleadora pública que el funcionario ha obtenido una pensión de la Ley 16.744 y debe cesar en sus funciones. <br>- **Fuente:** Compendio Libro VI, Título III, Letra D, Número 9, literal c). |
| **`NOTIF-AFP-001`** | Notificación de Otorgamiento de Pensión de Invalidez | `PDN-MANT-006` | **Disparador:** Al otorgar una pensión de invalidez a un afiliado del D.L. N°3.500. | Oficio formal / Interconexión con AFPs | - Informa a la AFP correspondiente sobre la constitución de la pensión para que puedan gestionar la incompatibilidad del Art. 12 del D.L. N°3.500. <br>- **Fuente:** Compendio Libro VI, Título III, Letra D, Número 9, literal a). |