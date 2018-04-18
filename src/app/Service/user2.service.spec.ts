import { TestBed, inject } from '@angular/core/testing';

import { User2Service } from './user2.service';

describe('User2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User2Service]
    });
  });

  it('should be created', inject([User2Service], (service: User2Service) => {
    expect(service).toBeTruthy();
  }));
});
