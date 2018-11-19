import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Season } from 'src/app/core/models/season.interface';
import { Squad } from 'src/app/core/models/squad.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { SeasonService } from 'src/app/core/services/season.service';
import { SquadService } from 'src/app/core/services/squad.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-squad-edit-modal',
  templateUrl: './admin-squad-edit-modal.component.html',
  styleUrls: ['./admin-squad-edit-modal.component.scss']
})
export class AdminSquadEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  squadEdited = new EventEmitter();

  editForm: FormGroup;
  seasons: Season[];
  clubs: Club[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private clubService: ClubService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      seasonId: [this.rowData.cells['season'].value.id, Validators.required],
      clubId: [this.rowData.cells['club'].value.id, Validators.required]
    });

    this.seasonService.getBriefListSeason()
      .subscribe((seasons: Season[]) => this.seasons = seasons);

    this.clubService.getBriefListClub()
      .subscribe((clubs: Club[]) => this.clubs = clubs);
  }

  editSquad() {
    this.squadService.editSquad(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (squad: Squad) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit squad successfully');
          this.squadEdited.emit(squad);
        },
        error => this.alertService.error('Edit squad failed')
      );
  }

}
