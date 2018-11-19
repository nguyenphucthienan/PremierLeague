import { TestBed } from '@angular/core/testing';

import { AdminSquadManagerTableService } from './admin-squad-manager-table.service';

describe('AdminSquadManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSquadManagerTableService = TestBed.get(AdminSquadManagerTableService);
    expect(service).toBeTruthy();
  });
});
