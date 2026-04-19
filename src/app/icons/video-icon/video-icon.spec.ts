import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoIcon } from './video-icon';

describe('VideoIcon', () => {
  let component: VideoIcon;
  let fixture: ComponentFixture<VideoIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
