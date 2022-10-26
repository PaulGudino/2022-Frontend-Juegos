import { TestBed } from '@angular/core/testing';

import { ControllerProbabilityService } from './controller-probability.service';

describe('ControllerProbabilityService', () => {
  let service: ControllerProbabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllerProbabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
