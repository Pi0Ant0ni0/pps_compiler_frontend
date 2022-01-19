/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PPSDettagliatoComponent } from './PPSDettagliato.component';

describe('PPSDettagliatoComponent', () => {
  let component: PPSDettagliatoComponent;
  let fixture: ComponentFixture<PPSDettagliatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPSDettagliatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPSDettagliatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
