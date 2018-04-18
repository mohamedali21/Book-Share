import { TestBed, inject } from '@angular/core/testing';

import { BookaddService } from './bookadd.service';

describe('BookaddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookaddService]
    });
  });

  it('should be created', inject([BookaddService], (service: BookaddService) => {
    expect(service).toBeTruthy();
  }));
});
