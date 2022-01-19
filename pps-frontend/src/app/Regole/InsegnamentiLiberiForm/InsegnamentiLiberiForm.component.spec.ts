/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsegnamentiLiberiFormComponent } from './InsegnamentiLiberiForm.component';

describe('InsegnamentiLiberiFormComponent', () => {
  let component: InsegnamentiLiberiFormComponent;
  let fixture: ComponentFixture<InsegnamentiLiberiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsegnamentiLiberiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsegnamentiLiberiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
