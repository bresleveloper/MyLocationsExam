import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsGroupedComponent } from './locations-grouped.component';

describe('LocationsGroupedComponent', () => {
  let component: LocationsGroupedComponent;
  let fixture: ComponentFixture<LocationsGroupedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsGroupedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
