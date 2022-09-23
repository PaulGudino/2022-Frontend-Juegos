import { TestBed } from '@angular/core/testing';

import { UsuarioeditarGuard } from './usuarioeditar.guard';

describe('UsuarioeditarGuard', () => {
  let guard: UsuarioeditarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioeditarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
