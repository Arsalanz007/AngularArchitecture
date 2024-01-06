import { TestBed } from '@angular/core/testing';

import { AuthHttpntercepterService } from './auth-httpIntercepter.service';

describe('AuthHttpntercepterService', () => {
  let service: AuthHttpntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
