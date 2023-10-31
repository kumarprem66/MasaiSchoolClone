import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyswiperComponent } from './myswiper.component';

describe('MyswiperComponent', () => {
  let component: MyswiperComponent;
  let fixture: ComponentFixture<MyswiperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyswiperComponent]
    });
    fixture = TestBed.createComponent(MyswiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
