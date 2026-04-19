import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandIcon } from './expand-icon';

describe('ExpandIcon', () => {
  let component: ExpandIcon;
  let fixture: ComponentFixture<ExpandIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
