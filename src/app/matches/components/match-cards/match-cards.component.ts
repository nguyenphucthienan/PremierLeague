import { Component, Input, OnInit } from '@angular/core';
import { Card, CardType } from 'src/app/core/models/card.interface';
import { Match } from 'src/app/core/models/match.interface';

@Component({
  selector: 'app-match-cards',
  templateUrl: './match-cards.component.html',
  styleUrls: ['./match-cards.component.scss']
})
export class MatchCardsComponent implements OnInit {

  @Input() match: Match;

  allCards: Card[];
  homeCards: Card[];
  awayCards: Card[];

  constructor() { }

  ngOnInit() {
    this.allCards = this.match.cards
      .sort((a, b) => a.cardTime - b.cardTime);

    this.homeCards = this.match.cards
      .filter((card: Card) => card.club.id === this.match.homeClub.id)
      .sort((a, b) => a.cardTime - b.cardTime);

    this.awayCards = this.match.cards
      .filter((card: Card) => card.club.id === this.match.awayClub.id)
      .sort((a, b) => a.cardTime - b.cardTime);
  }

  isYellowCard(card: Card) {
    return card.cardType === CardType.Yellow;
  }

  isRedCard(card: Card) {
    return card.cardType === CardType.Red;
  }

}
