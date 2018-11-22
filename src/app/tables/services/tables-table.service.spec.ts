import { TestBed } from '@angular/core/testing';

import { TablesTableService } from './tables-table.service';

describe('TablesTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablesTableService = TestBed.get(TablesTableService);
    expect(service).toBeTruthy();
  });
});
