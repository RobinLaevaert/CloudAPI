import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApipostComponent } from './apipost.component';

describe('ApipostComponent', () => {
  let component: ApipostComponent;
  let fixture: ComponentFixture<ApipostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApipostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApipostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
