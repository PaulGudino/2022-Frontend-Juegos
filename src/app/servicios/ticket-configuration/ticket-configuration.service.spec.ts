import { TestBed } from '@angular/core/testing';

import { TicketConfigurationService } from './ticket-configuration.service';

describe('TicketConfigurationService', () => {
  let service: TicketConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
