import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Club } from 'src/app/core/models/club.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Player } from 'src/app/core/models/player.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { Squad } from 'src/app/core/models/squad.interface';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.scss']
})
export class ClubSquadComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;
  @Input() club: Club;

  squads: Squad[];
  players: Player[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private sortMode: SortMode = {
    sortBy: 'position',
    isSortAscending: true
  };

  private filterMode: FilterMode = {};

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.squads = this.club.squads;
    this.seasonSelect.writeValue(this.squads[0].id);
    this.filterMode.squadId = this.squads[0].id;
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers(this.pagination,
      this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.players = response.items;
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
