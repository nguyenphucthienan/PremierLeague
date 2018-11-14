import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubResultsComponent } from './club-results.component';

describe('ClubResultsComponent', () => {
  let component: ClubResultsComponent;
  let fixture: ComponentFixture<ClubResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
