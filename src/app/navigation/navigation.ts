import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  @ViewChild('bottom_navbar') bottom_navbar!: ElementRef<HTMLElement>;

  isNowActive(element: HTMLElement) {
    this.bottom_navbar.nativeElement
      .querySelectorAll('div')
      .forEach((el: HTMLElement) => el.setAttribute('data-variant', ''));
    element.setAttribute('data-variant', 'active');
  }
}
