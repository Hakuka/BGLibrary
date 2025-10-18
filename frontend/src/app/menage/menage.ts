import { Component } from '@angular/core';
import { AddNewItemComponent } from './add-new-item/add-new-item';
import { EditItemComponent } from './edit-item/edit-item';
import { RemoveItemComponent } from './remove-item/remove-item';

@Component({
  selector: 'menage',
  imports: [RemoveItemComponent, AddNewItemComponent, EditItemComponent],
  templateUrl: './menage.html',
  styleUrl: './menage.css',
})
export class MenageComponent {
  isRemoving: boolean = false;
  isAdding: boolean = false;
  isEditing: boolean = false;
  itemType: string = '';

  onRemoveItem(itemType: string) {
    if (itemType === 'C') {
      this.itemType = 'C';
    } else if (itemType === 'G') {
      this.itemType = 'G';
    }
    this.isRemoving = true;
  }

  onAddItem(itemType: string) {
    if (itemType === 'C') {
      this.itemType = 'C';
    } else if (itemType === 'G') {
      this.itemType = 'G';
    }
    this.isAdding = true;
  }

  onEditItem(itemType: string) {
    if (itemType === 'C') {
      this.itemType = 'C';
    } else if (itemType === 'G') {
      this.itemType = 'G';
    }
    this.isEditing = true;
  }

  onClose() {
    this.isRemoving = false;
    this.isAdding = false;
    this.isEditing = false;
  }

  onRemoveLocalData() {
    if (confirm('Are you sure that you want to clear local storage data and reload the site?')) {
      localStorage.removeItem('dummy_games');
      localStorage.removeItem('dummy_copies');
      window.location.reload();
    }
  }
}
