import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTasksSectionComponent } from './feature-tasks-section.component';

describe('FeatureTasksSectionComponent', () => {
  let component: FeatureTasksSectionComponent;
  let fixture: ComponentFixture<FeatureTasksSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureTasksSectionComponent]
    });
    fixture = TestBed.createComponent(FeatureTasksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
