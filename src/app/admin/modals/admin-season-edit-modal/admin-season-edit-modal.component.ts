import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Season } from 'src/app/core/models/season.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { SeasonService } from 'src/app/core/services/season.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-season-edit-modal',
  templateUrl: './admin-season-edit-modal.component.html',
  styleUrls: ['./admin-season-edit-modal.component.scss']
})
export class AdminSeasonEditModalComponent implements OnInit {

  title: string;
  rowData: TableRow;
  seasonEdited = new EventEmitter();

  editForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [
        this.rowData.cells['name'].value,
        Validators.required
      ],
      startDate: [
        new Date(this.rowData.cells['startDate'].value),
        Validators.required
      ]
    });
  }

  editSeason() {
    this.seasonService.updateSeason(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (season: Season) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit season successfully');
          this.seasonEdited.emit(season);
        },
        error => this.alertService.error('Edit season failed')
      );
  }

}
