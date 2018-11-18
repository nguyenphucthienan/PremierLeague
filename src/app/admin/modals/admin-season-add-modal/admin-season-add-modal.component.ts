import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Season } from 'src/app/core/models/season.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { SeasonService } from 'src/app/core/services/season.service';

@Component({
  selector: 'app-admin-season-add-modal',
  templateUrl: './admin-season-add-modal.component.html',
  styleUrls: ['./admin-season-add-modal.component.scss']
})
export class AdminSeasonAddModalComponent implements OnInit {

  title: string;
  seasonAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addSeason() {
    this.seasonService.createSeason(this.addForm.value)
      .subscribe(
        (season: Season) => {
          this.bsModalRef.hide();
          this.alertService.success('Add season successfully');
          this.seasonAdded.emit(season);
        },
        error => this.alertService.error('Add season failed')
      );
  }

}
