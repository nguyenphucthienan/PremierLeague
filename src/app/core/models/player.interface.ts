import { Club } from './club.interface';

export interface Player {
  id: number;
  name: string;
  positionType: PositionType;
  nationality: string;
  birthdate: Date;
  height?: number;
  weight?: number;
  photoUrl: string;
  club?: Club;
  number?: number;
}

export enum PositionType {
  GoalKeeper,
  Defender,
  Midfielder,
  Forward
}
