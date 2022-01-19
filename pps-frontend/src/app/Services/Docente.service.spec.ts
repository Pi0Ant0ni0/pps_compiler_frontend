/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocenteService } from './Docente.service';

describe('Service: Docente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocenteService]
    });
  });

  it('should ...', inject([DocenteService], (service: DocenteService) => {
    expect(service).toBeTruthy();
  }));
});
