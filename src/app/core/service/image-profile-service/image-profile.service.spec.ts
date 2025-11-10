import { TestBed } from '@angular/core/testing';

import { ImageProfileService } from './image-profile.service';

describe('ImageProfileService', () => {
  let service: ImageProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
