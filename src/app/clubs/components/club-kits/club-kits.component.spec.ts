import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubKitsComponent } from './club-kits.component';

describe('ClubKitsComponent', () => {
  let component: ClubKitsComponent;
  let fixture: ComponentFixture<ClubKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
