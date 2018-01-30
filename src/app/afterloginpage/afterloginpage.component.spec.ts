import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterloginpageComponent } from './afterloginpage.component';

describe('AfterloginpageComponent', () => {
  let component: AfterloginpageComponent;
  let fixture: ComponentFixture<AfterloginpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterloginpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterloginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
