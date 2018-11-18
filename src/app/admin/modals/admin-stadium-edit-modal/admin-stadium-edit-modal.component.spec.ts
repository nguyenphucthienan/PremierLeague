import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStadiumEditModalComponent } from './admin-stadium-edit-modal.component';

describe('AdminStadiumEditModalComponent', () => {
  let component: AdminStadiumEditModalComponent;
  let fixture: ComponentFixture<AdminStadiumEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStadiumEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStadiumEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
