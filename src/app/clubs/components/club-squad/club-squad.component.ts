import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/core/models/club.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Player } from 'src/app/core/models/player.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.scss']
})
export class ClubSquadComponent implements OnInit {

  @Input() club: Club;

  players: Player[];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'number',
    isSortAscending: true
  };

  filterMode: FilterMode;

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.players = data['players'].items;
      this.pagination = data['players'].pagination;
    });

    this.filterMode = {
      clubId: this.club.id
    };
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

}
