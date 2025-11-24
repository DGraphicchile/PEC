# 3. Contexto y Alcance (C4)

## 3.1 Contexto (Nivel 1)
- PEC interactúa con organismos externos (IPS, SUSESO/SIVEGAM, Registro Civil, PREVIRED, Bancos, SAP) y usuarios internos (Operaciones, Cumplimiento, Finanzas, TI).

## 3.2 Alcance del sistema
- Incluye: ciclo de vida de prestaciones, motor de cálculo y liquidación, acuerdos de pago, reportería regulatoria, gobierno de marcos, excepciones (EXD) y verificación humana (VERF).
- Excluye: front-office público, contabilidad corporativa (más allá de comprobantes exportados), núcleo bancario.

## 3.3 Contenedores (Nivel 2)
- **Portal de Analistas (Front-end):** Una aplicación web monolítica moderna (AdonisJS + Inertia.js + React) que provee la interfaz para los usuarios internos.
- API AdonisJS + workers de jobs (pago, reportería, sincronizaciones).
- DB relacional con tablas de dominio, outbox y proyecciones para lectura/operación.
- Integraciones (SFTP/HTTP/colas) y almacenamiento de evidencias/documentos.

## 3.4 Interfaces externas
- Ver catálogo en `1_dominio/07_Interfaces_Externas.md` y `3_especificacion_tecnica/integraciones/`.

Nota: Diagramas C4 se incorporarán en siguientes iteraciones.
