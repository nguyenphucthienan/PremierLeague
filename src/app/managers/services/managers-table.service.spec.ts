import { TestBed } from '@angular/core/testing';

import { ManagersTableService } from './managers-table.service';

describe('ManagersTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagersTableService = TestBed.get(ManagersTableService);
    expect(service).toBeTruthy();
  });
});
