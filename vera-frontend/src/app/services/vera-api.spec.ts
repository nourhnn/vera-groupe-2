import { TestBed } from '@angular/core/testing';

import { VeraApi } from './vera-api';

describe('VeraApi', () => {
  let service: VeraApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeraApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
