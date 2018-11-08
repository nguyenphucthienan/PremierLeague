import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFixturesComponent } from './club-fixtures.component';

describe('ClubFixturesComponent', () => {
  let component: ClubFixturesComponent;
  let fixture: ComponentFixture<ClubFixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubFixturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
