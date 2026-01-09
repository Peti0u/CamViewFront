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
  @ViewChild('nav_dashboard') navHomeRef!: ElementRef; //On recupere le premier elmt actif (home)

  ngAfterViewInit() {
    this.active_bar = this.navHomeRef.nativeElement; //On l'assigne après l'initialisation
  }

  RendActif(div: HTMLElement) {
    if (this.active_bar != null) {
      this.active_bar.style.backgroundColor = 'transparent';
    }
    this.active_bar = div;
    div.style.backgroundColor = '#ededed60';
  }
}
