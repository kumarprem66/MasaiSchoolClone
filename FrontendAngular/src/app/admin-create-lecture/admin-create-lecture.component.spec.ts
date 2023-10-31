import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateLectureComponent } from './admin-create-lecture.component';

describe('AdminCreateLectureComponent', () => {
  let component: AdminCreateLectureComponent;
  let fixture: ComponentFixture<AdminCreateLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateLectureComponent]
    });
    fixture = TestBed.createComponent(AdminCreateLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
