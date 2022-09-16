import { TestBed } from '@angular/core/testing';

import { PuenteDatosService } from './puente-datos.service';

describe('PuenteDatosService', () => {
  let service: PuenteDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuenteDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
