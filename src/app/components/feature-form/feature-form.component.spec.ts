import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFormComponent } from './feature-form.component';

describe('FeatureFormComponent', () => {
  let component: FeatureFormComponent;
  let fixture: ComponentFixture<FeatureFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureFormComponent]
    });
    fixture = TestBed.createComponent(FeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
