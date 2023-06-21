import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSoWComponent } from './review-so-w.component';

describe('ReviewSoWComponent', () => {
  let component: ReviewSoWComponent;
  let fixture: ComponentFixture<ReviewSoWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSoWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSoWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
