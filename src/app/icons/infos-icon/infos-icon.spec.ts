import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosIcon } from './infos-icon';

describe('InfosIcon', () => {
  let component: InfosIcon;
  let fixture: ComponentFixture<InfosIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfosIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
