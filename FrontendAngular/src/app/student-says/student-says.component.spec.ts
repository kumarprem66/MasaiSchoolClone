import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSaysComponent } from './student-says.component';

describe('StudentSaysComponent', () => {
  let component: StudentSaysComponent;
  let fixture: ComponentFixture<StudentSaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSaysComponent]
    });
    fixture = TestBed.createComponent(StudentSaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
