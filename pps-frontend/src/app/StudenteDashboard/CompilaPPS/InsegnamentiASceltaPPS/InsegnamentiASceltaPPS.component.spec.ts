/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsegnamentiASceltaPPSComponent } from './InsegnamentiASceltaPPS.component';

describe('InsegnamentiASceltaPPSComponent', () => {
  let component: InsegnamentiASceltaPPSComponent;
  let fixture: ComponentFixture<InsegnamentiASceltaPPSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsegnamentiASceltaPPSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsegnamentiASceltaPPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
