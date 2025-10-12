import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'remove-item',
  imports: [FormsModule],
  templateUrl: './remove-item.html',
  styleUrl: './remove-item.css',
})
export class RemoveItem {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) removeTypeDisplay: string | undefined;
  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    //todo
    this.close.emit();
  }
}
