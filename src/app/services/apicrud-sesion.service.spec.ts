import { TestBed } from '@angular/core/testing';

import { ApicrudSesionService } from './apicrud-sesion.service';

describe('ApicrudSesionService', () => {
  let service: ApicrudSesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicrudSesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
