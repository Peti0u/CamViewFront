import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleDotIconComponent } from './circle-dot-icon-component';

describe('CircleDotIconComponent', () => {
  let component: CircleDotIconComponent;
  let fixture: ComponentFixture<CircleDotIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleDotIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleDotIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
