import { TestBed } from '@angular/core/testing';

import { AnimationGameService } from './animation-game.service';

describe('AnimationGameService', () => {
  let service: AnimationGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
