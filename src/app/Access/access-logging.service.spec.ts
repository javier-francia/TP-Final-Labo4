import { TestBed } from '@angular/core/testing';

import { AccessLoggingService } from './access-logging.service';

describe('AccessLoggingService', () => {
  let service: AccessLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
