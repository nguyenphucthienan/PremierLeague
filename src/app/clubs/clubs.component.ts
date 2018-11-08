import { Component, OnInit } from '@angular/core';

import { Club } from '../core/models/club.interface';
import { Pagination } from '../core/models/pagination.interface';
import { ClubService } from '../core/services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  clubs: Club[];
  pagination: Pagination;

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.pagination = {
      pageNumber: 1,
      pageSize: 8,
      totalItems: 20
    };

    this.getClubs();
  }

  getClubs() {
    this.clubService.getClubs(this.pagination.pageNumber,
      this.pagination.pageSize)
      .subscribe((response: any) => {
        this.clubs = response.items;
        this.pagination = response.pagination;
      });
  }

}
