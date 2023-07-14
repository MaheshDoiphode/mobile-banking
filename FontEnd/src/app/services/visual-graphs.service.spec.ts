import { TestBed } from '@angular/core/testing';

import { VisualGraphsService } from './visual-graphs.service';

describe('VisualGraphsService', () => {
  let service: VisualGraphsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualGraphsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
