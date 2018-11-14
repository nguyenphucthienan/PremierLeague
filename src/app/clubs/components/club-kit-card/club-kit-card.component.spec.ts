import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubKitCardComponent } from './club-kit-card.component';

describe('ClubKitCardComponent', () => {
  let component: ClubKitCardComponent;
  let fixture: ComponentFixture<ClubKitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubKitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubKitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
