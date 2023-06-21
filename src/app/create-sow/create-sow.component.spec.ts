import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSOWComponent } from './create-sow.component';

describe('CreateSOWComponent', () => {
  let component: CreateSOWComponent;
  let fixture: ComponentFixture<CreateSOWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSOWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSOWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
