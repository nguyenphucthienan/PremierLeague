import { Component, Input, OnInit } from '@angular/core';
import { Kit } from 'src/app/core/models/kit.interface';

@Component({
  selector: 'app-club-kit-card',
  templateUrl: './club-kit-card.component.html',
  styleUrls: ['./club-kit-card.component.scss']
})
export class ClubKitCardComponent implements OnInit {

  @Input() kit: Kit;

  constructor() { }

  ngOnInit() {
  }

}
