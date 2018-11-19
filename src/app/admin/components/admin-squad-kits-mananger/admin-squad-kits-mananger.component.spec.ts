import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadKitsManangerComponent } from './admin-squad-kits-mananger.component';

describe('AdminSquadKitsManangerComponent', () => {
  let component: AdminSquadKitsManangerComponent;
  let fixture: ComponentFixture<AdminSquadKitsManangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadKitsManangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadKitsManangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
