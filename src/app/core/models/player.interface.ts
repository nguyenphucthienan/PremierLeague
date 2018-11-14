export interface Player {
  id: number;
  clubId: number;
  clubName?: string;
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
