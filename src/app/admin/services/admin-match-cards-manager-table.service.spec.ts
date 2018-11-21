import { TestBed } from '@angular/core/testing';

import { AdminMatchCardsManagerTableService } from './admin-match-cards-manager-table.service';

describe('AdminMatchCardsManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMatchCardsManagerTableService = TestBed.get(AdminMatchCardsManagerTableService);
    expect(service).toBeTruthy();
  });
});
