import { TestBed } from '@angular/core/testing';

import { AdminManagerManagerTableService } from './admin-manager-manager-table.service';

describe('AdminManagerManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminManagerManagerTableService = TestBed.get(AdminManagerManagerTableService);
    expect(service).toBeTruthy();
  });
});
