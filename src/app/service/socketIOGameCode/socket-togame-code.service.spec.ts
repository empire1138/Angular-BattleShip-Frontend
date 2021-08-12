import { TestBed } from '@angular/core/testing';

import { SocketTOGameCodeService } from './socket-togame-code.service';

describe('SocketTOGameCodeService', () => {
  let service: SocketTOGameCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketTOGameCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
