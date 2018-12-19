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
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminMatchAddModalComponent } from '../../modals/admin-match-add-modal/admin-match-add-modal.component';
import { AdminMatchEditModalComponent } from '../../modals/admin-match-edit-modal/admin-match-edit-modal.component';
import {
  AdminMatchGenerateModalComponent,
} from '../../modals/admin-match-generate-modal/admin-match-generate-modal.component';
import { AdminMatchManagerTableService } from '../../services/admin-match-manager-table.service';

@Component({
  selector: 'app-admin-match-manager',
  templateUrl: './admin-match-manager.component.html',
  styleUrls: ['./admin-match-manager.component.scss'],
  providers: [AdminMatchManagerTableService]
})
export class AdminMatchManagerComponent implements OnInit {

  @ViewChild('seasonSelect') seasonSelect: NgSelectComponent;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  currentSeason: Season;
  seasons: Season[];
  rounds: any[];

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
      this.currentSeason = this.seasons[0];
      this.seasonSelect.writeValue(this.seasons[0].id);
      this.adminMatchManagerTableService.filterMode.seasonId = this.seasons[0].id;
    });

    this.getListRound();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToMatchDetail(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.NavigateToMatchGoals:
        this.navigateToMatchGoals(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.NavigateToMatchCards:
        this.navigateToMatchCards(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openDeleteModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  navigateToMatchDetail(matchId: number) {
    this.router.navigate(['/matches', matchId]);
  }

  navigateToMatchGoals(matchId: number) {
    this.router.navigate(['/admin', 'matches', matchId, 'goals']);
  }

  navigateToMatchCards(matchId: number) {
    this.router.navigate(['/admin', 'matches', matchId, 'cards']);
  }

  private getListRound() {
    this.matchService.getListRounds(this.currentSeason.id)
      .subscribe((rounds: any[]) => {
        this.rounds = rounds;
      });
  }

  onSeasonFilterChanged(season: Season) {
    this.currentSeason = season;
    this.adminMatchManagerTableService.filterMode.seasonId = season ? season.id : null;
    this.adminMatchManagerTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.getListRound();
    this.datatable.refresh();
  }

  onRoundFilterChanged(round: any) {
    this.adminMatchManagerTableService.filterMode.round = round ? round.id : null;
    this.adminMatchManagerTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.datatable.refresh();
  }

  openGenerateMatchesModal() {
    this.bsModalRef = this.modalService.show(AdminMatchGenerateModalComponent, {
      initialState: {
        season: this.currentSeason
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.onMatchesGenerated());
  }

  onMatchesGenerated() {
    this.adminMatchManagerTableService.filterMode.round = null;
    this.adminMatchManagerTableService.pagination = { pageNumber: 1, pageSize: 10 };
    this.datatable.refresh();
  }

  openDeleteMatchesModal() {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete all matches in this season?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteMatches());
  }

  confirmDeleteMatches() {
    this.matchService.deleteMatches(this.currentSeason.id)
      .subscribe(
        () => {
          this.alertService.success('Delete matches successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete matches failed')
      );
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminMatchAddModalComponent, {
      initialState: {
        title: 'Add New Match',
        season: this.currentSeason
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.matchAdded
      .subscribe(() => this.onMatchAdded());
  }

  onMatchAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminMatchEditModalComponent, {
      initialState: {
        title: 'Edit Match',
        season: this.currentSeason,
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

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this match?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteMatch(id));
  }

  confirmDeleteMatch(id: number) {
    this.matchService.deleteMatch(id)
      .subscribe(
        () => {
          this.alertService.success('Delete match successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete match failed')
      );
  }

}
