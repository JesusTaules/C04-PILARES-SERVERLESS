# Venue Control

Es una app para consultar y gestionar las zonas de un festival. Tiene un backend con Serverless y una app hecha con React Native.

El backend está en backend y la app en mobile. La API permite listar, consultar, crear, editar, cambiar el estado y eliminar zonas.

## Probar en local

Desde backend:

bash
npm run build
npm start


Después, desde otra terminal, ve a mobile y ejecuta:

bash
npm run web


La app usa la API local en http://localhost:3000/dev.

## Desplegar

Desde backend, con el perfil AWS del laboratorio configurado:

bash
npx serverless deploy --stage dev --region us-east-1 --aws-profile academy


La app está configurada para usar la API desplegada en AWS.

## Decisión

Las zonas vienen de una lista fija. Las operaciones de crear, editar y borrar devuelven una respuesta, pero no guardan cambios.
