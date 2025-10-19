import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddNewItemComponent } from './add-new-item/add-new-item';
import { EditItemComponent } from './edit-item/edit-item';
import { MenageComponent } from './menage-view/menage';
import { RemoveItemComponent } from './remove-item/remove-item';

@NgModule({
  declarations: [MenageComponent, RemoveItemComponent, AddNewItemComponent, EditItemComponent],
  exports: [MenageComponent],
  imports: [FormsModule],
})
export class MenageModule {}
