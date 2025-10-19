import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BorrowedAddComponent } from './borrowed-add/borrowed-add';
import { BorrowedEditComponent } from './borrowed-edit/borrowed-edit';
import { BorrowedViewComponent } from './borrowed-view/borrowed-view';

@NgModule({
  declarations: [BorrowedEditComponent, BorrowedAddComponent, BorrowedViewComponent],
  exports: [BorrowedViewComponent],
  imports: [FormsModule],
})
export class BorrowedModule {}
