import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trash-icon',
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
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      />
    </svg>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class TrashIconComponent {
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
