import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadManagersAddModalComponent } from './admin-squad-managers-add-modal.component';

describe('AdminSquadManagersAddModalComponent', () => {
  let component: AdminSquadManagersAddModalComponent;
  let fixture: ComponentFixture<AdminSquadManagersAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadManagersAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadManagersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
