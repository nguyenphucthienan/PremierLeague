import { Component, Input, OnInit } from '@angular/core';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-stadium',
  templateUrl: './club-stadium.component.html',
  styleUrls: ['./club-stadium.component.scss']
})
export class ClubStadiumComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit() {
  }

}
