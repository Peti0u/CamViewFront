import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGridIcon } from './layout-grid-icon';

describe('LayoutGridIcon', () => {
  let component: LayoutGridIcon;
  let fixture: ComponentFixture<LayoutGridIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutGridIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutGridIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
