import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchClubsTableCellComponent } from './match-clubs-table-cell.component';

describe('MatchClubsTableCellComponent', () => {
  let component: MatchClubsTableCellComponent;
  let fixture: ComponentFixture<MatchClubsTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchClubsTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchClubsTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
