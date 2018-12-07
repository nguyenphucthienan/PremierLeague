import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminManagerManagerTableService } from '../../services/admin-manager-manager-table.service';

@Component({
  selector: 'app-admin-manager-manager',
  templateUrl: './admin-manager-manager.component.html',
  styleUrls: ['./admin-manager-manager.component.scss'],
  providers: [AdminManagerManagerTableService]
})
export class AdminManagerManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private router: Router,
    public adminManagerManagerTableService: AdminManagerManagerTableService,
    private managerService: ManagerService,
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
      case TableActionType.GetDetail:
        this.navigateToManagerDetail(tableCellChange.row.cells['id'].value);
        break;
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openDeleteModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchPlayer(value: string) {
    this.adminManagerManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  navigateToManagerDetail(managerId: number) {
    this.router.navigate(['/managers', managerId]);
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminPlayerAddModalComponent, {
    //   initialState: {
    //     title: 'Add New Player'
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.playerAdded
    //   .subscribe(() => this.onPlayerAdded());
  }

  onPlayerAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    // this.bsModalRef = this.modalService.show(AdminPlayerEditModalComponent, {
    //   initialState: {
    //     title: 'Edit Player',
    //     rowData
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.playerEdited
    //   .subscribe(() => this.onPlayerEdited());
  }

  onManagerEdited() {
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
      .subscribe(() => this.confirmDeleteManager(id));
  }

  confirmDeleteManager(id: number) {
    this.managerService.deleteManager(id)
      .subscribe(
        () => {
          this.alertService.success('Delete manager successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete manager failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
