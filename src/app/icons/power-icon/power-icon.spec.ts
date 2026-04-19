import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerIcon } from './power-icon';

describe('PowerIcon', () => {
  let component: PowerIcon;
  let fixture: ComponentFixture<PowerIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
