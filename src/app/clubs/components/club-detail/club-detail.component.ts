import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { Club } from 'src/app/core/models/club.interface';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent implements OnInit {

  @ViewChild(TabsetComponent) tabset: TabsetComponent;

  club: Club;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.club = data['club'];
    });
  }

  selectTab(tabId: number) {
    this.tabset.tabs[tabId].active = true;
  }

}
