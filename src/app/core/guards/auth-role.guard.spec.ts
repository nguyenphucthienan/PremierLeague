import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRoleGuard } from './auth-role.guard';

describe('AuthRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRoleGuard]
    });
  });

  it('should ...', inject([AuthRoleGuard], (guard: AuthRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
