import { Club } from './club.interface';
import { Player } from './player.interface';

export interface Card {
  id: number;
  matchId: number;
  club: Club;
  player: Player;
  cardTime: number;
  cardType: CardType;
}

export enum CardType {
  Yellow,
  Red
}
