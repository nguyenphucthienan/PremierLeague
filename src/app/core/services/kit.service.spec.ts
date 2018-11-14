import { TestBed } from '@angular/core/testing';

import { KitService } from './kit.service';

describe('KitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KitService = TestBed.get(KitService);
    expect(service).toBeTruthy();
  });
});
