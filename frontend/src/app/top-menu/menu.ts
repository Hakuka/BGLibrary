import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  @Output() select = new EventEmitter<string>();

  onSelect(option: string) {
    this.select.emit(option);
  }
}
