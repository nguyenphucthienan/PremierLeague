import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Player, PositionType } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-player-edit-modal',
  templateUrl: './admin-player-edit-modal.component.html',
  styleUrls: ['./admin-player-edit-modal.component.scss']
})
export class AdminPlayerEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  playerEdited = new EventEmitter();

  editForm: FormGroup;

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
    this.editForm = this.fb.group({
      name: [
        this.rowData.cells['name'].value,
        Validators.required
      ],
      positionType: [
        this.rowData.cells['positionType'].value,
        Validators.required
      ],
      nationality: [
        this.rowData.cells['nationality'].value,
        Validators.required
      ],
      birthdate: [
        new Date(this.rowData.cells['birthdate'].value),
        Validators.required
      ],
      height: [
        this.rowData.cells['height']
        && this.rowData.cells['height'].value
      ],
      weight: [
        this.rowData.cells['weight']
        && this.rowData.cells['weight'].value
      ],
      photoUrl: [
        this.rowData.cells['photoUrl']
        && this.rowData.cells['photoUrl'].value,
        Validators.required
      ],
    });
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editPlayer() {
    this.playerService.editPlayer(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (player: Player) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit player successfully');
          this.playerEdited.emit(player);
        },
        error => this.alertService.error('Edit player failed')
      );
  }

}
