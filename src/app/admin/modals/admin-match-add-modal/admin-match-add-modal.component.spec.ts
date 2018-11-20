import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchAddModalComponent } from './admin-match-add-modal.component';

describe('AdminMatchAddModalComponent', () => {
  let component: AdminMatchAddModalComponent;
  let fixture: ComponentFixture<AdminMatchAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
