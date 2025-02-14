import { TestBed } from '@angular/core/testing';

import { CreateScheduleService } from './create-schedule.service';

describe('CreateScheduleService', () => {
  let service: CreateScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
