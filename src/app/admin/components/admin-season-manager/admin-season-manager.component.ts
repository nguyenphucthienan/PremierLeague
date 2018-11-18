import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { SeasonService } from 'src/app/core/services/season.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminSeasonAddModalComponent } from '../../modals/admin-season-add-modal/admin-season-add-modal.component';
import { AdminSeasonEditModalComponent } from '../../modals/admin-season-edit-modal/admin-season-edit-modal.component';
import { AdminSeasonManagerTableService } from '../../services/admin-season-manager-table.service';

@Component({
  selector: 'app-admin-season-manager',
  templateUrl: './admin-season-manager.component.html',
  styleUrls: ['./admin-season-manager.component.scss'],
  providers: [AdminSeasonManagerTableService]
})
export class AdminSeasonManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(public adminSeasonManagerTableService: AdminSeasonManagerTableService,
    private seasonService: SeasonService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchSeason(value))
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

  searchSeason(value: string) {
    this.adminSeasonManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminSeasonAddModalComponent, {
      initialState: {
        title: 'Add New Season'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.seasonAdded
      .subscribe(() => this.onSeasonAdded());
  }

  onSeasonAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminSeasonEditModalComponent, {
      initialState: {
        title: 'Edit Season',
        rowData
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.seasonEdited
      .subscribe(() => this.onSeasonEdited());
  }

  onSeasonEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this season?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteSeason(id));
  }

  confirmDeleteSeason(id: number) {
    this.seasonService.deleteSeason(id)
      .subscribe(
        () => {
          this.alertService.success('Delete season successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete season failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
