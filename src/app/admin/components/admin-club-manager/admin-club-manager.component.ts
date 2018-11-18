import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminClubAddModalComponent } from '../../modals/admin-club-add-modal/admin-club-add-modal.component';
import { AdminClubManagerTableService } from '../../services/admin-club-manager-table.service';

@Component({
  selector: 'app-admin-club-manager',
  templateUrl: './admin-club-manager.component.html',
  styleUrls: ['./admin-club-manager.component.scss'],
  providers: [AdminClubManagerTableService]
})
export class AdminClubManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(public adminClubManagerTableService: AdminClubManagerTableService,
    private clubService: ClubService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchClub(value))
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

  searchClub(value: string) {
    this.adminClubManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminClubAddModalComponent, {
      initialState: {
        title: 'Add New Club'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.clubAdded
      .subscribe(data => console.log('data', data));
  }

  onClubAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    console.log('Edit modal');
  }

  onClubEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to delete this club?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteClub(id));
  }

  confirmDeleteClub(id: number) {
    this.clubService.deleteClub(id)
      .subscribe(
        () => {
          this.alertService.success('Delete club successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete club failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
