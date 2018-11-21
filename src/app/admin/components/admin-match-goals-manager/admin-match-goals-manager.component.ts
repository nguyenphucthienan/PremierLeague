import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { GoalService } from 'src/app/core/services/goal.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminMatchGoalsManagerTableService } from '../../services/admin-match-goals-manager-table.service';

@Component({
  selector: 'app-admin-match-goals-manager',
  templateUrl: './admin-match-goals-manager.component.html',
  styleUrls: ['./admin-match-goals-manager.component.scss'],
  providers: [AdminMatchGoalsManagerTableService]
})
export class AdminMatchGoalsManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  matchId: number;
  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    public adminMatchGoalsManagerTableService: AdminMatchGoalsManagerTableService,
    private goalService: GoalService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = parseInt(params.get('matchId'), 10);
      this.adminMatchGoalsManagerTableService.filterMode.matchId = this.matchId;
    });
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchKit(value))
      )
      .subscribe();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openDeleteModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchKit(value: string) {
    this.adminMatchGoalsManagerTableService.filterMode['id'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminSquadKitsAddModalComponent, {
    //   initialState: {
    //     title: 'Add Kit',
    //     matchId: this.matchId
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.kitAdded
    //   .subscribe(() => this.onKitAdded());
  }

  onGoalAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    // this.bsModalRef = this.modalService.show(AdminSquadKitsEditModalComponent, {
    //   initialState: {
    //     title: 'Edit Kit',
    //     rowData
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.kitEdited
    //   .subscribe(() => this.onKitEdited());
  }

  onGoalEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to remove this goal from this match?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteGoal(id));
  }

  confirmDeleteGoal(id: number) {
    this.goalService.deleteGoal(this.matchId, id)
      .subscribe(
        () => {
          this.alertService.success('Delete goal successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete goal failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
