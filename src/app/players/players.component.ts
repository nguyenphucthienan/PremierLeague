import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Club } from '../core/models/club.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { Player } from '../core/models/player.interface';
import { Season } from '../core/models/season.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  seasons: Season[];
  clubs: Club[];
  players: Player[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 15
  };

  private sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  private filterMode: FilterMode = {};

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
      this.clubs = data['clubs'];

      this.getPlayers();
    });
  }

  getPlayers() {
    if (!this.filterMode.seasonId && this.filterMode.clubId) {
      return;
    }

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

  onFiltered(filterMode: FilterMode) {
    this.filterMode = filterMode;
    this.getPlayers();
  }

  onSeasonFilterChanged(season: Season) {
    this.filterMode.seasonId = season ? season.id : null;
    this.getPlayers();
  }

  onClubFilterChanged(club: Club) {
    this.filterMode.clubId = club ? club.id : null;
    this.getPlayers();
  }

}
