import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenLineIcon } from './pen-line-icon';

describe('PenLineIcon', () => {
  let component: PenLineIcon;
  let fixture: ComponentFixture<PenLineIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PenLineIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenLineIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
