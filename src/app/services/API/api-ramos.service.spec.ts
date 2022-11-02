import { TestBed } from '@angular/core/testing';

import { ApiRamosService } from './api-ramos.service';

describe('ApiRamosService', () => {
  let service: ApiRamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
