import { TestBed } from '@angular/core/testing';

import { JuegoGuard } from './juego.guard';

describe('JuegoGuard', () => {
  let guard: JuegoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JuegoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
