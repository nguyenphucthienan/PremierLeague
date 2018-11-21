import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCardsComponent } from './match-cards.component';

describe('MatchCardsComponent', () => {
  let component: MatchCardsComponent;
  let fixture: ComponentFixture<MatchCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
