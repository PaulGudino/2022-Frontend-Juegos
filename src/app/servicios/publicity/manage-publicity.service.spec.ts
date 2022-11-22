import { TestBed } from '@angular/core/testing';

import { ManagePublicityService } from './manage-publicity.service';

describe('ManagePublicityService', () => {
  let service: ManagePublicityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePublicityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
