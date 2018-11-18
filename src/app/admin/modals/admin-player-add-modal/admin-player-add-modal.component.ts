import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Player, PositionType } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-admin-player-add-modal',
  templateUrl: './admin-player-add-modal.component.html',
  styleUrls: ['./admin-player-add-modal.component.scss']
})
export class AdminPlayerAddModalComponent implements OnInit {

  title: string;
  playerAdded = new EventEmitter();

  addForm: FormGroup;

  positionTypes = [
    {
      id: PositionType.GoalKeeper,
      name: 'Goalkeeper'
    },
    {
      id: PositionType.Defender,
      name: 'Defender'
    },
    {
      id: PositionType.Midfielder,
      name: 'Midfielder'
    },
    {
      id: PositionType.Forward,
      name: 'Forward'
    }
  ];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      positionType: [null, Validators.required],
      nationality: ['', Validators.required],
      birthdate: [null, Validators.required],
      height: [null],
      weight: [null],
      photoUrl: ['', Validators.required],
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addPlayer() {
    this.playerService.createPlayer(this.addForm.value)
      .subscribe(
        (player: Player) => {
          this.bsModalRef.hide();
          this.alertService.success('Add player successfully');
          this.playerAdded.emit(player);
        },
        error => this.alertService.error('Add player failed')
      );
  }

}
