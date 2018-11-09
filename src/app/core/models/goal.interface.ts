export interface Goal {
  id: number;
  matchId: number;
  clubId: number;
  clubCode?: string;
  playerId: number;
  playerName?: string;
  goalTime: number;
  goalType: number;
  isOwnGoal: boolean;
}
