import { Component, Input, OnInit } from '@angular/core';
import { Manager } from 'src/app/core/models/manager.interface';

@Component({
  selector: 'app-manager-overview',
  templateUrl: './manager-overview.component.html',
  styleUrls: ['./manager-overview.component.scss']
})
export class ManagerOverviewComponent implements OnInit {

  @Input() manager: Manager;

  constructor() { }

  ngOnInit() {
  }

}
