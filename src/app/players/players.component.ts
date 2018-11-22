import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { Club } from '../core/models/club.interface';
import { Season } from '../core/models/season.interface';
import { ClubService } from '../core/services/club.service';
import { DatatableComponent } from '../datatable/datatable.component';
import { TableActionType } from '../datatable/models/table-action.interface';
import { TableCellChange } from '../datatable/models/table-cell-change.interface';
import { PlayersTableService } from './services/players-table.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  providers: [PlayersTableService]
})
export class PlayersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('seasonSelect') seasonSelect: NgSelectComponent;
  @ViewChild('clubSelect') clubSelect: NgSelectComponent;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  currentSeason: Season;
  seasons: Season[];
  clubs: Club[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public playersTableService: PlayersTableService,
    private clubService: ClubService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
      this.currentSeason = this.seasons[0];
      this.seasonSelect.writeValue(this.seasons[0].id);
      this.playersTableService.filterMode.seasonId = this.seasons[0].id;
    });

    this.getClubs();
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchPlayer(value))
      )
      .subscribe();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToPlayerDetail(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchPlayer(value: string) {
    this.playersTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  navigateToPlayerDetail(playerId: number) {
    this.router.navigate(['/players', playerId]);
  }

  private getClubs() {
    this.clubService.getBriefListClubBySeasonId(this.currentSeason.id)
      .subscribe((clubs: Club[]) => this.clubs = clubs);
  }

  onSeasonFilterChanged(season: Season) {
    this.playersTableService.filterMode.seasonId = season ? season.id : null;
    this.playersTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.getClubs();
    this.datatable.refresh();
  }

  onClubFilterChanged(club: Club) {
    this.playersTableService.filterMode.clubId = club ? club.id : null;
    this.playersTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
