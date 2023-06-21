import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SowTrackerComponent } from './sow-tracker.component';

describe('SowTrackerComponent', () => {
  let component: SowTrackerComponent;
  let fixture: ComponentFixture<SowTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SowTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SowTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
