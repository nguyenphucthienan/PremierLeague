import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap';
import { Card, CardType } from 'src/app/core/models/card.interface';
import { Club } from 'src/app/core/models/club.interface';
import { Match } from 'src/app/core/models/match.interface';
import { Player } from 'src/app/core/models/player.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CardService } from 'src/app/core/services/card.service';
import { MatchService } from 'src/app/core/services/match.service';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-admin-match-cards-add-modal',
  templateUrl: './admin-match-cards-add-modal.component.html',
  styleUrls: ['./admin-match-cards-add-modal.component.scss']
})
export class AdminMatchCardsAddModalComponent implements OnInit {

  @ViewChild('clubSelect') clubSelect: NgSelectComponent;

  title: string;
  cardAdded = new EventEmitter();

  addForm: FormGroup;
  matchId: number;
  match: Match;
  clubs: Club[] = [];
  players: Player[];

  cardTypes = [
    {
      id: CardType.Yellow,
      name: 'Yellow'
    },
    {
      id: CardType.Red,
      name: 'Red'
    }
  ];

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private squadService: SquadService,
    private matchService: MatchService,
    private cardService: CardService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      clubId: [null, Validators.required],
      playerId: [null, Validators.required],
      cardType: [null, Validators.required],
      cardTime: [null, [Validators.required, Validators.min(1), Validators.max(90)]]
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
      });
  }

  onClubChanged(club: Club) {
    this.squadService.getPlayersInSquad(this.match.season.id, club.id)
      .subscribe((players: Player[]) => this.players = players);
  }

  addCard() {
    this.cardService.createCard(this.matchId, this.addForm.value)
      .subscribe(
        (card: Card) => {
          this.bsModalRef.hide();
          this.alertService.success('Add card successfully');
          this.cardAdded.emit(card);
        },
        error => this.alertService.error('Add card failed')
      );
  }

}
