import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clipboard-paste-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="getViewBox()"
      fill="none"
      [attr.stroke]="color"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      [ngStyle]="getStyle()"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      >
        <path d="M11 14h10M16 4h2a2 2 0 0 1 2 2v1.344M17 18l4-4l-4-4" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
        <rect width="8" height="4" x="8" y="2" rx="1" />
      </g>
    </svg>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class ClipboardPasteIconComponent {
  @Input() size: string = '100%';
  @Input() color: string = '#000000';
  @Input() strokeWidth: number = 2;
  @Input() background: string = 'transparent';
  @Input() opacity: number = 1;
  @Input() rotation: number = 0;
  @Input() shadow: number = 0;
  @Input() flipHorizontal: boolean = false;
  @Input() flipVertical: boolean = false;
  @Input() padding: number = 0;

  getViewBox(): string {
    const viewBoxSize = 24 + this.padding * 2;
    const viewBoxOffset = -this.padding;
    return `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;
  }

  getStyle(): any {
    const transforms = [];
    if (this.rotation !== 0) transforms.push(`rotate(${this.rotation}deg)`);
    if (this.flipHorizontal) transforms.push('scaleX(-1)');
    if (this.flipVertical) transforms.push('scaleY(-1)');

    return {
      opacity: this.opacity,
      transform: transforms.join(' ') || undefined,
      filter:
        this.shadow > 0
          ? `drop-shadow(0 ${this.shadow}px ${this.shadow * 2}px rgba(0,0,0,0.3))`
          : undefined,
      backgroundColor: this.background !== 'transparent' ? this.background : undefined,
    };
  }
}
