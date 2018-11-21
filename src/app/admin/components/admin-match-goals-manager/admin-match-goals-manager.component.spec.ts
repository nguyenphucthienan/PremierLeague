import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchGoalsManagerComponent } from './admin-match-goals-manager.component';

describe('AdminMatchGoalsManagerComponent', () => {
  let component: AdminMatchGoalsManagerComponent;
  let fixture: ComponentFixture<AdminMatchGoalsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchGoalsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchGoalsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
