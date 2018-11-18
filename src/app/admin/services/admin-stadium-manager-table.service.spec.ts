import { TestBed } from '@angular/core/testing';

import { AdminStadiumManagerTableService } from './admin-stadium-manager-table.service';

describe('AdminStadiumManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminStadiumManagerTableService = TestBed.get(AdminStadiumManagerTableService);
    expect(service).toBeTruthy();
  });
});
