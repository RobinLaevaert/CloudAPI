import { TestBed, inject } from '@angular/core/testing';

import { SoccerService } from './soccer.service';

describe('SoccerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoccerService]
    });
  });

  it('should be created', inject([SoccerService], (service: SoccerService) => {
    expect(service).toBeTruthy();
  }));
});
