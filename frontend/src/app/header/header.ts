import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header-menu',
  imports: [],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css',
})
export class HeaderMenuComponent {
  @Output() select = new EventEmitter<string>();

  selectedMenu: string | undefined;

  onSelect(option: string) {
    this.select.emit(option);
    this.selectedMenu = option;
  }
}
