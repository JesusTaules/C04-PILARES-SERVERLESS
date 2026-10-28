import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { isZoneInput, json, readBody } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const input = readBody(event.body);
  if (!isZoneInput(input)) {
    return json(400, { message: 'Se requieren name, capacity positiva y status OPEN, FULL o CLOSED' });
  }
  return json(201, {
    id: 'ZONE-NEW',
    name: input.name.trim(),
    capacity: input.capacity,
    status: input.status
  });
};
