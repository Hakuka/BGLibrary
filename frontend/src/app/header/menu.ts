import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: false,
})
export class MenuComponent {
  @Output() select = new EventEmitter<string>();

  selectedMenu: string | undefined;

  onSelect(option: string) {
    this.select.emit(option);
    this.selectedMenu = option;
  }
}
