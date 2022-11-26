import { TestBed } from '@angular/core/testing';

import { DashboardStyleService } from './dashboard-style.service';

describe('DashboardStyleService', () => {
  let service: DashboardStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
