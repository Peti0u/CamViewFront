import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  active_bar: HTMLElement | null = null; //on definit un elmt actif (dans la nav)
  @ViewChild('top_navbar') navHomeRef!: ElementRef; // On recupere le premier elmt actif (home)

  isNowActive(element: HTMLElement) {
    this.navHomeRef.nativeElement
      .querySelectorAll('a')
      .forEach((el: HTMLElement) => el.setAttribute('data-variant', ''));
    element.setAttribute('data-variant', 'active');
  }
}
