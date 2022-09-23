import { TestBed } from '@angular/core/testing';

import { RolescrearGuard } from './rolescrear.guard';

describe('RolescrearGuard', () => {
  let guard: RolescrearGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolescrearGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
