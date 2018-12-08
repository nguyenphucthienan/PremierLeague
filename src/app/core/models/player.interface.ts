import { Club } from './club.interface';
import { SquadPlayer } from './squad-player';

export interface Player {
  id: number;
  name: string;
  positionType: PositionType;
  nationality: string;
  birthdate: Date;
  height?: number;
  weight?: number;
  photoUrl: string;
  squadPlayers?: SquadPlayer[];
  club?: Club;
  number?: number;
}

export enum PositionType {
  GoalKeeper,
  Defender,
  Midfielder,
  Forward
}
