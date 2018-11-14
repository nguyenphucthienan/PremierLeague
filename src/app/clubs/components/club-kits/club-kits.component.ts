import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Club } from 'src/app/core/models/club.interface';
import { Kit } from 'src/app/core/models/kit.interface';
import { Squad } from 'src/app/core/models/squad.interface';

@Component({
  selector: 'app-club-kits',
  templateUrl: './club-kits.component.html',
  styleUrls: ['./club-kits.component.scss']
})
export class ClubKitsComponent implements OnInit {

  @ViewChild(NgSelectComponent) seasonSelect: NgSelectComponent;

  @Input() club: Club;

  squads: Squad[];
  currentSquad: Squad;

  kits: Kit[];

  constructor() { }

  ngOnInit() {
    this.squads = this.club.squads;
    this.seasonSelect.writeValue(this.squads[0].id);
    this.currentSquad = this.squads[0];
    this.getKits();
  }

  getKits() {
    this.kits = this.currentSquad.kits;
  }

  onSquadFilterChanged(squad: Squad) {
    this.currentSquad = squad;
    this.getKits();
  }

}
