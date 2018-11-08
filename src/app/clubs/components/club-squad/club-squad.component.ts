import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Player } from 'src/app/core/models/player.interface';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.scss']
})
export class ClubSquadComponent implements OnInit {

  players: Player[];
  pagination: Pagination;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.pagination = {
      pageNumber: 1,
      pageSize: 8,
      totalItems: 29
    };

    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers(this.pagination, undefined, 1)
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
