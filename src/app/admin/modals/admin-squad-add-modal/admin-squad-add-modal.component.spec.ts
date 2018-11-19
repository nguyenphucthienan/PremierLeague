import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSquadAddModalComponent } from './admin-squad-add-modal.component';

describe('AdminSquadAddModalComponent', () => {
  let component: AdminSquadAddModalComponent;
  let fixture: ComponentFixture<AdminSquadAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSquadAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSquadAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
