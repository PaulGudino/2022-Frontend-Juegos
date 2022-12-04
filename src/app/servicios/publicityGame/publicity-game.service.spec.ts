import { TestBed } from '@angular/core/testing';

import { PublicityGameService } from './publicity-game.service';

describe('PublicityGameService', () => {
  let service: PublicityGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicityGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
