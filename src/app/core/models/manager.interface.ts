import { Club } from './club.interface';

export interface Manager {
  id: number;
  name: string;
  nationality: string;
  birthdate: Date;
  description: string;
  photoUrl: string;
  club?: Club;
}
