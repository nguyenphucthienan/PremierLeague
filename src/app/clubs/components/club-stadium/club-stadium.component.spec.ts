import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStadiumComponent } from './club-stadium.component';

describe('ClubStadiumComponent', () => {
  let component: ClubStadiumComponent;
  let fixture: ComponentFixture<ClubStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
