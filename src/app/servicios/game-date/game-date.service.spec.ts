import { TestBed } from '@angular/core/testing';

import { GameDateService } from './game-date.service';

describe('GameDateService', () => {
  let service: GameDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
