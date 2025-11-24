# 7. Despliegue (Deployment View)

## 7.1 Ambientes
- Dev, Test, Prod con configuración aislada.

## 7.2 Topología
- API AdonisJS + workers/jobs.
- DB relacional (tablas de dominio, outbox, proyecciones).
- Almacenamiento de archivos (evidencias/reports).
- Mensajería (si aplica outbox→broker).

## 7.3 Mapeo de bloques a infraestructura
- Núcleo de dominio y proyecciones → DB primaria.
- Integraciones → conectores HTTP/Async con retry/timeout.

## 7.4 CI/CD y configuración
- Migraciones versionadas; healthchecks; variables por entorno; secretos en gestor seguro.
- Artefactos normativos (parámetros/directivas) versionados y promovidos por ambiente con verificación EV (Anexo G).

Nota: Se incorporará diagrama de despliegue en iteraciones posteriores.
