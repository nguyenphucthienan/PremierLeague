import { TestBed } from '@angular/core/testing';

import { AdminSquadManagersManagerTableService } from './admin-squad-managers-manager-table.service';

describe('AdminSquadManagersManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSquadManagersManagerTableService = TestBed.get(AdminSquadManagersManagerTableService);
    expect(service).toBeTruthy();
  });
});
