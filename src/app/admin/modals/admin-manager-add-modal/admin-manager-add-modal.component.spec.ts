import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagerAddModalComponent } from './admin-manager-add-modal.component';

describe('AdminManagerAddModalComponent', () => {
  let component: AdminManagerAddModalComponent;
  let fixture: ComponentFixture<AdminManagerAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagerAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagerAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
