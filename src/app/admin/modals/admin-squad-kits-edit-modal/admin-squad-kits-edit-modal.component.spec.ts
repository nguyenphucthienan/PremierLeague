import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadKitsEditModalComponent } from './admin-squad-kits-edit-modal.component';

describe('AdminSquadKitsEditModalComponent', () => {
  let component: AdminSquadKitsEditModalComponent;
  let fixture: ComponentFixture<AdminSquadKitsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadKitsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadKitsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
