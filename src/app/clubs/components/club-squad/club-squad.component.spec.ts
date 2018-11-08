import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSquadComponent } from './club-squad.component';

describe('ClubSquadComponent', () => {
  let component: ClubSquadComponent;
  let fixture: ComponentFixture<ClubSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
