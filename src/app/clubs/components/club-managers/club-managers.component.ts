import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Club } from 'src/app/core/models/club.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Manager } from 'src/app/core/models/manager.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { Squad } from 'src/app/core/models/squad.interface';
import { ManagerService } from 'src/app/core/services/manager.service';

@Component({
  selector: 'app-club-managers',
  templateUrl: './club-managers.component.html',
  styleUrls: ['./club-managers.component.scss']
})
export class ClubManagersComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;
  @Input() club: Club;

  squads: Squad[];
  managers: Manager[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  private filterMode: FilterMode = {};

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.squads = this.club.squads;
    this.seasonSelect.writeValue(this.squads[0].id);
    this.filterMode.squadId = this.squads[0].id;
    this.getManagers();
  }

  getManagers() {
    this.managerService.getManagers(this.pagination,
      this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.managers = response.items;
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
