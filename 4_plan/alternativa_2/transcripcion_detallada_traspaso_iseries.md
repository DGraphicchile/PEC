## Transcripción resumida – Traspaso iSeries

### Secuencia resumida por intervención
1. **Orador 1**: Verifica grabación/compartir y presenta que mostrará un mapa de procesos (no flujo) con cuatro etapas que alimentan Control de Pensiones.
2. **Errazuriz Araneda, Javier Ignacio**: Confirma que se ve la pantalla.
3. **Orador 1**: Describe Constitución (derecho a pensión por invalidez/supervivencia), recepción de documentos, cálculo y anexión; relación con Asignación Familiar (cargas, vigencias, viudas <45) y su integración con pago.
4. **Sudy Vergara, Jorge Eduardo**: Apunta que son reglas de negocio del mantenedor.
5. **Orador 1**: Amplía sobre reglas, concurrencias entre mutualidades (prorrata) y Control de Pensiones (inactivar/reactivar, haberes/descuentos, archivo bancario mensual).
6. **Gabriel Villalobos**: Pregunta si “Control de Pensiones fase 1” es iSeries.
7. **Orador 1**: Responde que iSeries hace una parte; detallará luego qué sí/no cubre.
8. **Sudy Vergara, Jorge Eduardo**: Aclara que ~95% de Control de Pensiones está en iSeries.
9. **Orador 1**: Tras el pago, se reporta a entidades (Tesorería, cajas, etc.); vuelve a explicar Constitución con foco en flujo documental.
10. **Sudy Vergara, Jorge Eduardo**: Explica códigos de colores del mapa; luego Orador 1 corrige: verdes/amarillos son de iSeries, mostaza es manual/no iSeries.
11. **Orador 1**: Detalla Constitución: documentos, expediente, revisión por Fiscalía, “visto bueno”, primer contacto con iSeries para cálculo (analista ingresa pocos datos y 6 liquidaciones), cálculo del monto y retroactivo; después vale vista, finiquito, digitalización y alta en Control de Pensiones.
12. **Orador 1**: Describe Asignación Familiar: ingresos/actualizaciones/extinciones de cargas, declaraciones juradas por tramos, “sacar la foto” (cierre) y pagar; ventana de modificaciones (p.ej. 1–8 del mes).
13. **Orador 1**: Explica PIES de SUSESO (base nacional para evitar duplicidades); no hay integración actual, se hacen actualizaciones manuales apoyadas por reportes de iSeries; cierres variables por fechas operativas (aguinaldos, etc.).
14. **Orador 1**: Sobre concurrencia: cálculo de porcentajes se hace en una plataforma aparte; iSeries sólo carga porcentajes.
15. **Orador 1**: Define “enlace”: para que nuevas pensiones entren a pago del mes siguiente deben ingresarse al fin de mes; retroactivo se paga aparte.
16. **andres guerrero**: Pregunta por significado práctico de porcentajes de concurrencia.
17. **Orador 1**: Aclara que H paga 100% al pensionado y luego concilia trimestralmente con otras entidades según porcentajes; iSeries genera el archivo de conciliación.
18. **Orador 1**: Inicia procesos mensuales: iSeries genera “documento de consultas” al Registro Civil (fallecimiento/estado civil); ACH envía archivo plano masivo por contrato.
19. **Orador 1**: Registro Civil responde con datos básicos (nombre, nacimiento, defunción) y códigos de estado civil (S, C, U); se detectan cambios de nombre/género y se valida por RUT.
20. **Orador 1**: Mantenedor de cobrantes: no siempre cobra el pensionado (interdicción, apoderado, desvíos judiciales); se guardan tipos, parentesco, regímenes y montos.
21. **Orador 1**: Cambios de salud (FONASA/Isapre), reactivaciones manuales por casuísticas no automatizables (p.ej. pensiones transitorias; dictámenes excepcionales).
22. **Orador 1**: Distingue entre “nuevo cobrante” y “modificación”; requisitos de retención judicial; “haberes/descuentos no formulables” para ajustes extraordinarios (también retroactivos).
23. **Orador 1**: “Carga de información” como prerrequisito de avanzar de etapa (p.ej. sin archivo RC no se puede inactivar por fallecimiento); se sugiere permitir excepciones operativas formalizadas (pagar y luego regularizar) cuando falte insumo crítico.
24. **Errazuriz Araneda, Javier Ignacio**: Pide que el sistema contemple excepciones formales y no bloquee totalmente.
25. **Orador 1**: Confirma y agrega etapa de validación de documentos; por transparencia no se corrigen archivos entrantes, se devuelven para ajuste; al pasar a “Regulariza” se congelan altas de cobrantes/retenciones de ese ciclo.
26. **Orador 1**: “Regulariza” corre en backend: automatiza inactivaciones/modificaciones (p.ej. invalidez al cumplir 65/60), genera notas de auditoría y reportes resumidos para analistas.
27. **Orador 1**: Aclara que corre automático (un operador dispara el proceso), tarda horas, y entrega PDFs; el área no tiene acceso a tablas, valida por documentos.
28. **Orador 1**: Automatiza cargas familiares: certificaciones de estudio entre 18–24, corte por 24 años; valida y reactiva/inactiva según regla.
29. **Orador 1**: Nupcias de viuda: se inactiva y se paga bono por matrimonio (pago único; se menciona esquema de 2 años asociado).
30. **Orador 1**: Fallecimiento: se inactiva; no se activa sobrevivencia automáticamente (requiere flujo de “derecho a pensión” con trazabilidad documental); mutuamente excluyente pensionado/viuda activos.
31. **Sandoval Parra, Marlene Elizabeth**: Consulta si la viuda es pensionada o beneficiaria.
32. **Orador 1**: Son todos “pensionados” en términos de la plataforma, aunque haya distinciones funcionales.
33. **Orador 1**: Otras reglas: viudas <45 sin hijos tienen 1 año de vigencia (cambio legislativo podría volver vitalicias); reactivaciones por certificado generan pago retroactivo.
34. **Orador 1**: Tras reactivar (p.ej. orfandad), se reactiva también viudez si corresponde; luego “Categorizar” (beneficios en otras entidades, DL 1026), validar pensiones mínimas y ajustes por edad.
35. **Orador 1**: Pasa a “Liquidación y pago”: cálculo por días (pro rata, evita pagar 30 días si corresponde menos), base de cálculo, haberes imponibles/no imponibles.
36. **Orador 1**: Reajustes por IPC: anual o cada vez que se acumula 10% (históricamente cambió periodo por pandemia); mantener historial de “mantenedores S400”.
37. **Orador 1**: Cálculo final: días proporcionales, art. 40, gran inválido, cargas, PGU (desde archivo IPS en tablas temporales), y otros haberes/descuentos.
38. **Orador 1**: Retroactivos imponibles y líquidos; generación de preliquidación, detalle a banco y pagos a terceros (pago extranjero vía Western Union; mayoría vía Banco de Chile).
39. **Orador 1**: Validación: se puede auditar por “caja” y por concepto; hay resumen y trazabilidad 1:1 (logs).
40. **Orador 1**: Archivos de salida son planos con estándar pactado; en banco, por pensionado se envían tres líneas (resumen, haberes, descuentos); envíos a salud/previsión por archivos específicos.
41. **Orador 1**: Con base cerrada y pagada, se alimentan reportes/regulatorios, asegurando consistencia (problema en app anterior era generar/actualizar fuera de ventana).
42. **Sandoval Parra, Marlene Elizabeth**: Pregunta qué hacen si la preliquidación no cuadra.
43. **Orador 1**: Re-ejecutan o investigan diferencias (p.ej. fallecimientos); validan con PDFs de auditoría y justifican cambios.
44. **Orador 1**: Reportería/cierres: capital vigente, GRIS (estándar SUSESO para mutualidades), contabilización PRP a SAP por archivo plano (sin integración directa); documentos externos (PIS, art. 53).
45. **Gabriel Villalobos**: Consulta por SFTP de circular (servidor/credenciales).
46. **Orador 1**: Analistas tienen credenciales; están documentadas y compartidas (no dependen de una sola persona); iSeries no sube, sólo genera el archivo.
47. **Orador 1**: Reportes para SUSESO cuando no hay integración (p.ej. concurrencia): iSeries sugiere modificaciones que el analista realiza manualmente en sistemas externos.
48. **Orador 1**: Artículo 50: si la suma de porcentajes (viuda + orfandades) excede 100%, se prorratea para no superar la pensión base (regla de tres).
49. **Gabriel Villalobos**: Pregunta por plataforma objetivo y relación con SAP.
50. **Orador 1**: MVP busca replicar lo que hace iSeries; automatizar más sería ideal, pero no se planea llevarlo a SAP en primera instancia; plataforma a definir por Javier.
51. **andres guerrero**: Pide acceso a la documentación del mapa.
52. **Orador 1**: Compartirá el Miro tras revisión interna y será contraparte en el tramo iSeries–proveedor.

---

- **Cierre**: “Asencio Moreira, Jorge Luis detuvo la transcripción”.

---

### Breve resumen
- Generé una línea de tiempo cronológica y condensada con 52 intervenciones sustantivas, identificando a cada interlocutor y resumiendo cada aporte en una frase breve.
- Consolidé interjecciones repetitivas para mantener foco en contenido; se conservan secuencia y atribución de hablantes.
