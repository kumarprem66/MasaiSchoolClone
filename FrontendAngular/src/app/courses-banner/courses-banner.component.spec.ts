import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBannerComponent } from './courses-banner.component';

describe('CoursesBannerComponent', () => {
  let component: CoursesBannerComponent;
  let fixture: ComponentFixture<CoursesBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesBannerComponent]
    });
    fixture = TestBed.createComponent(CoursesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
