import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignmentComponent } from './instructor-assignment.component';

describe('InstructorAssignmentComponent', () => {
  let component: InstructorAssignmentComponent;
  let fixture: ComponentFixture<InstructorAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAssignmentComponent]
    });
    fixture = TestBed.createComponent(InstructorAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
