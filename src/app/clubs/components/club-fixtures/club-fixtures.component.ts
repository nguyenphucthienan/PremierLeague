import { Component, Input, OnInit } from '@angular/core';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-fixtures',
  templateUrl: './club-fixtures.component.html',
  styleUrls: ['./club-fixtures.component.scss']
})
export class ClubFixturesComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit() {
  }

}
