import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, isZoneInput, json, readBody } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta el id de la zona' });
  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Zona no encontrada' });
  const input = readBody(event.body);
  if (!isZoneInput(input)) {
    return json(400, { message: 'PUT requiere name, capacity positiva y status OPEN, FULL o CLOSED' });
  }
  return json(200, {
    id,
    name: input.name.trim(),
    capacity: input.capacity,
    status: input.status,
    operation: 'REPLACED'
  });
};
