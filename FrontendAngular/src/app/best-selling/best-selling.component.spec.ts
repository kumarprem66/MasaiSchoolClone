import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingComponent } from './best-selling.component';

describe('BestSellingComponent', () => {
  let component: BestSellingComponent;
  let fixture: ComponentFixture<BestSellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestSellingComponent]
    });
    fixture = TestBed.createComponent(BestSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
