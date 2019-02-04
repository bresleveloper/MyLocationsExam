import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationViewPropsComponent } from './location-view-props.component';

describe('LocationViewPropsComponent', () => {
  let component: LocationViewPropsComponent;
  let fixture: ComponentFixture<LocationViewPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationViewPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationViewPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
