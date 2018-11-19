import { TestBed } from '@angular/core/testing';

import { AdminSquadKitsManagerTableService } from './admin-squad-kits-manager-table.service';

describe('AdminSquadKitsManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSquadKitsManagerTableService = TestBed.get(AdminSquadKitsManagerTableService);
    expect(service).toBeTruthy();
  });
});
