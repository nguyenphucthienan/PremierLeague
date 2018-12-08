import { Component, Input, OnInit } from '@angular/core';
import { SquadManager } from 'src/app/core/models/squad-manager';

@Component({
  selector: 'app-squad-manager-card',
  templateUrl: './squad-manager-card.component.html',
  styleUrls: ['./squad-manager-card.component.scss']
})
export class SquadManagerCardComponent implements OnInit {

  @Input() squadManager: SquadManager;

  constructor() { }

  ngOnInit() {
  }

}
