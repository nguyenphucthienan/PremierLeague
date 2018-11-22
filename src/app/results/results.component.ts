import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

import { Season } from '../core/models/season.interface';
import { MatchService } from '../core/services/match.service';
import { DatatableComponent } from '../datatable/datatable.component';
import { TableActionType } from '../datatable/models/table-action.interface';
import { TableCellChange } from '../datatable/models/table-cell-change.interface';
import { ResultsTableService } from './services/results-table.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ResultsTableService]
})
export class ResultsComponent implements OnInit {

  @ViewChild('seasonSelect') seasonSelect: NgSelectComponent;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  currentSeason: Season;
  seasons: Season[];
  rounds: any[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public resultsTableService: ResultsTableService,
    private matchService: MatchService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
      this.currentSeason = this.seasons[0];
      this.seasonSelect.writeValue(this.seasons[0].id);
      this.resultsTableService.filterMode.seasonId = this.seasons[0].id;
    });

    this.getListRound();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToMatchDetail(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  navigateToMatchDetail(matchId: number) {
    this.router.navigate(['/matches', matchId]);
  }

  private getListRound() {
    this.matchService.getListRounds(this.currentSeason.id)
      .subscribe((rounds: any[]) => {
        this.rounds = rounds;
      });
  }

  onSeasonFilterChanged(season: Season) {
    this.currentSeason = season;
    this.resultsTableService.filterMode.seasonId = season ? season.id : null;
    this.resultsTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.getListRound();
    this.datatable.refresh();
  }

  onRoundFilterChanged(round: any) {
    this.resultsTableService.filterMode.round = round ? round.id : null;
    this.resultsTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.datatable.refresh();
  }

}
