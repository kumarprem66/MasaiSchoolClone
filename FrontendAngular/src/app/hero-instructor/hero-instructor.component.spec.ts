import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInstructorComponent } from './hero-instructor.component';

describe('HeroInstructorComponent', () => {
  let component: HeroInstructorComponent;
  let fixture: ComponentFixture<HeroInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroInstructorComponent]
    });
    fixture = TestBed.createComponent(HeroInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
