import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadPlayersManagerComponent } from './admin-squad-players-manager.component';

describe('AdminSquadPlayersManagerComponent', () => {
  let component: AdminSquadPlayersManagerComponent;
  let fixture: ComponentFixture<AdminSquadPlayersManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadPlayersManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadPlayersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
