import { Club } from './club.interface';

export interface Player {
  id: number;
  club: Club;
  name: string;
  number: number;
  positionType: PositionType;
  nationality: string;
  birthdate: Date;
  height?: number;
  weight?: number;
  photoUrl: string;
}

export enum PositionType {
  GoalKeeper,
  Defender,
  Midfielder,
  Forward
}
