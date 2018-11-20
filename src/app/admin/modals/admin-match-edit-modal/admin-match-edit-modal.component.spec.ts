import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchEditModalComponent } from './admin-match-edit-modal.component';

describe('AdminMatchEditModalComponent', () => {
  let component: AdminMatchEditModalComponent;
  let fixture: ComponentFixture<AdminMatchEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
