import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { CardService } from 'src/app/core/services/card.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminMatchCardsManagerTableService } from '../../services/admin-match-cards-manager-table.service';

@Component({
  selector: 'app-admin-match-cards-manager',
  templateUrl: './admin-match-cards-manager.component.html',
  styleUrls: ['./admin-match-cards-manager.component.scss'],
  providers: [AdminMatchCardsManagerTableService]
})
export class AdminMatchCardsManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  matchId: number;
  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    public adminMatchCardsManagerTableService: AdminMatchCardsManagerTableService,
    private cardService: CardService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = parseInt(params.get('matchId'), 10);
      this.adminMatchCardsManagerTableService.filterMode.matchId = this.matchId;
    });
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchCard(value))
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

  searchCard(value: string) {
    this.adminMatchCardsManagerTableService.filterMode['id'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminMatchGoalsAddModalComponent, {
    //   initialState: {
    //     title: 'Add Goal',
    //     matchId: this.matchId
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.goalAdded
    //   .subscribe(() => this.onCardAdded());
  }

  onCardAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    // this.bsModalRef = this.modalService.show(AdminMatchGoalsEditModalComponent, {
    //   initialState: {
    //     title: 'Edit Card',
    //     matchId: this.matchId,
    //     rowData
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.goalEdited
    //   .subscribe(() => this.onCardlEdited());
  }

  onCardlEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to remove this card from this match?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteCard(id));
  }

  confirmDeleteCard(id: number) {
    this.cardService.deleteCard(this.matchId, id)
      .subscribe(
        () => {
          this.alertService.success('Delete card successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete card failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
