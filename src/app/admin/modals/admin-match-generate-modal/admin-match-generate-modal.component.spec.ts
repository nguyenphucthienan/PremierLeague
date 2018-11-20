import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchGenerateModalComponent } from './admin-match-generate-modal.component';

describe('AdminMatchGenerateModalComponent', () => {
  let component: AdminMatchGenerateModalComponent;
  let fixture: ComponentFixture<AdminMatchGenerateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchGenerateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchGenerateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
