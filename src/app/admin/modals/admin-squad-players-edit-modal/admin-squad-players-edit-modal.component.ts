import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Player } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { SquadService } from 'src/app/core/services/squad.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-squad-players-edit-modal',
  templateUrl: './admin-squad-players-edit-modal.component.html',
  styleUrls: ['./admin-squad-players-edit-modal.component.scss']
})
export class AdminSquadPlayersEditModalComponent implements OnInit {

  title: string;
  squadId: number;
  rowData: TableRow;
  playerEdited = new EventEmitter();

  editForm: FormGroup;
  players: Player[];
  playerSearch$ = new Subject<string>();

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      playerId: [this.rowData.cells['id'].value, Validators.required],
      number: [this.rowData.cells['number'].value, Validators.required]
    });

    this.getPlayers();
  }

  editPlayer() {
    this.squadService.editPlayerInSquad(
      this.squadId,
      this.editForm.value)
      .subscribe(() => {
        this.bsModalRef.hide();
        this.alertService.success('Edit player successfully');
        this.playerEdited.emit();
      },
        error => this.alertService.error('Edit player failed')
      );
  }

  private getPlayers() {
    this.playerService.getPlayers()
      .subscribe((response: any) => this.players = response.items);

    concat(
      of([]),
      this.playerSearch$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this.playerService.getPlayers(
          undefined, undefined, { name: value })
          .pipe(catchError(() => of([]))))
      )
    ).subscribe((response: any) => this.players = response.items);
  }

}
