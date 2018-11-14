import { Component, Input, OnInit } from '@angular/core';
import { Club } from 'src/app/core/models/club.interface';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { StadiumService } from 'src/app/core/services/stadium.service';

@Component({
  selector: 'app-club-stadium',
  templateUrl: './club-stadium.component.html',
  styleUrls: ['./club-stadium.component.scss']
})
export class ClubStadiumComponent implements OnInit {

  @Input() club: Club;

  stadium: Stadium;

  constructor(private stadiumService: StadiumService) { }

  ngOnInit() {
    this.stadiumService.getStadium(this.club.stadium.id)
      .subscribe((stadium: Stadium) => this.stadium = stadium);
  }

}
