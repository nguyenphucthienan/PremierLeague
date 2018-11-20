import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Season } from 'src/app/core/models/season.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { MatchService } from 'src/app/core/services/match.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { AdminMatchEditModalComponent } from '../../modals/admin-match-edit-modal/admin-match-edit-modal.component';
import { AdminMatchManagerTableService } from '../../services/admin-match-manager-table.service';

@Component({
  selector: 'app-admin-match-manager',
  templateUrl: './admin-match-manager.component.html',
  styleUrls: ['./admin-match-manager.component.scss'],
  providers: [AdminMatchManagerTableService]
})
export class AdminMatchManagerComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  seasons: Season[];

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public adminMatchManagerTableService: AdminMatchManagerTableService,
    private matchService: MatchService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.seasons = data['seasons'];
      this.seasonSelect.writeValue(this.seasons[0].id);
      this.adminMatchManagerTableService.filterMode.seasonId = this.seasons[0].id;
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.NavigateToMatchGoals:
        this.navigateToMatchGoals(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.NavigateToMatchCards:
        this.navigateToMatchCards(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
    }
  }

  navigateToMatchGoals(matchId: number) {
    this.router.navigate(['/admin', 'matches', matchId, 'goals']);
  }

  navigateToMatchCards(matchId: number) {
    this.router.navigate(['/admin', 'matches', matchId, 'cards']);
  }

  onSeasonFilterChanged(season: Season) {
    this.adminMatchManagerTableService.filterMode.seasonId = season ? season.id : null;
    this.adminMatchManagerTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.datatable.refresh();
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminSquadAddModalComponent, {
    //   initialState: {
    //     title: 'Add New Squad'
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.squadAdded
    //   .subscribe(() => this.onSquadAdded());
  }

  onSquadAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminMatchEditModalComponent, {
      initialState: {
        title: 'Edit Match',
        rowData
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.matchEdited
      .subscribe(() => this.onMatchEdited());
  }

  onMatchEdited() {
    this.datatable.refresh();
  }

}
