import { TestBed } from '@angular/core/testing';

import { CoinpayService } from './coinpay.service';

describe('CoinpayService', () => {
  let service: CoinpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
