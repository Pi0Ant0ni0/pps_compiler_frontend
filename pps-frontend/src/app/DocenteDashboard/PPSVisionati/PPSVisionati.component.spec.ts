/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PPSVisionatiComponent } from './PPSVisionati.component';

describe('PPSVisionatiComponent', () => {
  let component: PPSVisionatiComponent;
  let fixture: ComponentFixture<PPSVisionatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPSVisionatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPSVisionatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
