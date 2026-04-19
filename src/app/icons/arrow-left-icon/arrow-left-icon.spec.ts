import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowLeftIcon } from './arrow-left-icon';

describe('ArrowLeftIcon', () => {
  let component: ArrowLeftIcon;
  let fixture: ComponentFixture<ArrowLeftIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrowLeftIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowLeftIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
