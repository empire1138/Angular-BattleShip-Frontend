import { TestBed } from '@angular/core/testing';

import { SocketIOserviceService } from './socket-ioservice.service';

describe('SocketIOserviceService', () => {
  let service: SocketIOserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketIOserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
