import { TestBed } from '@angular/core/testing';

import { AdminPlayerManagerTableService } from './admin-player-manager-table.service';

describe('AdminPlayerManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPlayerManagerTableService = TestBed.get(AdminPlayerManagerTableService);
    expect(service).toBeTruthy();
  });
});
