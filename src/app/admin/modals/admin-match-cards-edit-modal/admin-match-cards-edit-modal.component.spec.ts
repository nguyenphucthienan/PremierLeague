import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchCardsEditModalComponent } from './admin-match-cards-edit-modal.component';

describe('AdminMatchCardsEditModalComponent', () => {
  let component: AdminMatchCardsEditModalComponent;
  let fixture: ComponentFixture<AdminMatchCardsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchCardsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchCardsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
