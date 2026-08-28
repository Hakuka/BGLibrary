import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'button' | 'submit';
type Variant = 'primary' | 'secondary';
@Component({
  selector: 'button[app-button]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  host: {
    '[attr.type]': 'buttonType',
    '[disabled]': 'disabled',
    '[class]': "'btn btn-' + variant",
    '(click)': 'onButtonClick()',
  },
})
export class ButtonComponent {
  @Input({ required: true }) buttonType!: ButtonType;
  @Input({ required: true }) variant!: Variant;
  @Input() disabled: boolean | null = false;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
