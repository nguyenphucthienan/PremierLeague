import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-stadium-edit-modal',
  templateUrl: './admin-stadium-edit-modal.component.html',
  styleUrls: ['./admin-stadium-edit-modal.component.scss']
})
export class AdminStadiumEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  stadiumEdited = new EventEmitter();

  editForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private stadiumService: StadiumService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [
        this.rowData.cells['name'].value,
        Validators.required
      ],
      capacity: [
        this.rowData.cells['capacity'].value,
        Validators.required
      ],
      builtYear: [
        this.rowData.cells['builtYear'].value,
        Validators.required
      ],
      pitchSize: [
        this.rowData.cells['pitchSize'].value,
        Validators.required
      ],
      address: [
        this.rowData.cells['address'].value,
        Validators.required
      ],
      phone: [
        this.rowData.cells['phone'].value,
        Validators.required
      ],
      description: [
        this.rowData.cells['description'].value,
        Validators.required
      ],
      photoUrl: [
        this.rowData.cells['photoUrl'].value,
        Validators.required
      ],
      mapPhotoUrl: [
        this.rowData.cells['mapPhotoUrl']
        && this.rowData.cells['mapPhotoUrl'].value
      ]
    });
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  mapPhotoUploaded(response) {
    this.editForm.controls['mapPhotoUrl'].setValue(response.secureUrl);
  }

  editStadium() {
    this.stadiumService.editStadium(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (stadium: Stadium) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit stadium successfully');
          this.stadiumEdited.emit(stadium);
        },
        error => this.alertService.error('Edit stadium failed')
      );
  }

}
