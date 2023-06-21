import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSowComponent } from './choose-sow.component';

describe('ChooseSowComponent', () => {
  let component: ChooseSowComponent;
  let fixture: ComponentFixture<ChooseSowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
