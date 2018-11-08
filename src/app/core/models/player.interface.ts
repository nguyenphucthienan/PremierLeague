export interface Player {
  id: number;
  clubId: number;
  clubName?: string;
  name: string;
  number: number;
  position: string;
  nationality: string;
  birthdate: Date;
  height?: number;
  weight?: number;
  photoUrl: string;
}
