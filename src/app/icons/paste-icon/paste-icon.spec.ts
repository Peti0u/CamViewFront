import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteIcon } from './paste-icon';

describe('PasteIcon', () => {
  let component: PasteIcon;
  let fixture: ComponentFixture<PasteIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasteIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasteIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
