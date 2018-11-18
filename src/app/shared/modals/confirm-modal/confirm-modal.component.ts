import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  content: string;
  ok = new EventEmitter();
  cancel = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  selectOk() {
    this.ok.emit();
    this.bsModalRef.hide();
  }

  selectCancel() {
    this.cancel.emit();
    this.bsModalRef.hide();
  }

}
