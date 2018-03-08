import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicParentComponent } from './dynamic-parent.component';

describe('DynamicParentComponent', () => {
  let component: DynamicParentComponent;
  let fixture: ComponentFixture<DynamicParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
