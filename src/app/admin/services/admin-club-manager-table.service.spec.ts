import { TestBed } from '@angular/core/testing';

import { AdminClubManagerTableService } from './admin-club-manager-table.service';

describe('AdminClubManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminClubManagerTableService = TestBed.get(AdminClubManagerTableService);
    expect(service).toBeTruthy();
  });
});
