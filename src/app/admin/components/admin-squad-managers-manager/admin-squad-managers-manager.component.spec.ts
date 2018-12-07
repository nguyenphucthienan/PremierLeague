import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadManagersManagerComponent } from './admin-squad-managers-manager.component';

describe('AdminSquadManagersManagerComponent', () => {
  let component: AdminSquadManagersManagerComponent;
  let fixture: ComponentFixture<AdminSquadManagersManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadManagersManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadManagersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
