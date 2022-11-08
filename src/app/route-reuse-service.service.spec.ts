import { TestBed } from '@angular/core/testing';

import { RouteReuseServiceService } from './route-reuse-service.service';

describe('RouteReuseServiceService', () => {
  let service: RouteReuseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteReuseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
