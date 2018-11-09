import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Match } from '../core/models/match.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { MatchService } from '../core/services/match.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  matches: Match[];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'matchTime',
    isSortAscending: true
  };

  constructor(private route: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.matches = data['matches'].items;
      this.pagination = data['matches'].pagination;
    });
  }

}
