import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthHeaderComponent } from './un-auth-header.component';

describe('UnAuthHeaderComponent', () => {
  let component: UnAuthHeaderComponent;
  let fixture: ComponentFixture<UnAuthHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
