import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentHeaderComponent } from './assignment-header.component';

describe('AssignmentHeaderComponent', () => {
  let component: AssignmentHeaderComponent;
  let fixture: ComponentFixture<AssignmentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentHeaderComponent]
    });
    fixture = TestBed.createComponent(AssignmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
