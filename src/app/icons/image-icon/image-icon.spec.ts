import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageIcon } from './image-icon';

describe('ImageIcon', () => {
  let component: ImageIcon;
  let fixture: ComponentFixture<ImageIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
