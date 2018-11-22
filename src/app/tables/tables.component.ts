import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

import { Season } from '../core/models/season.interface';
import { DatatableComponent } from '../datatable/datatable.component';
import { TableActionType } from '../datatable/models/table-action.interface';
import { TableCellChange } from '../datatable/models/table-cell-change.interface';
import { TablesTableService } from './services/tables-table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [TablesTableService]
})
export class TablesComponent implements OnInit {

  @ViewChild('seasonSelect') seasonSelect: NgSelectComponent;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  currentSeason: Season;
  seasons: Season[];
  rounds: any[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public tablesTableService: TablesTableService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
      this.currentSeason = this.seasons[0];
      this.seasonSelect.writeValue(this.seasons[0].id);
      this.tablesTableService.filterMode.seasonId = this.seasons[0].id;
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToClubDetail(tableCellChange.row.cells['club'].value.id);
        break;
    }
  }

  navigateToClubDetail(clubId: number) {
    this.router.navigate(['/clubs', clubId]);
  }

  onSeasonFilterChanged(season: Season) {
    this.currentSeason = season;
    this.tablesTableService.filterMode.seasonId = season ? season.id : null;
    this.datatable.refresh();
  }

}
