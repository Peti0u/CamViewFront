import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIcon } from './settings-icon';

describe('SettingsIcon', () => {
  let component: SettingsIcon;
  let fixture: ComponentFixture<SettingsIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
