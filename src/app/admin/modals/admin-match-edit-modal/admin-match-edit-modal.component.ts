import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Kit } from 'src/app/core/models/kit.interface';
import { Match } from 'src/app/core/models/match.interface';
import { Season } from 'src/app/core/models/season.interface';
import { Stadium } from 'src/app/core/models/stadium.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { KitService } from 'src/app/core/services/kit.service';
import { MatchService } from 'src/app/core/services/match.service';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { KitTypePipe } from 'src/app/shared/pipes/kit-type.pipe';

@Component({
  selector: 'app-admin-match-edit-modal',
  templateUrl: './admin-match-edit-modal.component.html',
  styleUrls: ['./admin-match-edit-modal.component.scss']
})
export class AdminMatchEditModalComponent implements OnInit, AfterViewInit {

  @ViewChild('homeClubSelect') homeClubSelect: NgSelectComponent;
  @ViewChild('awayClubSelect') awayClubSelect: NgSelectComponent;

  title: string;
  season: Season;
  rowData: TableRow;
  matchEdited = new EventEmitter();

  editForm: FormGroup;
  rounds: any[];
  clubs: Club[];
  stadiums: Stadium[];

  homeClubKits: Kit[];
  awayClubKits: Kit[];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private clubService: ClubService,
    private kitService: KitService,
    private stadiumService: StadiumService,
    private matchService: MatchService,
    private alertService: AlertService,
    private kitTypePipe: KitTypePipe) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      round: [this.rowData.cells['round'].value, Validators.required],
      homeClubId: [this.rowData.cells['homeClub'].value.id, Validators.required],
      awayClubId: [this.rowData.cells['awayClub'].value.id, Validators.required],
      homeClubKitId: [this.rowData.cells['homeClubKit'].value.id, Validators.required],
      awayClubKitId: [this.rowData.cells['awayClubKit'].value.id, Validators.required],
      matchTime: [new Date(this.rowData.cells['matchTime'].value), Validators.required],
      isPlayed: [this.rowData.cells['isPlayed'].value, Validators.required],
      stadiumId: [this.rowData.cells['stadium'].value.id, Validators.required]
    });

    this.matchService.getListRounds(this.rowData.cells['seasonId'].value)
      .subscribe((rounds: number[]) => this.rounds = rounds);

    this.clubService.getBriefListClub()
      .subscribe((clubs: Club[]) => this.clubs = clubs);

    this.stadiumService.getBriefListStadium()
      .subscribe((stadiums: Stadium[]) => this.stadiums = stadiums);

    this.getKits();
  }

  ngAfterViewInit() {
    this.homeClubSelect.disabled = true;
    this.awayClubSelect.disabled = true;
  }

  private getKits() {
    this.kitService.getKitsBySeasonIdAndClubId(this.season.id,
      this.rowData.cells['homeClub'].value.id)
      .subscribe((kits: Kit[]) => {
        this.homeClubKits = kits.map(kit => ({
          ...kit,
          name: this.kitTypePipe.transform(kit.kitType)
        }));
      });

    this.kitService.getKitsBySeasonIdAndClubId(this.season.id,
      this.rowData.cells['awayClub'].value.id)
      .subscribe((kits: Kit[]) => {
        this.awayClubKits = kits.map(kit => ({
          ...kit,
          name: this.kitTypePipe.transform(kit.kitType)
        }));
      });
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
