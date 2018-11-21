import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
import { KitTypePipe } from 'src/app/shared/pipes/kit-type.pipe';

@Component({
  selector: 'app-admin-match-add-modal',
  templateUrl: './admin-match-add-modal.component.html',
  styleUrls: ['./admin-match-add-modal.component.scss']
})
export class AdminMatchAddModalComponent implements OnInit {

  @ViewChild('homeClubSelect') homeClubSelect: NgSelectComponent;
  @ViewChild('awayClubSelect') awayClubSelect: NgSelectComponent;

  title: string;
  matchAdded = new EventEmitter();

  addForm: FormGroup;
  season: Season;
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
    this.addForm = this.fb.group({
      seasonId: this.season.id,
      round: [null, Validators.required],
      homeClubId: [null, Validators.required],
      awayClubId: [null, Validators.required],
      homeClubKitId: [null, Validators.required],
      awayClubKitId: [null, Validators.required],
      matchTime: [null, Validators.required],
      isPlayed: [false, Validators.required],
      stadiumId: [null, Validators.required]
    });

    this.clubService.getBriefListClub()
      .subscribe((clubs: Club[]) => this.clubs = clubs);

    this.stadiumService.getBriefListStadium()
      .subscribe((stadiums: Stadium[]) => this.stadiums = stadiums);
  }

  onHomeClubChanged(club: Club) {
    this.kitService.getKitsBySeasonIdAndClubId(this.season.id, club.id)
      .subscribe((kits: Kit[]) => {
        this.homeClubKits = kits.map(kit => ({
          ...kit,
          name: this.kitTypePipe.transform(kit.kitType)
        }));
      });
  }

  onAwayClubChanged(club: Club) {
    this.kitService.getKitsBySeasonIdAndClubId(this.season.id, club.id)
      .subscribe((kits: Kit[]) => {
        this.awayClubKits = kits.map(kit => ({
          ...kit,
          name: this.kitTypePipe.transform(kit.kitType)
        }));
      });
  }

  addMatch() {
    this.matchService.createMatch(this.addForm.value)
      .subscribe(
        (match: Match) => {
          this.bsModalRef.hide();
          this.alertService.success('Add match successfully');
          this.matchAdded.emit(match);
        },
        error => this.alertService.error('Add match failed')
      );
  }

}
