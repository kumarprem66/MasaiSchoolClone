import { TestBed } from '@angular/core/testing';

import { LecturesService } from './lectures.service';

describe('LecturesService', () => {
  let service: LecturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
