import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSection3Component } from './hero-section3.component';

describe('HeroSection3Component', () => {
  let component: HeroSection3Component;
  let fixture: ComponentFixture<HeroSection3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSection3Component]
    });
    fixture = TestBed.createComponent(HeroSection3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
