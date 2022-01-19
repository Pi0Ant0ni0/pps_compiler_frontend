/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SadService } from './sad.service';

describe('Service: Sad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SadService]
    });
  });

  it('should ...', inject([SadService], (service: SadService) => {
    expect(service).toBeTruthy();
  }));
});
