import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadEditModalComponent } from './admin-squad-edit-modal.component';

describe('AdminSquadEditModalComponent', () => {
  let component: AdminSquadEditModalComponent;
  let fixture: ComponentFixture<AdminSquadEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
