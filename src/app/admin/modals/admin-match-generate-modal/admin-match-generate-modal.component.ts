import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';
import { Season } from 'src/app/core/models/season.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-admin-match-generate-modal',
  templateUrl: './admin-match-generate-modal.component.html',
  styleUrls: ['./admin-match-generate-modal.component.scss']
})
export class AdminMatchGenerateModalComponent implements OnInit {

  season: Season;
  clubs: Club[];

  ok = new EventEmitter();
  cancel = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    private clubService: ClubService,
    private matchService: MatchService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.clubService.getBriefListClubBySeasonId(this.season.id)
      .subscribe((clubs: Club[]) => this.clubs = clubs);
  }

  selectOk() {
    this.matchService.generateMatches(this.season.id)
      .subscribe(
        () => {
          this.ok.emit();
          this.alertService.success('Generate matches successfully');
          this.bsModalRef.hide();
        },
        error => this.alertService.error('Generate matches failed'));
  }

  selectCancel() {
    this.cancel.emit();
    this.bsModalRef.hide();
  }

}
