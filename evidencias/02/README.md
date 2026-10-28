# Bloque 02
 
## Resultado
- Qué añadí al proyecto: Añadí getEvent y la ruta para consultar una actuación usando su código. También dejé configurada la ruta en serverless.yaml.
- Ruta o pantalla comprobada: GET /dev/events/EVT-101, pasando el código de la actuación en la URL.
- Estado y respuesta observados: Respondió 200 OK y recibí una ficha con el id, el artista, el espacio, la hora y el estado.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: El código de la actuación va en la URL. API Gateway se lo pasa a la función y esta lo usa para preparar la respuesta.
- Cambio guiado y resultado: Puse {id} en la ruta y leí ese valor en el handler. Si no llega el id, la función puede responder con un error 400.
- Error encontrado y cómo lo resolví: No tuve un error que parase la prueba. Entendí que el id llega desde la URL y no dentro del body.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: GET /dev/events/EVT-101 respondió 200 OK e incluyó el id EVT-101.
- Limitaciones del ejercicio: Al principio la ficha era de ejemplo y no se consultaba una base de datos. Más adelante el GET se conectó a un catálogo fijo.
