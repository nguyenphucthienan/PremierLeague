import { Component, Input, OnInit } from '@angular/core';
import { Manager } from 'src/app/core/models/manager.interface';

@Component({
  selector: 'app-squad-manager-card',
  templateUrl: './squad-manager-card.component.html',
  styleUrls: ['./squad-manager-card.component.scss']
})
export class SquadManagerCardComponent implements OnInit {

  @Input() manager: Manager;

  constructor() { }

  ngOnInit() {
  }

}
