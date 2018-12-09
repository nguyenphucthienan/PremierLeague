import { Squad } from './squad.interface';

export interface Season {
  id: number;
  name: string;
  squads: Squad[];
}
