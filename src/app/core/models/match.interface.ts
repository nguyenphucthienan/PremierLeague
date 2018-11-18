import { Club } from './club.interface';
import { Goal } from './goal.interface';
import { Stadium } from './stadium.interface';

export interface Match {
  id: number;
  round: number;
  homeClub: Club;
  awayClub: Club;
  homeScore: number;
  awayScore: number;
  stadium: Stadium;
  matchTime: Date;
  isPlayed: boolean;
  goals?: Goal[];
}
