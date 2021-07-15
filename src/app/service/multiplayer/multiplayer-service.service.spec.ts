import { TestBed } from '@angular/core/testing';

import { MultiplayerServiceService } from './multiplayer-service.service';

describe('MultiplayerServiceService', () => {
  let service: MultiplayerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplayerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
