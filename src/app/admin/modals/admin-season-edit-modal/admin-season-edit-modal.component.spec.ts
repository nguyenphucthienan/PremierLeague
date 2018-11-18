import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonEditModalComponent } from './admin-season-edit-modal.component';

describe('AdminSeasonEditModalComponent', () => {
  let component: AdminSeasonEditModalComponent;
  let fixture: ComponentFixture<AdminSeasonEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
