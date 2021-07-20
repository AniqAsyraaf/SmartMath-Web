import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubDetailsComponent } from './view-sub-details.component';

describe('ViewSubDetailsComponent', () => {
  let component: ViewSubDetailsComponent;
  let fixture: ComponentFixture<ViewSubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
