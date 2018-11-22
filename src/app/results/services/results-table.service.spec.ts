import { TestBed } from '@angular/core/testing';

import { ResultsTableService } from './results-table.service';

describe('ResultsTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultsTableService = TestBed.get(ResultsTableService);
    expect(service).toBeTruthy();
  });
});
