import { TestBed } from '@angular/core/testing';

import { AdminMatchManagerTableService } from './admin-match-manager-table.service';

describe('AdminMatchManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMatchManagerTableService = TestBed.get(AdminMatchManagerTableService);
    expect(service).toBeTruthy();
  });
});
