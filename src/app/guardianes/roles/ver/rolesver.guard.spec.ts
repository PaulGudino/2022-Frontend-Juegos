import { TestBed } from '@angular/core/testing';

import { RolesverGuard } from './rolesver.guard';

describe('RolesverGuard', () => {
  let guard: RolesverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
