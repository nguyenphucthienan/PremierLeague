import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Manager } from 'src/app/core/models/manager.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-manager-edit-modal',
  templateUrl: './admin-manager-edit-modal.component.html',
  styleUrls: ['./admin-manager-edit-modal.component.scss']
})
export class AdminManagerEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  managerEdited = new EventEmitter();

  editForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private managerService: ManagerService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [
        this.rowData.cells['name'].value,
        Validators.required
      ],
      nationality: [
        this.rowData.cells['name'].value,
        Validators.required
      ],
      birthdate: [
        new Date(this.rowData.cells['birthdate'].value),
        Validators.required
      ],
      description: [
        this.rowData.cells['description'].value,
        Validators.required
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

  editManager() {
    this.managerService.editManager(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (manager: Manager) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit manager successfully');
          this.managerEdited.emit(manager);
        },
        error => this.alertService.error('Edit manager failed')
      );
  }

}
