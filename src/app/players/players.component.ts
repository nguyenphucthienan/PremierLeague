import { Component, OnInit } from '@angular/core';
import { Player } from '../core/models/player.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.players = data['players'].items;
      this.pagination = data['players'].pagination;
    });
  }

  getPlayers() {
    this.playerService.getPlayers(this.pagination, this.sortMode)
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
