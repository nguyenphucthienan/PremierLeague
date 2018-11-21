import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/core/models/goal.interface';
import { Match } from 'src/app/core/models/match.interface';

@Component({
  selector: 'app-match-goals',
  templateUrl: './match-goals.component.html',
  styleUrls: ['./match-goals.component.scss']
})
export class MatchGoalsComponent implements OnInit {

  @Input() match: Match;

  homeGoals: Goal[];
  allGoals: Goal[];
  awayGoals: Goal[];

  constructor() { }

  ngOnInit() {
    this.allGoals = this.match.goals
      .sort((a, b) => a.goalTime - b.goalTime);

    this.homeGoals = this.match.goals
      .filter((goal: Goal) => goal.club.id === this.match.homeClub.id)
      .sort((a, b) => a.goalTime - b.goalTime);

    this.awayGoals = this.match.goals
      .filter((goal: Goal) => goal.club.id === this.match.awayClub.id)
      .sort((a, b) => a.goalTime - b.goalTime);
  }

}
