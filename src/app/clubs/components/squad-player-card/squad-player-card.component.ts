import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/player.interface';

@Component({
  selector: 'app-squad-player-card',
  templateUrl: './squad-player-card.component.html',
  styleUrls: ['./squad-player-card.component.scss']
})
export class SquadPlayerCardComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
