import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminPlayerAddModalComponent } from '../../modals/admin-player-add-modal/admin-player-add-modal.component';
import { AdminPlayerEditModalComponent } from '../../modals/admin-player-edit-modal/admin-player-edit-modal.component';
import { AdminPlayerManagerTableService } from '../../services/admin-player-manager-table.service';

@Component({
  selector: 'app-admin-player-manager',
  templateUrl: './admin-player-manager.component.html',
  styleUrls: ['./admin-player-manager.component.scss'],
  providers: [AdminPlayerManagerTableService]
})
export class AdminPlayerManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(public adminPlayerManagerTableService: AdminPlayerManagerTableService,
    private playerService: PlayerService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchPlayer(value))
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

  searchPlayer(value: string) {
    this.adminPlayerManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminPlayerAddModalComponent, {
      initialState: {
        title: 'Add New Player'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.playerAdded
      .subscribe(() => this.onPlayerAdded());
  }

  onPlayerAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminPlayerEditModalComponent, {
      initialState: {
        title: 'Edit Player',
        rowData
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.playerEdited
      .subscribe(() => this.onPlayerEdited());
  }

  onPlayerEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this player?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeletePlayer(id));
  }

  confirmDeletePlayer(id: number) {
    this.playerService.deletePlayer(id)
      .subscribe(
        () => {
          this.alertService.success('Delete player successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete player failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
