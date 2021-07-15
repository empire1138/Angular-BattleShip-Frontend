import { TestBed } from '@angular/core/testing';

import { SinglePlayerServiceService } from './single-player-service.service';

describe('SinglePlayerServiceService', () => {
  let service: SinglePlayerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePlayerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
