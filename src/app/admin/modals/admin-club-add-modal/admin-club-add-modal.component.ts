import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { StadiumService } from 'src/app/core/services/stadium.service';

@Component({
  selector: 'app-admin-club-add-modal',
  templateUrl: './admin-club-add-modal.component.html',
  styleUrls: ['./admin-club-add-modal.component.scss']
})
export class AdminClubAddModalComponent implements OnInit {

  title: string;
  clubAdded = new EventEmitter();

  addForm: FormGroup;
  stadiums: Stadium[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private stadiumService: StadiumService,
    private clubService: ClubService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      establishedYear: ['', Validators.required],
      stadiumId: [null, Validators.required],
      photoUrl: ['', Validators.required],
    });

    this.stadiumService.getBriefListStadium()
      .subscribe((stadiums: Stadium[]) => this.stadiums = stadiums);
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addClub() {
    this.clubService.createClub(this.addForm.value)
      .subscribe(
        (club: Club) => {
          this.bsModalRef.hide();
          this.alertService.success('Add club successfully');
          this.clubAdded.emit(club);
        },
        error => this.alertService.error('Add club failed')
      );
  }

}
