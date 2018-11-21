import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-match-cards-edit-modal',
  templateUrl: './admin-match-cards-edit-modal.component.html',
  styleUrls: ['./admin-match-cards-edit-modal.component.scss']
})
export class AdminMatchCardsEditModalComponent implements OnInit, AfterViewInit {

  @ViewChild('clubSelect') clubSelect: NgSelectComponent;
  @ViewChild('playerSelect') playerSelect: NgSelectComponent;
  @ViewChild('cardTypeSelect') cardTypeSelect: NgSelectComponent;

  title: string;
  rowData: TableRow;
  cardEdited = new EventEmitter();

  editForm: FormGroup;
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
    this.editForm = this.fb.group({
      clubId: [this.rowData.cells['club'].value.id, Validators.required],
      playerId: [this.rowData.cells['player'].value.id, Validators.required],
      cardType: [this.rowData.cells['cardType'].value, Validators.required],
      cardTime: [this.rowData.cells['cardTime'].value, [
        Validators.required, Validators.min(1), Validators.max(90)]
      ]
    });

    this.getData();
  }

  ngAfterViewInit() {
    this.clubSelect.disabled = true;
    this.playerSelect.disabled = true;
    this.cardTypeSelect.disabled = true;
  }

  private getData() {
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

        this.squadService.getPlayersInSquad(
          this.match.season.id,
          this.rowData.cells['club'].value.id)
          .subscribe((players: Player[]) => this.players = players);
      });
  }

  onClubChanged(club: Club) {
    this.squadService.getPlayersInSquad(this.match.season.id, club.id)
      .subscribe((players: Player[]) => this.players = players);

    this.editForm.patchValue({ playerId: null });
  }

  editCard() {
    this.cardService.editCard(
      this.matchId,
      this.rowData.cells['id'].value,
      this.editForm.value)
      .subscribe(
        (card: Card) => {
          this.bsModalRef.hide();
          this.alertService.success('Edit card successfully');
          this.cardEdited.emit(card);
        },
        error => this.alertService.error('Edit card failed')
      );
  }

}
