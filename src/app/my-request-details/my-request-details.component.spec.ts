import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestDetailsComponent } from './my-request-details.component';

describe('MyRequestDetailsComponent', () => {
  let component: MyRequestDetailsComponent;
  let fixture: ComponentFixture<MyRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
