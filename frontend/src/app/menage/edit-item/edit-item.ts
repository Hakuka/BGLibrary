import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'edit-item',
  imports: [FormsModule],
  templateUrl: './edit-item.html',
  styleUrl: './edit-item.css',
})
export class EditItemComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) editTypeDisplay: string | undefined;
  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    //todo
    this.close.emit();
  }
}
