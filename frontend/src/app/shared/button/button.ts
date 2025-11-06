import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'button' | 'submit';
type Variant = 'primary' | 'secondary';
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
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
