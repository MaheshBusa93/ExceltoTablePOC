import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsowComponent } from './editsow.component';

describe('EditsowComponent', () => {
  let component: EditsowComponent;
  let fixture: ComponentFixture<EditsowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
