/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegoleComponent } from './Regole.component';

describe('RegoleComponent', () => {
  let component: RegoleComponent;
  let fixture: ComponentFixture<RegoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
