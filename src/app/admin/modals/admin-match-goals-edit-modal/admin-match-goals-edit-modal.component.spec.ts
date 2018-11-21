import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchGoalsEditModalComponent } from './admin-match-goals-edit-modal.component';

describe('AdminMatchGoalsEditModalComponent', () => {
  let component: AdminMatchGoalsEditModalComponent;
  let fixture: ComponentFixture<AdminMatchGoalsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchGoalsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchGoalsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
