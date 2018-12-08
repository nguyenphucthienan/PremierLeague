import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Club } from 'src/app/core/models/club.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { SquadManager } from 'src/app/core/models/squad-manager';
import { Squad } from 'src/app/core/models/squad.interface';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-club-managers',
  templateUrl: './club-managers.component.html',
  styleUrls: ['./club-managers.component.scss']
})
export class ClubManagersComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;
  @Input() club: Club;

  squads: Squad[];
  squadManagers: SquadManager[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private sortMode: SortMode = {
    sortBy: 'startDate',
    isSortAscending: true
  };

  private filterMode: FilterMode = {
    isActive: true
  };

  constructor(private squadService: SquadService) { }

  ngOnInit() {
    this.squads = this.club.squads;
    this.seasonSelect.writeValue(this.squads[0].id);
    this.filterMode.squadId = this.squads[0].id;
    this.getManagers();
  }

  getManagers() {
    this.squadService.getManagersInSquad(this.pagination,
      this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.squadManagers = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getManagers();
  }

  onSquadFilterChanged(squad: Squad) {
    this.filterMode.squadId = squad ? squad.id : null;
    this.pagination = { pageNumber: 1, pageSize: 8 };
    this.getManagers();
  }

}
