import { TestBed } from '@angular/core/testing';

import { AwardsConditionService } from './awards-condition.service';

describe('AwardsConditionService', () => {
  let service: AwardsConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardsConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
