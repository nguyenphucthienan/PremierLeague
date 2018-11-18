import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerAddModalComponent } from './admin-player-add-modal.component';

describe('AdminPlayerAddModalComponent', () => {
  let component: AdminPlayerAddModalComponent;
  let fixture: ComponentFixture<AdminPlayerAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
