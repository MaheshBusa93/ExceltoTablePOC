import { TestBed } from '@angular/core/testing';

import { CreatesowService } from './createsow.service';

describe('CreatesowService', () => {
  let service: CreatesowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatesowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
