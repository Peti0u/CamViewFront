import { TestBed } from '@angular/core/testing';

import { ArchiveServices } from './archive-services';

describe('ArchiveServices', () => {
  let service: ArchiveServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
