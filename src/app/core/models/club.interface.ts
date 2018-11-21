import { Squad } from './squad.interface';
import { Stadium } from './stadium.interface';

export interface Club {
  id: number;
  code: string;
  name: string;
  establishedYear?: number;
  photoUrl?: string;
  stadium?: Stadium;
  squads?: Squad[];
}
