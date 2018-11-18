import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStadiumAddModalComponent } from './admin-stadium-add-modal.component';

describe('AdminStadiumAddModalComponent', () => {
  let component: AdminStadiumAddModalComponent;
  let fixture: ComponentFixture<AdminStadiumAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStadiumAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStadiumAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
