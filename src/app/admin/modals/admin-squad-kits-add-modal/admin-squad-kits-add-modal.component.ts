import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Kit, KitType } from 'src/app/core/models/kit.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { KitService } from 'src/app/core/services/kit.service';

@Component({
  selector: 'app-admin-squad-kits-add-modal',
  templateUrl: './admin-squad-kits-add-modal.component.html',
  styleUrls: ['./admin-squad-kits-add-modal.component.scss']
})
export class AdminSquadKitsAddModalComponent implements OnInit {

  title: string;
  squadId: number;
  kitAdded = new EventEmitter();

  addForm: FormGroup;

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
    this.addForm = this.fb.group({
      kitType: [null, Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addKit() {
    this.kitService.createKit(
      this.squadId,
      this.addForm.value)
      .subscribe(
        (kit: Kit) => {
          this.bsModalRef.hide();
          this.alertService.success('Add kit successfully');
          this.kitAdded.emit(kit);
        },
        error => this.alertService.error('Add kit failed')
      );
  }

}
