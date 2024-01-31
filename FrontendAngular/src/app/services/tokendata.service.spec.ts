import { TestBed } from '@angular/core/testing';

import { TokendataService } from './tokendata.service';

describe('TokendataService', () => {
  let service: TokendataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokendataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
