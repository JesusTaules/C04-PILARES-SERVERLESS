# Bloque 09
 
## Resultado
- Qué añadí al proyecto: Cambié en api.ts la dirección local por la URL real de API Gateway en us-east-1.
- Ruta o pantalla comprobada: Probé GET /events en la URL del servicio desplegado en AWS.
- Estado y respuesta observados: GET respondió 200 con EVT-101 y EVT-102. También probé POST, PUT, PATCH y DELETE; respondieron 201, 200, 200 y 200.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: La pantalla llama a api.ts, que manda la petición por HTTPS a API Gateway. AWS la pasa a la Lambda y la respuesta vuelve a la app.
- Cambio guiado y resultado: Cambié la dirección local por la URL de AWS. Las rutas y los métodos siguieron igual, así que no tuve que cambiar cómo se hacen las peticiones.
- Error encontrado y cómo lo resolví: Antes de desplegar, serverless info decía que el servicio todavía no existía. Desplegué el servicio y luego pude probar la URL real.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: GET https://zgy9x32vk7.execute-api.us-east-1.amazonaws.com/dev/events respondió 200 OK.
- Limitaciones del ejercicio: Las escrituras siguen siendo de prueba y la lista viene de un catálogo fijo. No he comprobado los logs de CloudWatch ni guardado una captura de la app funcionando en el navegador.
