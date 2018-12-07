import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Manager } from 'src/app/core/models/manager.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';

@Component({
  selector: 'app-admin-manager-add-modal',
  templateUrl: './admin-manager-add-modal.component.html',
  styleUrls: ['./admin-manager-add-modal.component.scss']
})
export class AdminManagerAddModalComponent implements OnInit {

  title: string;
  managerAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private managerService: ManagerService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      birthdate: [null, Validators.required],
      description: ['', Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addManager() {
    this.managerService.createManager(this.addForm.value)
      .subscribe(
        (manager: Manager) => {
          this.bsModalRef.hide();
          this.alertService.success('Add manager successfully');
          this.managerAdded.emit(manager);
        },
        error => this.alertService.error('Add manager failed')
      );
  }

}
