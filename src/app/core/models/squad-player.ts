import { Player } from './player.interface';

export interface SquadPlayer {
  squadId: number;
  player: Player;
  number: number;
  startDate: Date;
  endDate?: Date;
}
