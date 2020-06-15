import { TestBed } from '@angular/core/testing';

import { GestorDeTurnosService } from './gestor-de-turnos.service';

describe('GestorDeTurnosService', () => {
  let service: GestorDeTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorDeTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
