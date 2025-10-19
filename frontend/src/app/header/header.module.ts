import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header';
import { MenuComponent } from './menu';

@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  exports: [MenuComponent, HeaderComponent],
  imports: [FormsModule],
})
export class HeaderModule {}
