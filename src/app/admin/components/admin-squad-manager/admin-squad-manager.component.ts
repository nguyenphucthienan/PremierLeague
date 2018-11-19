import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { SquadService } from 'src/app/core/services/squad.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminSquadManagerTableService } from '../../services/admin-squad-manager-table.service';

@Component({
  selector: 'app-admin-squad-manager',
  templateUrl: './admin-squad-manager.component.html',
  styleUrls: ['./admin-squad-manager.component.scss'],
  providers: [AdminSquadManagerTableService]
})
export class AdminSquadManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(public adminSquadManagerTableService: AdminSquadManagerTableService,
    private squadService: SquadService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchSquad(value))
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

  searchSquad(value: string) {
    this.adminSquadManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminClubAddModalComponent, {
    //   initialState: {
    //     title: 'Add New Squad'
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.clubAdded
    //   .subscribe(() => this.onSquadAdded());
  }

  onSquadAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    // this.bsModalRef = this.modalService.show(AdminClubEditModalComponent, {
    //   initialState: {
    //     title: 'Edit Squad',
    //     rowData
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.clubEdited
    //   .subscribe(() => this.onSquadEdited());
  }

  onSquadEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this squad?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteSquad(id));
  }

  confirmDeleteSquad(id: number) {
    this.squadService.deleteSquad(id)
      .subscribe(
        () => {
          this.alertService.success('Delete squad successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete squad failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
