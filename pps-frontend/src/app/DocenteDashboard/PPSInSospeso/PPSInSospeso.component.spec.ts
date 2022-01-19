/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PPSInSospesoComponent } from './PPSInSospeso.component';

describe('PPSInSospesoComponent', () => {
  let component: PPSInSospesoComponent;
  let fixture: ComponentFixture<PPSInSospesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPSInSospesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPSInSospesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
