import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

import { Club } from '../core/models/club.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { Season } from '../core/models/season.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { ClubService } from '../core/services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;

  seasons: Season[];
  clubs: Club[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private sortMode: SortMode = {
    sortBy: 'name', isSortAscending: true
  };

  private filterMode: FilterMode = {};


  constructor(private route: ActivatedRoute,
    private clubService: ClubService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
    });

    this.seasonSelect.writeValue(this.seasons[0].id);
    this.filterMode.seasonId = this.seasons[0].id;
    this.getClubs();
  }

  getClubs() {
    this.clubService.getClubs(this.pagination,
      this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.clubs = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getClubs();
  }

  onSeasonFilterChanged(season: Season) {
    this.filterMode.seasonId = season ? season.id : null;
    this.getClubs();
  }

}
