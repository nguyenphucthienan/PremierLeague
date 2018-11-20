import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchManagerComponent } from './admin-match-manager.component';

describe('AdminMatchManagerComponent', () => {
  let component: AdminMatchManagerComponent;
  let fixture: ComponentFixture<AdminMatchManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
