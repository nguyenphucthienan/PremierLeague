import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadManagerCardComponent } from './squad-manager-card.component';

describe('SquadManagerCardComponent', () => {
  let component: SquadManagerCardComponent;
  let fixture: ComponentFixture<SquadManagerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadManagerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadManagerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
