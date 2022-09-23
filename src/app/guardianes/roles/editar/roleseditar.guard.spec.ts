import { TestBed } from '@angular/core/testing';

import { RoleseditarGuard } from './roleseditar.guard';

describe('RoleseditarGuard', () => {
  let guard: RoleseditarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleseditarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
