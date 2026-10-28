# Bloque 06
 
## Resultado
- Qué añadí al proyecto: Añadí getEvents para pedir la lista a la API cuando se abre la pantalla y también al pulsar recargar.
- Ruta o pantalla comprobada: GET /events.
- Estado y respuesta observados: Respondió 200 y devolvió EVT-101 y EVT-102.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: Al abrir la app, useEffect inicia la petición. fetch pide los datos y api.ts revisa que la respuesta tenga la forma esperada antes de mostrarla.
- Cambio guiado y resultado: Conecté la pantalla a la petición GET y añadí mensajes para indicar cuando está cargando o si ocurre un error.
- Error encontrado y cómo lo resolví: Como la respuesta viene de fuera, no doy por hecho que tenga el formato correcto. Añadí comprobaciones antes de tratarla como una lista de actuaciones.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: GET /events respondió 200 y devolvió las dos actuaciones del catálogo.
- Limitaciones del ejercicio: La lista es fija. Si la API no está disponible, la app enseña un error; no guarda una copia de los datos.
