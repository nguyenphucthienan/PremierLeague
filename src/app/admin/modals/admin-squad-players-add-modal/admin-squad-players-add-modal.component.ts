import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Player } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-admin-squad-players-add-modal',
  templateUrl: './admin-squad-players-add-modal.component.html',
  styleUrls: ['./admin-squad-players-add-modal.component.scss']
})
export class AdminSquadPlayersAddModalComponent implements OnInit {

  title: string;
  squadId: number;
  playerAdded = new EventEmitter();

  addForm: FormGroup;
  players: Player[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      playerId: ['', Validators.required]
    });

    this.playerService.getPlayers()
      .subscribe((response: any) => this.players = response.items);
  }

  addPlayer() {
    this.squadService.addPlayerToSquad(
      this.squadId,
      this.addForm.value.playerId)
      .subscribe(() => {
        this.bsModalRef.hide();
        this.alertService.success('Add player successfully');
        this.playerAdded.emit();
      },
        error => this.alertService.error('Add player failed')
      );
  }

}
