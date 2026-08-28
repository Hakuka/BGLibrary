import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css',
})
export class HeaderMenuComponent {
  @Output() menuSelected = new EventEmitter<string>();

  selectedMenu: string | undefined;

  onSelect(option: string): void {
    this.menuSelected.emit(option);
    this.selectedMenu = option;
  }
}
