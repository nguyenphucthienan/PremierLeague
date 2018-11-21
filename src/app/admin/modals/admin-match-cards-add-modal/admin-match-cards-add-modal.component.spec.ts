import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchCardsAddModalComponent } from './admin-match-cards-add-modal.component';

describe('AdminMatchCardsAddModalComponent', () => {
  let component: AdminMatchCardsAddModalComponent;
  let fixture: ComponentFixture<AdminMatchCardsAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchCardsAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchCardsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
