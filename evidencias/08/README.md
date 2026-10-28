# Bloque 08
 
## Resultado
- Qué añadí al proyecto: Configuré Serverless con mi código de alumno, la región us-east-1, el entorno dev y el rol LabRole.
- Ruta o pantalla comprobada: Desplegué desde backend con npx serverless deploy --stage dev --region us-east-1 --aws-profile academy.
- Estado y respuesta observados: El despliegue terminó bien. GET /hello respondió 200 con el mensaje Festival Control API online y GET /events respondió 200 con dos actuaciones.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: Serverless lee la configuración y publica las funciones en AWS. API Gateway crea las rutas y manda cada petición a su Lambda.
- Cambio guiado y resultado: Añadí la región, el stage, mi código en el nombre del servicio y el ARN del rol. Después desplegué el proyecto.
- Error encontrado y cómo lo resolví: Primero usé serverless info y me dijo que el servicio no estaba desplegado. Usé serverless deploy y después ya pude consultar la API.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: Se desplegó festival-control-api-jesustaules-dev y GET /hello respondió 200 OK.
- Limitaciones del ejercicio: Los eventos están en un catálogo fijo y las escrituras son simuladas; no se usa una base de datos. No incluyo claves ni tokens en las evidencias.
