import { Component } from '@angular/core';
import { Games } from './game/game';
import { Header } from './header/header';
import { Menu } from './top-menu/menu';

@Component({
  selector: 'app-root',
  imports: [Header, Menu, Games],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedMenuOption?: string;

  onSelectMenu(option: string) {
    this.selectedMenuOption = option;
  }
}
