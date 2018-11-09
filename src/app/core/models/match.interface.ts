import { Club } from './club.interface';
import { Goal } from './goal.interface';

export interface Match {
  id: number;
  round: number;
  homeClub: Club;
  awayClub: Club;
  homeScore: number;
  awayScore: number;
  matchTime: Date;
  isPlayed: boolean;
  goals?: Goal[];
}
