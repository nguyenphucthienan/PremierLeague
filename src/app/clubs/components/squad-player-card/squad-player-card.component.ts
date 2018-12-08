import { Component, Input, OnInit } from '@angular/core';
import { SquadPlayer } from 'src/app/core/models/squad-player';

@Component({
  selector: 'app-squad-player-card',
  templateUrl: './squad-player-card.component.html',
  styleUrls: ['./squad-player-card.component.scss']
})
export class SquadPlayerCardComponent implements OnInit {

  @Input() squadPlayer: SquadPlayer;

  constructor() { }

  ngOnInit() {
  }

}
