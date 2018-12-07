import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagerEditModalComponent } from './admin-manager-edit-modal.component';

describe('AdminManagerEditModalComponent', () => {
  let component: AdminManagerEditModalComponent;
  let fixture: ComponentFixture<AdminManagerEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagerEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagerEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
