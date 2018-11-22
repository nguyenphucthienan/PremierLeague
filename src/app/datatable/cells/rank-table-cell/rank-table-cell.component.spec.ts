import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankTableCellComponent } from './rank-table-cell.component';

describe('RankTableCellComponent', () => {
  let component: RankTableCellComponent;
  let fixture: ComponentFixture<RankTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
