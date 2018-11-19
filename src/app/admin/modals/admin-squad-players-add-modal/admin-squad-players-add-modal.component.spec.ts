import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadPlayersAddModalComponent } from './admin-squad-players-add-modal.component';

describe('AdminSquadPlayersAddModalComponent', () => {
  let component: AdminSquadPlayersAddModalComponent;
  let fixture: ComponentFixture<AdminSquadPlayersAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadPlayersAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadPlayersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
