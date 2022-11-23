import { TestBed } from '@angular/core/testing';

import { DashboardPublicityService } from './dashboard-publicity.service';

describe('DashboardPublicityService', () => {
  let service: DashboardPublicityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPublicityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
