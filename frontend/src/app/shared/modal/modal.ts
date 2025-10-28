import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent {
  @Output() backdropClick = new EventEmitter<void>();

  onBackdropClick() {
    this.backdropClick.emit();
  }
}
