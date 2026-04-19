import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleSelectedIconComponent } from './circle-selected-icon';

describe('CircleSelectedIcon', () => {
  let component: CircleSelectedIconComponent;
  let fixture: ComponentFixture<CircleSelectedIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleSelectedIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CircleSelectedIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
