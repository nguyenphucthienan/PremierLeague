import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadManagerComponent } from './admin-squad-manager.component';

describe('AdminSquadManagerComponent', () => {
  let component: AdminSquadManagerComponent;
  let fixture: ComponentFixture<AdminSquadManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
