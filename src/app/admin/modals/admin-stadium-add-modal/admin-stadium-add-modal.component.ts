import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { StadiumService } from 'src/app/core/services/stadium.service';

@Component({
  selector: 'app-admin-stadium-add-modal',
  templateUrl: './admin-stadium-add-modal.component.html',
  styleUrls: ['./admin-stadium-add-modal.component.scss']
})
export class AdminStadiumAddModalComponent implements OnInit {

  title: string;
  stadiumAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private stadiumService: StadiumService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      builtYear: ['', Validators.required],
      pitchSize: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: ['', Validators.required],
      mapPhotoUrl: ['']
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  mapPhotoUploaded(response) {
    this.addForm.controls['mapPhotoUrl'].setValue(response.secureUrl);
  }

  addStadium() {
    this.stadiumService.createStadium(this.addForm.value)
      .subscribe(
        (stadium: Stadium) => {
          this.bsModalRef.hide();
          this.alertService.success('Add stadium successfully');
          this.stadiumAdded.emit(stadium);
        },
        error => this.alertService.error('Add stadium failed')
      );
  }

}
