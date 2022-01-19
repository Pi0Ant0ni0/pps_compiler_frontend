/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrientamentoPPSComponent } from './OrientamentoPPS.component';

describe('OrientamentoPPSComponent', () => {
  let component: OrientamentoPPSComponent;
  let fixture: ComponentFixture<OrientamentoPPSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientamentoPPSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientamentoPPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
