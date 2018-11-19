import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

import { AdminSquadPlayersManagerTableService } from '../../services/admin-squad-players-manager-table.service';

@Component({
  selector: 'app-admin-squad-players-manager',
  templateUrl: './admin-squad-players-manager.component.html',
  styleUrls: ['./admin-squad-players-manager.component.scss'],
  providers: [AdminSquadPlayersManagerTableService]
})
export class AdminSquadPlayersManagerComponent implements OnInit {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    public adminSquadPlayersManagerTableService: AdminSquadPlayersManagerTableService,
    private playerService: PlayerService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminSquadPlayersManagerTableService.filterMode.squadId = params.get('squadId');
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.Delete:
        this.openRemoveModal(tableCellChange.row.cells['id'].value);
        break;
    }
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
    // this.playerService.deletePlayer(id)
    //   .subscribe(
    //     () => {
    //       this.alertService.success('Remove player successfully');
    //       this.datatable.refresh();
    //     },
    //     () => this.alertService.error('Remove player failed')
    //   );
  }

}
