import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadKitsAddModalComponent } from './admin-squad-kits-add-modal.component';

describe('AdminSquadKitsAddModalComponent', () => {
  let component: AdminSquadKitsAddModalComponent;
  let fixture: ComponentFixture<AdminSquadKitsAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadKitsAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadKitsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
