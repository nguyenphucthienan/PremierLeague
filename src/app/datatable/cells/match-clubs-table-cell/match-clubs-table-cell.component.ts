import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-match-clubs-table-cell',
  templateUrl: './match-clubs-table-cell.component.html',
  styleUrls: ['./match-clubs-table-cell.component.scss']
})
export class MatchClubsTableCellComponent extends AbstractTableCellComponent {

  isPlayed: boolean;
  homeClub: Club;
  awayClub: Club;
  homeScore: number;
  awayScore: number;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell) {
      this.isPlayed = this.cell.value['isPlayed'];
      this.homeClub = this.cell.value['homeClub'];
      this.awayClub = this.cell.value['awayClub'];
      this.homeScore = this.cell.value['homeScore'];
      this.awayScore = this.cell.value['awayScore'];
    }
  }

}
