import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderIcon } from './folder-icon';

describe('FolderIcon', () => {
  let component: FolderIcon;
  let fixture: ComponentFixture<FolderIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FolderIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
