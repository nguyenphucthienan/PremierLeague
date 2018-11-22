import { TestBed } from '@angular/core/testing';

import { FixturesTableService } from './fixtures-table.service';

describe('FixturesTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixturesTableService = TestBed.get(FixturesTableService);
    expect(service).toBeTruthy();
  });
});
