import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegsiterComponent } from './student-regsiter.component';

describe('StudentRegsiterComponent', () => {
  let component: StudentRegsiterComponent;
  let fixture: ComponentFixture<StudentRegsiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegsiterComponent]
    });
    fixture = TestBed.createComponent(StudentRegsiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
