import { TestBed } from '@angular/core/testing';

import { MembershipManagerService } from './membership-manager.service';

describe('MembershipManagerService', () => {
  let service: MembershipManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
