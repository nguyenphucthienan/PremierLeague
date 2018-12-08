import { Manager } from './manager.interface';
import { Squad } from './squad.interface';

export interface SquadManager {
  squad: Squad;
  manager: Manager;
  startDate: Date;
  endDate?: Date;
}
