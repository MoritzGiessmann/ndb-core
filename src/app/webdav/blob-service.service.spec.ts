import { TestBed } from '@angular/core/testing';

import { BlobService } from './blob-service.service';
import { SessionService } from 'app/session/session.service';

describe('BlobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService
      ],
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: BlobService = TestBed.get(BlobService);
    expect(service).toBeTruthy();
  });
});
