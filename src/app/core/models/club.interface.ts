import { Squad } from './squad.interface';

export interface Club {
  id: number;
  code: string;
  name: string;
  establishedYear: number;
  homeField: number;
  photoUrl: string;
  squads?: Squad[];
}
