import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadPlayersEditModalComponent } from './admin-squad-players-edit-modal.component';

describe('AdminSquadPlayersEditModalComponent', () => {
  let component: AdminSquadPlayersEditModalComponent;
  let fixture: ComponentFixture<AdminSquadPlayersEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadPlayersEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadPlayersEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
