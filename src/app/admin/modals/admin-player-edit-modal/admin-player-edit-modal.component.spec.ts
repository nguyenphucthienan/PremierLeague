import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerEditModalComponent } from './admin-player-edit-modal.component';

describe('AdminPlayerEditModalComponent', () => {
  let component: AdminPlayerEditModalComponent;
  let fixture: ComponentFixture<AdminPlayerEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
