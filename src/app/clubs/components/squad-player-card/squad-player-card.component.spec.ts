import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadPlayerCardComponent } from './squad-player-card.component';

describe('SquadPlayerCardComponent', () => {
  let component: SquadPlayerCardComponent;
  let fixture: ComponentFixture<SquadPlayerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadPlayerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadPlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
