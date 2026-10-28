import type { FestivalEvent, EventInput, EventStatus, Zone, ZoneInput, ZoneStatus } from './types';
 
export const API_URL = 'https://zgy9x32vk7.execute-api.us-east-1.amazonaws.com/dev';
 
async function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {
  const response = await fetch(API_URL + path, {
    method,
    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
  });
  const value: unknown = await response.json();
  if (!response.ok) {
    const message = typeof value === 'object' && value !== null && 'message' in value
      ? String(value.message) : response.statusText;
    throw new Error('HTTP ' + response.status + ': ' + message);
  }
  return value;
}
 
function isFestivalEvent(value: unknown): value is FestivalEvent {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'artist' in value && typeof value.artist === 'string' &&
    'space' in value && typeof value.space === 'string' &&
    'time' in value && typeof value.time === 'string' &&
    'status' in value && (value.status === 'CONFIRMED' || value.status === 'CANCELLED');
}
 
export async function getEvents(): Promise<FestivalEvent[]> {
  const value = await request('/events');
  if (!Array.isArray(value) || !value.every(isFestivalEvent)) throw new Error('La API no devolvió una lista de actuaciones válida');
  return value;
}
 
export const createEvent = (input: EventInput) => request('/events', 'POST', input);
export const replaceEvent = (id: string, input: EventInput) => request('/events/' + encodeURIComponent(id), 'PUT', input);
export const updateEvent = (id: string, status: EventStatus) => request('/events/' + encodeURIComponent(id), 'PATCH', { status });
export const deleteEvent = (id: string) => request('/events/' + encodeURIComponent(id), 'DELETE');

function isZone(value: unknown): value is Zone {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'name' in value && typeof value.name === 'string' && value.name.trim().length > 0 &&
    'capacity' in value && typeof value.capacity === 'number' && Number.isInteger(value.capacity) && value.capacity > 0 &&
    'status' in value && (value.status === 'OPEN' || value.status === 'FULL' || value.status === 'CLOSED');
}

export async function getZones(): Promise<Zone[]> {
  const value = await request('/zones');
  if (!Array.isArray(value) || !value.every(isZone)) throw new Error('La API no devolvió una lista de zonas válida');
  return value;
}

export async function getZone(id: string): Promise<Zone> {
  const value = await request('/zones/' + encodeURIComponent(id));
  if (!isZone(value)) throw new Error('La API no devolvió una zona válida');
  return value;
}

export const createZone = (input: ZoneInput) => request('/zones', 'POST', input);
export const replaceZone = (id: string, input: ZoneInput) => request('/zones/' + encodeURIComponent(id), 'PUT', input);
export const updateZone = (id: string, status: ZoneStatus) => request('/zones/' + encodeURIComponent(id), 'PATCH', { status });
export const deleteZone = (id: string) => request('/zones/' + encodeURIComponent(id), 'DELETE');
 