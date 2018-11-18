import { TestBed } from '@angular/core/testing';

import { AdminSeasonManagerTableService } from './admin-season-manager-table.service';

describe('AdminSeasonManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSeasonManagerTableService = TestBed.get(AdminSeasonManagerTableService);
    expect(service).toBeTruthy();
  });
});
