import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevronLeftIconComponent } from './chevron-left-icon-component';

describe('ChevronLeftIconComponent', () => {
  let component: ChevronLeftIconComponent;
  let fixture: ComponentFixture<ChevronLeftIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChevronLeftIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChevronLeftIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
