import { Kit } from './kit.interface';

export class Squad {
  id: number;
  seasonId: number;
  seasonName: string;
  clubId: number;
  clubName: string;
  kits?: Kit[];
}
