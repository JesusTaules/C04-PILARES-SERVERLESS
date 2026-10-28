# Bloque 03
 
## Resultado
- Qué añadí al proyecto: Preparé un POST para recibir los datos de una actuación en JSON y comprobar que estén bien.
- Ruta o pantalla comprobada: POST /dev/events.
- Estado y respuesta observados: Con los datos correctos respondió 201 y devolvió el id EVT-NEW. Si el JSON o los campos no son válidos, el handler responde 400.
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: La app manda los datos en el body. La función recibe el texto, lo convierte a JSON y revisa que tenga artista, espacio, hora y estado correctos.
- Cambio guiado y resultado: Añadí la lectura del body y las comprobaciones de los campos. Con el ejemplo válido recibí una respuesta 201.
- Error encontrado y cómo lo resolví: Aprendí que no basta con poner tipos en TypeScript, porque los datos que manda el usuario también se tienen que revisar cuando llegan.
 
## Evidencias
- Captura o transcripción breve, sin credenciales: Envié Nova Pulse, Main Stage, 21:00 y CONFIRMED. Respondió 201 con esos datos y el id EVT-NEW.
- Limitaciones del ejercicio: El id es siempre EVT-NEW y la actuación no se guarda. Si vuelvo a pedir la lista, siguen saliendo los eventos que ya estaban.
