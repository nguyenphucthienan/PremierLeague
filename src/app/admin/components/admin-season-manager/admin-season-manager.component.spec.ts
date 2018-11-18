import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonManagerComponent } from './admin-season-manager.component';

describe('AdminSeasonManagerComponent', () => {
  let component: AdminSeasonManagerComponent;
  let fixture: ComponentFixture<AdminSeasonManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
