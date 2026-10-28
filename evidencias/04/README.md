# Bloque 04
 
## Resultado
- Qué añadí al proyecto: Organicé las funciones para listar y consultar actuaciones, y para probar crear, reemplazar, actualizar y borrar.
- Ruta o pantalla comprobada: Probé GET /events, GET /events/EVT-101, POST /events, PUT y PATCH sobre EVT-101, y DELETE sobre EVT-102.
- Estado y respuesta observados: GET respondió 200, POST respondió 201 y PUT, PATCH y DELETE respondieron 200.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: Según el método y la ruta, la petición llega a una función distinta. Esa función comprueba los datos y devuelve una respuesta.
- Cambio guiado y resultado: Separé las rutas en distintas funciones y dejé el catálogo y las respuestas comunes en model.ts. PUT manda todos los datos y PATCH solo cambia el estado.
- Error encontrado y cómo lo resolví: No tuve ningún error que parara las pruebas. Después de probar las operaciones, volví a pedir la lista y vi que seguían los dos eventos originales.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: GET /events devolvió EVT-101 y EVT-102. POST respondió 201; PUT, PATCH y DELETE respondieron 200.
- Limitaciones del ejercicio: Las operaciones de escritura son de prueba. Responden como si hubieran funcionado, pero no guardan cambios ni modifican el catálogo.
