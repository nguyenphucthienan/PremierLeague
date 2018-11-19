import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Kit, KitType } from 'src/app/core/models/kit.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { KitService } from 'src/app/core/services/kit.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-squad-kits-edit-modal',
  templateUrl: './admin-squad-kits-edit-modal.component.html',
  styleUrls: ['./admin-squad-kits-edit-modal.component.scss']
})
export class AdminSquadKitsEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  kitEdited = new EventEmitter();

  editForm: FormGroup;

  kitTypes = [
    {
      id: KitType.HomeKit,
      name: 'Home Kit'
    },
    {
      id: KitType.AwayKit,
      name: 'Away Kit'
    },
    {
      id: KitType.ThirdKit,
      name: 'Third Kit'
    }
  ];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private kitService: KitService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      squadId: [this.rowData.cells['squadId'].value, Validators.required],
      kitType: [this.rowData.cells['kitType'].value, Validators.required],
      photoUrl: [this.rowData.cells['photoUrl'].value, Validators.required],
    });
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editKit() {
    this.kitService.editKit(
      this.rowData.cells['squadId'].value,
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (kit: Kit) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit kit successfully');
          this.kitEdited.emit(kit);
        },
        error => this.alertService.error('Edit kit failed')
      );
  }

}
