import { TestBed } from '@angular/core/testing';

import { ChatbotserviceService } from './chatbotservice.service';

describe('ChatbotserviceService', () => {
  let service: ChatbotserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
