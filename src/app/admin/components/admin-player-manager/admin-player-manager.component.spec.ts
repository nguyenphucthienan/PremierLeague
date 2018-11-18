import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerManagerComponent } from './admin-player-manager.component';

describe('AdminPlayerManagerComponent', () => {
  let component: AdminPlayerManagerComponent;
  let fixture: ComponentFixture<AdminPlayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
