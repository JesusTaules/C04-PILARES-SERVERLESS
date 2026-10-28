# Bloque 07
 
## Resultado
- Qué añadí al proyecto: Añadí botones para probar crear, reemplazar, actualizar y borrar actuaciones desde la app.
- Ruta o pantalla comprobada: Las acciones de mobile/app.tsx llaman a las funciones de mobile/src/api.ts para POST, PUT, PATCH y DELETE.
- Estado y respuesta observados: Probé las peticiones contra la API. POST respondió 201 y PUT, PATCH y DELETE respondieron 200.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: Al pulsar un botón, la app prepara la petición y la manda a la API. Luego muestra la respuesta o el error.
- Cambio guiado y resultado: Añadí las cuatro acciones. PUT manda los datos completos del evento y PATCH solo manda el estado que quiero cambiar.
- Error encontrado y cómo lo resolví: Al volver a cargar la lista vi que seguían apareciendo los mismos eventos. Entendí que las escrituras son simuladas y no guardan cambios.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: POST respondió 201; PUT, PATCH y DELETE respondieron 200. Después, GET siguió devolviendo los dos eventos originales.
- Limitaciones del ejercicio: Los cambios no se guardan de verdad; las respuestas sirven para practicar las operaciones de la API.
