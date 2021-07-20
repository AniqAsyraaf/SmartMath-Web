import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentSubComponent } from './view-student-sub.component';

describe('ViewStudentSubComponent', () => {
  let component: ViewStudentSubComponent;
  let fixture: ComponentFixture<ViewStudentSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
