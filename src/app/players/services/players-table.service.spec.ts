import { TestBed } from '@angular/core/testing';

import { PlayersTableService } from './players-table.service';

describe('PlayersTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersTableService = TestBed.get(PlayersTableService);
    expect(service).toBeTruthy();
  });
});
