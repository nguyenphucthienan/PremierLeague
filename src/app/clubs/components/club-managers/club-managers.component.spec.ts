import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubManagersComponent } from './club-managers.component';

describe('ClubManagersComponent', () => {
  let component: ClubManagersComponent;
  let fixture: ComponentFixture<ClubManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
