import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScissorsIcon } from './scissors-icon';

describe('ScissorsIcon', () => {
  let component: ScissorsIcon;
  let fixture: ComponentFixture<ScissorsIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScissorsIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScissorsIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
