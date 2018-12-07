import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadManagersEditModalComponent } from './admin-squad-managers-edit-modal.component';

describe('AdminSquadManagersEditModalComponent', () => {
  let component: AdminSquadManagersEditModalComponent;
  let fixture: ComponentFixture<AdminSquadManagersEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadManagersEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadManagersEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
