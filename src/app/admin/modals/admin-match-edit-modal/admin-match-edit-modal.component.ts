import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Match } from 'src/app/core/models/match.interface';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { MatchService } from 'src/app/core/services/match.service';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-match-edit-modal',
  templateUrl: './admin-match-edit-modal.component.html',
  styleUrls: ['./admin-match-edit-modal.component.scss']
})
export class AdminMatchEditModalComponent implements OnInit, AfterViewInit {

  @ViewChild('homeClubSelect') homeClubSelect: NgSelectComponent;
  @ViewChild('awayClubSelect') awayClubSelect: NgSelectComponent;

  title: string;
  rowData: TableRow;
  matchEdited = new EventEmitter();

  editForm: FormGroup;
  clubs: Club[];
  stadiums: Stadium[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private clubService: ClubService,
    private stadiumService: StadiumService,
    private matchService: MatchService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      round: [this.rowData.cells['round'].value, Validators.required],
      homeClubId: [this.rowData.cells['homeClub'].value.id, Validators.required],
      awayClubId: [this.rowData.cells['awayClub'].value.id, Validators.required],
      matchTime: [new Date(this.rowData.cells['matchTime'].value), Validators.required],
      isPlayed: [this.rowData.cells['isPlayed'].value, Validators.required],
      stadiumId: [this.rowData.cells['stadium'].value.id, Validators.required]
    });

    this.clubService.getBriefListClub()
      .subscribe((clubs: Club[]) => this.clubs = clubs);

    this.stadiumService.getBriefListStadium()
      .subscribe((stadiums: Stadium[]) => this.stadiums = stadiums);
  }

  ngAfterViewInit() {
    this.homeClubSelect.disabled = true;
    this.awayClubSelect.disabled = true;
  }

  editMatch() {
    this.matchService.editMatch(
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (match: Match) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit match successfully');
          this.matchEdited.emit(match);
        },
        error => this.alertService.error('Edit match failed')
      );
  }

}
