import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClubAddModalComponent } from './admin-club-add-modal.component';

describe('AdminClubAddModalComponent', () => {
  let component: AdminClubAddModalComponent;
  let fixture: ComponentFixture<AdminClubAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClubAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClubAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
