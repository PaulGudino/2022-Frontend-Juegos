import { TestBed } from '@angular/core/testing';

import { UsuarioverGuard } from './usuariover.guard';

describe('UsuarioverGuard', () => {
  let guard: UsuarioverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
