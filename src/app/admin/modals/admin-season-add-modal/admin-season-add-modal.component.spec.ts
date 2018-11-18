import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonAddModalComponent } from './admin-season-add-modal.component';

describe('AdminSeasonAddModalComponent', () => {
  let component: AdminSeasonAddModalComponent;
  let fixture: ComponentFixture<AdminSeasonAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
