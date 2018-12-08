import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Club } from 'src/app/core/models/club.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { SquadPlayer } from 'src/app/core/models/squad-player';
import { Squad } from 'src/app/core/models/squad.interface';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.scss']
})
export class ClubSquadComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;
  @Input() club: Club;

  squads: Squad[];
  squadPlayers: SquadPlayer[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private sortMode: SortMode = {
    sortBy: 'number',
    isSortAscending: true
  };

  private filterMode: FilterMode = {
    isActive: true
  };

  constructor(private squadService: SquadService) { }

  ngOnInit() {
    this.squads = this.club.squads;
    this.seasonSelect.writeValue(this.squads[0].id);
    this.filterMode.squadId = this.squads[0].id;
    this.getPlayers();
  }

  getPlayers() {
    this.squadService.getPlayersInSquad(this.pagination,
      this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.squadPlayers = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getPlayers();
  }

  onSquadFilterChanged(squad: Squad) {
    this.filterMode.squadId = squad ? squad.id : null;
    this.pagination = { pageNumber: 1, pageSize: 8 };
    this.getPlayers();
  }

}
