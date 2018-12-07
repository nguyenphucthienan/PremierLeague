import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagerManagerComponent } from './admin-manager-manager.component';

describe('AdminManagerManagerComponent', () => {
  let component: AdminManagerManagerComponent;
  let fixture: ComponentFixture<AdminManagerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
