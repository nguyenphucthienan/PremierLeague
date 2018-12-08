import { Player } from './player.interface';
import { Squad } from './squad.interface';

export interface SquadPlayer {
  squad: Squad;
  player: Player;
  number: number;
  startDate: Date;
  endDate?: Date;
}
