/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsegnamentiVincolatiDalCorsoDiStudioFormComponent } from './InsegnamentiVincolatiDalCorsoDiStudioForm.component';

describe('InsegnamentiVincolatiDalCorsoDiStudioFormComponent', () => {
  let component: InsegnamentiVincolatiDalCorsoDiStudioFormComponent;
  let fixture: ComponentFixture<InsegnamentiVincolatiDalCorsoDiStudioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsegnamentiVincolatiDalCorsoDiStudioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsegnamentiVincolatiDalCorsoDiStudioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
