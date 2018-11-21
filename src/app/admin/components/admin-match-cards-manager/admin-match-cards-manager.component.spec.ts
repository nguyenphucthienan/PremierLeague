import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchCardsManagerComponent } from './admin-match-cards-manager.component';

describe('AdminMatchCardsManagerComponent', () => {
  let component: AdminMatchCardsManagerComponent;
  let fixture: ComponentFixture<AdminMatchCardsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchCardsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchCardsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
