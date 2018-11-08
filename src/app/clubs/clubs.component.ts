import { Component, OnInit } from '@angular/core';

import { Club } from '../core/models/club.interface';
import { Pagination } from '../core/models/pagination.interface';
import { ClubService } from '../core/services/club.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  clubs: Club[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute,
    private clubService: ClubService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.clubs = data['clubs'].items;
      this.pagination = data['clubs'].pagination;
    });
  }

  getClubs() {
    this.clubService.getClubs(this.pagination)
      .subscribe((response: any) => {
        this.clubs = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getClubs();
  }

}
