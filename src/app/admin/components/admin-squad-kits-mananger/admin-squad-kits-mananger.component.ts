import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { KitService } from 'src/app/core/services/kit.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import {
  AdminSquadKitsAddModalComponent,
} from '../../modals/admin-squad-kits-add-modal/admin-squad-kits-add-modal.component';
import {
  AdminSquadKitsEditModalComponent,
} from '../../modals/admin-squad-kits-edit-modal/admin-squad-kits-edit-modal.component';
import { AdminSquadKitsManagerTableService } from '../../services/admin-squad-kits-manager-table.service';

@Component({
  selector: 'app-admin-squad-kits-mananger',
  templateUrl: './admin-squad-kits-mananger.component.html',
  styleUrls: ['./admin-squad-kits-mananger.component.scss'],
  providers: [AdminSquadKitsManagerTableService]
})
export class AdminSquadKitsManangerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  squadId: number;
  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    public adminSquadKitsManagerTableService: AdminSquadKitsManagerTableService,
    private kitService: KitService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.squadId = parseInt(params.get('squadId'), 10);
      this.adminSquadKitsManagerTableService.filterMode.squadId = this.squadId;
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
    this.adminSquadKitsManagerTableService.filterMode['id'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminSquadKitsAddModalComponent, {
      initialState: {
        title: 'Add Kit',
        squadId: this.squadId
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.kitAdded
      .subscribe(() => this.onKitAdded());
  }

  onKitAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.bsModalRef = this.modalService.show(AdminSquadKitsEditModalComponent, {
      initialState: {
        title: 'Edit Kit',
        rowData
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.kitEdited
      .subscribe(() => this.onKitEdited());
  }

  onKitEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to remove this kit from this squad?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmDeleteKit(id));
  }

  confirmDeleteKit(id: number) {
    this.kitService.deleteKit(this.squadId, id)
      .subscribe(
        () => {
          this.alertService.success('Delete kit successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete kit failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
