/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompilaPPSComponent } from './CompilaPPS.component';

describe('CompilaPPSComponent', () => {
  let component: CompilaPPSComponent;
  let fixture: ComponentFixture<CompilaPPSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompilaPPSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilaPPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
