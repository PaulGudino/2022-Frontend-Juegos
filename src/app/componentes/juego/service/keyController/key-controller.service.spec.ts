import { TestBed } from '@angular/core/testing';

import { KeyControllerService } from './key-controller.service';

describe('KeyControllerService', () => {
  let service: KeyControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
