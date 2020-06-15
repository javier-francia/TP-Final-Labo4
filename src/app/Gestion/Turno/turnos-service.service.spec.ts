import { TestBed } from '@angular/core/testing';

import { TurnosServiceService } from './turnos-service.service';

describe('TurnosServiceService', () => {
  let service: TurnosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
