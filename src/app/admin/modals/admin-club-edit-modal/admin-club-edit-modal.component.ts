import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-club-edit-modal',
  templateUrl: './admin-club-edit-modal.component.html',
  styleUrls: ['./admin-club-edit-modal.component.scss']
})
export class AdminClubEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  clubEdited = new EventEmitter();

  editForm: FormGroup;
  stadiums: Stadium[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private stadiumService: StadiumService,
    private clubService: ClubService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      code: [this.rowData.cells['code'].value, Validators.required],
      name: [this.rowData.cells['name'].value, Validators.required],
      establishedYear: [this.rowData.cells['establishedYear'].value, Validators.required],
      stadiumId: [null, Validators.required],
      photoUrl: [this.rowData.cells['photoUrl'].value, Validators.required],
    });

    this.stadiumService.getBriefListStadium()
      .subscribe((stadiums: Stadium[]) => this.stadiums = stadiums);
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editClub() {
    this.clubService.editClub(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (club: Club) => {
          this.bsModalRef.hide();
          this.alertService.success('Add club successfully');
          this.clubEdited.emit(club);
        },
        error => this.alertService.error('Add club failed')
      );
  }

}
