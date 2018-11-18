import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClubEditModalComponent } from './admin-club-edit-modal.component';

describe('AdminClubEditModalComponent', () => {
  let component: AdminClubEditModalComponent;
  let fixture: ComponentFixture<AdminClubEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClubEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClubEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
