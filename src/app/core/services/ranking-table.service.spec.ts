import { TestBed } from '@angular/core/testing';

import { RankingTableService } from './ranking-table.service';

describe('RankingTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankingTableService = TestBed.get(RankingTableService);
    expect(service).toBeTruthy();
  });
});
