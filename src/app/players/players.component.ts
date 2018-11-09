import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { Player } from '../core/models/player.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { PlayerService } from '../core/services/player.service';
import { FilterOption } from '../shared/components/filter-bar/models/filter-option.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  pagination: Pagination;
  filterOptions: FilterOption[] = [];

  sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  filterMode: FilterMode;

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.players = data['players'].items;
      this.pagination = data['players'].pagination;

      const clubOption: FilterOption = {
        name: 'clubId',
        text: 'Club',
        placeholder: 'Select club',
        values: data['clubs'].map(club => ({
          text: club.name,
          value: club.id
        }))
      };

      const positionOption: FilterOption = {
        name: 'position',
        text: 'Position',
        placeholder: 'Select position',
        values: [
          { text: 'Goalkeeper', value: 'goalkeeper' },
          { text: 'Defender', value: 'defender' },
          { text: 'Midfielder', value: 'midfielder' },
          { text: 'Forward', value: 'forward' },
        ]
      };

      this.filterOptions = [clubOption, positionOption];
    });
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

  onFiltered(filterMode: FilterMode) {
    this.filterMode = filterMode;
    this.getPlayers();
  }

}
