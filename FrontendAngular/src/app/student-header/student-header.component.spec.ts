import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHeaderComponent } from './student-header.component';

describe('StudentHeaderComponent', () => {
  let component: StudentHeaderComponent;
  let fixture: ComponentFixture<StudentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentHeaderComponent]
    });
    fixture = TestBed.createComponent(StudentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
