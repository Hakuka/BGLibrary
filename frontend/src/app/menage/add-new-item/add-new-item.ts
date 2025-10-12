import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'add-new-item',
  imports: [FormsModule],
  templateUrl: './add-new-item.html',
  styleUrl: './add-new-item.css',
})
export class AddNewItem {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) addTypeDisplay: string | undefined;
  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    //todo
    this.close.emit();
  }
}
