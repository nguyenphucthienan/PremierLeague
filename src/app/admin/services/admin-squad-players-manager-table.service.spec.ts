import { TestBed } from '@angular/core/testing';

import { AdminSquadPlayersManagerTableService } from './admin-squad-players-manager-table.service';

describe('AdminSquadPlayersManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSquadPlayersManagerTableService = TestBed.get(AdminSquadPlayersManagerTableService);
    expect(service).toBeTruthy();
  });
});
