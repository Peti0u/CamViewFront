import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCamera } from './full-camera';

describe('FullCamera', () => {
  let component: FullCamera;
  let fixture: ComponentFixture<FullCamera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullCamera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCamera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
