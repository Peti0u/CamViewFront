import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutIcon } from './log-out-icon';

describe('LogOutIcon', () => {
  let component: LogOutIcon;
  let fixture: ComponentFixture<LogOutIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogOutIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOutIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
