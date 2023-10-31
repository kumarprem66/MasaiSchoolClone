import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthComponent]
    });
    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
