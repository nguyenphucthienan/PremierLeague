import { TestBed } from '@angular/core/testing';

import { AdminMatchGoalsManagerTableService } from './admin-match-goals-manager-table.service';

describe('AdminMatchGoalsManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMatchGoalsManagerTableService = TestBed.get(AdminMatchGoalsManagerTableService);
    expect(service).toBeTruthy();
  });
});
