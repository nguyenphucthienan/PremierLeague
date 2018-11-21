import { Club } from './club.interface';
import { Player } from './player.interface';

export interface Goal {
  id: number;
  matchId: number;
  club: Club;
  player: Player;
  goalTime: number;
  goalType: number;
  isOwnGoal: boolean;
}
