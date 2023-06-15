import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAccessFormComponent } from './project-access-form.component';

describe('ProjectAccessFormComponent', () => {
  let component: ProjectAccessFormComponent;
  let fixture: ComponentFixture<ProjectAccessFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectAccessFormComponent]
    });
    fixture = TestBed.createComponent(ProjectAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
