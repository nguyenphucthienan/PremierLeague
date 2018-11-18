import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStadiumManagerComponent } from './admin-stadium-manager.component';

describe('AdminStadiumManagerComponent', () => {
  let component: AdminStadiumManagerComponent;
  let fixture: ComponentFixture<AdminStadiumManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStadiumManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStadiumManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
