import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminStadiumAddModalComponent } from '../../modals/admin-stadium-add-modal/admin-stadium-add-modal.component';
import { AdminStadiumManagerTableService } from '../../services/admin-stadium-manager-table.service';
import { AdminStadiumEditModalComponent } from '../../modals/admin-stadium-edit-modal/admin-stadium-edit-modal.component';

@Component({
  selector: 'app-admin-stadium-manager',
  templateUrl: './admin-stadium-manager.component.html',
  styleUrls: ['./admin-stadium-manager.component.scss'],
  providers: [AdminStadiumManagerTableService]
})
export class AdminStadiumManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(public adminStadiumManagerTableService: AdminStadiumManagerTableService,
    private stadiumService: StadiumService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchStadium(value))
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

  searchStadium(value: string) {
    this.adminStadiumManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminStadiumAddModalComponent, {
      initialState: {
        title: 'Add New Stadium'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.stadiumAdded
      .subscribe(() => this.onStadiumAdded());
  }

  onStadiumAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminStadiumEditModalComponent, {
      initialState: {
        title: 'Edit Stadium',
        rowData
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.stadiumEdited
      .subscribe(() => this.onStadiumEdited());
  }

  onStadiumEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this stadium?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteStadium(id));
  }

  confirmDeleteStadium(id: number) {
    this.stadiumService.deleteStadium(id)
      .subscribe(
        () => {
          this.alertService.success('Delete stadium successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete stadium failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
