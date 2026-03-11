import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  active_bar: HTMLElement | null = null; //on definit un elmt actif (dans la nav)
  @ViewChild('nav_home') navHomeRef!: ElementRef; //On recupere le premier elmt actif (home)

  ngAfterViewInit() {
    this.active_bar = this.navHomeRef.nativeElement; //On l'assigne après l'initialisation
  }

  setActive(div: HTMLElement) {
    if (this.active_bar != null) {
      this.active_bar.style.backgroundColor = '#ededed20';
      this.active_bar.style.transform = 'scale(1)';
    }
    this.active_bar = div;
    div.style.backgroundColor = '#ededed60';
    div.style.transform = 'scale(1.05)';
  }
}
