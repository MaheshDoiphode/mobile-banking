import { TestBed } from '@angular/core/testing';

import { VisualChartsService } from './visual-charts.service';

describe('VisualChartsService', () => {
  let service: VisualChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
