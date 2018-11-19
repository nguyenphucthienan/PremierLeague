import { Club } from './club.interface';
import { Kit } from './kit.interface';
import { Season } from './season.interface';

export class Squad {
  id: number;
  season: Season;
  seasonId?: number;
  seasonName?: string;
  club: Club;
  clubId?: number;
  clubName?: string;
  kits?: Kit[];
}
