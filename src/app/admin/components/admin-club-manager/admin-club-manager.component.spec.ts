import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClubManagerComponent } from './admin-club-manager.component';

describe('AdminClubManagerComponent', () => {
  let component: AdminClubManagerComponent;
  let fixture: ComponentFixture<AdminClubManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClubManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClubManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
