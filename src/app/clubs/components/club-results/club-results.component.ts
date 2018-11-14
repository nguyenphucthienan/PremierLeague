import { Component, Input, OnInit } from '@angular/core';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-results',
  templateUrl: './club-results.component.html',
  styleUrls: ['./club-results.component.scss']
})
export class ClubResultsComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit() {
  }

}
