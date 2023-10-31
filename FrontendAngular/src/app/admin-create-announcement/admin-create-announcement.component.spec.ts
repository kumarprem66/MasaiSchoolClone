import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateAnnouncementComponent } from './admin-create-announcement.component';

describe('AdminCreateAnnouncementComponent', () => {
  let component: AdminCreateAnnouncementComponent;
  let fixture: ComponentFixture<AdminCreateAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateAnnouncementComponent]
    });
    fixture = TestBed.createComponent(AdminCreateAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
