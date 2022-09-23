import { TestBed } from '@angular/core/testing';

import { UsuarioscrearGuard } from './usuarioscrear.guard';

describe('UsuarioscrearGuard', () => {
  let guard: UsuarioscrearGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioscrearGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
