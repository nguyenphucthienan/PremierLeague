import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap';
import { forkJoin } from 'rxjs';
import { Club } from 'src/app/core/models/club.interface';
import { Goal, GoalType } from 'src/app/core/models/goal.interface';
import { Match } from 'src/app/core/models/match.interface';
import { Player } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { GoalService } from 'src/app/core/services/goal.service';
import { MatchService } from 'src/app/core/services/match.service';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-admin-match-goals-add-modal',
  templateUrl: './admin-match-goals-add-modal.component.html',
  styleUrls: ['./admin-match-goals-add-modal.component.scss']
})
export class AdminMatchGoalsAddModalComponent implements OnInit {

  @ViewChild('clubSelect') clubSelect: NgSelectComponent;

  title: string;
  goalAdded = new EventEmitter();

  addForm: FormGroup;
  matchId: number;
  match: Match;
  clubs: Club[] = [];
  players: Player[];

  goalTypes = [
    {
      id: GoalType.Other,
      name: 'Other'
    },
    {
      id: GoalType.LeftFoot,
      name: 'Left Foot'
    },
    {
      id: GoalType.RightFoot,
      name: 'Right Foot'
    },
    {
      id: GoalType.Head,
      name: 'Head'
    }
  ];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private squadService: SquadService,
    private matchService: MatchService,
    private goalService: GoalService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      clubId: [null, Validators.required],
      playerId: [null, Validators.required],
      goalType: [null, Validators.required],
      goalTime: [null, [Validators.required, Validators.min(1), Validators.max(90)]]
    });

    this.getMatchAndClubs();
  }

  private getMatchAndClubs() {
    this.matchService.getMatch(this.matchId)
      .subscribe((match: Match) => {
        this.match = match;
        this.clubs = [
          {
            id: match.homeClub.id,
            code: match.homeClub.code,
            name: match.homeClub.name
          },
          {
            id: match.awayClub.id,
            code: match.awayClub.code,
            name: match.awayClub.name
          }
        ];

        forkJoin(
          this.squadService.getBriefListPlayersInSquad(this.match.season.id, this.match.homeClub.id),
          this.squadService.getBriefListPlayersInSquad(this.match.season.id, this.match.awayClub.id)
        )
          .subscribe((data: any) => {
            const homeClubPlayers = data[0].map(player => ({
              id: player.id,
              name: player.name,
              label: `${this.match.homeClub.name} - ${player.name}`
            }));

            const awayClubPlayers = data[1].map(player => ({
              id: player.id,
              name: player.name,
              label: `${this.match.awayClub.name} - ${player.name}`
            }));

            this.players = [...homeClubPlayers, ...awayClubPlayers];
          });
      });
  }

  addGoal() {
    this.goalService.createGoal(this.matchId, this.addForm.value)
      .subscribe(
        (goal: Goal) => {
          this.bsModalRef.hide();
          this.alertService.success('Add goal successfully');
          this.goalAdded.emit(goal);
        },
        error => this.alertService.error('Add goal failed')
      );
  }

}
