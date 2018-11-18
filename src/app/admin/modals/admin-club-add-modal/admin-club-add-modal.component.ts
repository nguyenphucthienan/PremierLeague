import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-club-add-modal',
  templateUrl: './admin-club-add-modal.component.html',
  styleUrls: ['./admin-club-add-modal.component.scss']
})
export class AdminClubAddModalComponent implements OnInit {

  title: string;
  clubAdded = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  ok() {
    this.clubAdded.next('Club');
    this.bsModalRef.hide();
  }

}
