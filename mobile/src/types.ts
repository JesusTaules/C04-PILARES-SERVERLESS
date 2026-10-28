export type EventStatus = 'CONFIRMED' | 'CANCELLED';
export interface FestivalEvent {
  id: string;
  artist: string;
  space: string;
  time: string;
  status: EventStatus;
}
export type EventInput = Omit<FestivalEvent, 'id'>;

export type ZoneStatus = 'OPEN' | 'FULL' | 'CLOSED';
export interface Zone {
  id: string;
  name: string;
  capacity: number;
  status: ZoneStatus;
}
export type ZoneInput = Omit<Zone, 'id'>;
 