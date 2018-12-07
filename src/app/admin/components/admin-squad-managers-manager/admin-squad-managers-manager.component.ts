import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

import { AdminSquadManagersManagerTableService } from '../../services/admin-squad-managers-manager-table.service';

@Component({
  selector: 'app-admin-squad-managers-manager',
  templateUrl: './admin-squad-managers-manager.component.html',
  styleUrls: ['./admin-squad-managers-manager.component.scss'],
  providers: [AdminSquadManagersManagerTableService]
})
export class AdminSquadManagersManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  squadId: number;
  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public adminSquadManagersManagerTableService: AdminSquadManagersManagerTableService,
    private squadService: SquadService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.squadId = parseInt(params.get('squadId'), 10);
      this.adminSquadManagersManagerTableService.filterMode.squadId = this.squadId;
    });
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchManager(value))
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
        this.openRemoveModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchManager(value: string) {
    this.adminSquadManagersManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  navigateToManagerDetail(managerId: number) {
    this.router.navigate(['/managers', managerId]);
  }

  openAddModal() {
    // this.bsModalRef = this.modalService.show(AdminSquadPlayersAddModalComponent, {
    //   initialState: {
    //     title: 'Add Player',
    //     squadId: this.squadId
    //   },
    //   class: 'modal-dialog-centered'
    // });

    // this.bsModalRef.content.playerAdded
    //   .subscribe(() => this.onPlayerAdded());
  }

  onManagerAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    // this.bsModalRef = this.modalService.show(AdminSquadPlayersEditModalComponent, {
    //   initialState: {
    //     title: 'Edit Player',
    //     squadId: this.squadId,
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

  openRemoveModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to remove this manager from this squad?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmRemoveManager(id));
  }

  confirmRemoveManager(id: number) {
    // this.squadService.removePlayerFromSquad(this.squadId, id)
    //   .subscribe(
    //     () => {
    //       this.alertService.success('Remove manager successfully');
    //       this.datatable.refresh();
    //     },
    //     () => this.alertService.error('Remove manager failed')
    //   );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
