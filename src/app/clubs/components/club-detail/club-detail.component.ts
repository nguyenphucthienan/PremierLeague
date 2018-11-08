import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent implements OnInit {

  club: Club;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.club = data['club'];
    });
  }

}
