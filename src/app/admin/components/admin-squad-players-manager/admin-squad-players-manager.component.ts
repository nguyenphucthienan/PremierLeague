import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { SquadService } from 'src/app/core/services/squad.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import {
  AdminSquadPlayersAddModalComponent,
} from '../../modals/admin-squad-players-add-modal/admin-squad-players-add-modal.component';
import { AdminSquadPlayersManagerTableService } from '../../services/admin-squad-players-manager-table.service';

@Component({
  selector: 'app-admin-squad-players-manager',
  templateUrl: './admin-squad-players-manager.component.html',
  styleUrls: ['./admin-squad-players-manager.component.scss'],
  providers: [AdminSquadPlayersManagerTableService]
})
export class AdminSquadPlayersManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  squadId: number;
  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    public adminSquadPlayersManagerTableService: AdminSquadPlayersManagerTableService,
    private squadService: SquadService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.squadId = parseInt(params.get('squadId'), 10);
      this.adminSquadPlayersManagerTableService.filterMode.squadId = this.squadId;
    });
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
      case TableActionType.Delete:
        this.openRemoveModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchPlayer(value: string) {
    this.adminSquadPlayersManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.bsModalRef = this.modalService.show(AdminSquadPlayersAddModalComponent, {
      initialState: {
        title: 'Add Player',
        squadId: this.squadId
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.playerAdded
      .subscribe(() => this.onPlayerAdded());
  }

  onPlayerAdded() {
    this.datatable.refresh();
  }

  openRemoveModal(id: number) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        content: 'Are you sure you want to remove this player from this squad?'
      },
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.ok
      .subscribe(() => this.confirmRemovePlayer(id));
  }

  confirmRemovePlayer(id: number) {
    this.squadService.removePlayerFromSquad(this.squadId, id)
      .subscribe(
        () => {
          this.alertService.success('Remove player successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Remove player failed')
      );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
