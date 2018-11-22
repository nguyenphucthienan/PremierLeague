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

@Component({
  selector: 'app-admin-squad-add-modal',
  templateUrl: './admin-squad-add-modal.component.html',
  styleUrls: ['./admin-squad-add-modal.component.scss']
})
export class AdminSquadAddModalComponent implements OnInit {

  title: string;
  squadAdded = new EventEmitter();

  addForm: FormGroup;
  seasons: Season[];
  clubs: Club[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private clubService: ClubService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      seasonId: [null, Validators.required],
      clubId: [null, Validators.required]
    });

    this.seasonService.getBriefListSeason()
      .subscribe((seasons: Season[]) => this.seasons = seasons);

    this.clubService.getBriefListClub()
      .subscribe((clubs: Club[]) => this.clubs = clubs);
  }

  addSquad() {
    this.squadService.createSquad(this.addForm.value)
      .subscribe(
        (squad: Squad) => {
          this.bsModalRef.hide();
          this.alertService.success('Add squad successfully');
          this.squadAdded.emit(squad);
        },
        error => this.alertService.error('Add squad failed')
      );
  }

}
