import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleIconComponent } from './circle-icon-component';

describe('CircleIconComponent', () => {
  let component: CircleIconComponent;
  let fixture: ComponentFixture<CircleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
