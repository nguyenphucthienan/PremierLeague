import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss']
})
export class ClubCardComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit() {
  }

}
