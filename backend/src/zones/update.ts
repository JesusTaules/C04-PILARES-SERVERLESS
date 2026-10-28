import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, isZoneStatus, json, readBody } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta el id de la zona' });
  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Zona no encontrada' });
  const input = readBody(event.body);
  if (!input || Object.keys(input).length !== 1 || !isZoneStatus(input.status)) {
    return json(400, { message: 'PATCH solo admite status OPEN, FULL o CLOSED' });
  }
  return json(200, { id, changes: { status: input.status }, operation: 'UPDATED' });
};
