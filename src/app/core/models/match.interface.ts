import { Club } from './club.interface';

export interface Match {
  id: number;
  round: number;
  homeClub: Club;
  awayClub: Club;
  homeScore: number;
  awayScore: number;
  matchTime: Date;
  isPlayed: boolean;
}
