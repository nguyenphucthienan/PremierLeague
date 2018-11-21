import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchGoalsAddModalComponent } from './admin-match-goals-add-modal.component';

describe('AdminMatchGoalsAddModalComponent', () => {
  let component: AdminMatchGoalsAddModalComponent;
  let fixture: ComponentFixture<AdminMatchGoalsAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchGoalsAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchGoalsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
