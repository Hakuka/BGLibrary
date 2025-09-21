import { Component } from '@angular/core';
import { dummy_games } from '../assets/dummy-games';
import { Games } from './games/games';
import { Header } from './header/header';
import { Menu } from './header/top-menu/menu';

@Component({
  selector: 'app-root',
  imports: [Header, Menu, Games],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedMenuOption?: string;
  listOfGames = dummy_games;
  selectedGameId: string | undefined;

  onSelectMenu(option: string) {
    this.selectedMenuOption = option;
  }

  get sortedGames() {
    return [...this.listOfGames].sort((a, b) => a.name.localeCompare(b.name));
  }

  onSelectGame(id: string) {
    this.selectedGameId = id;
  }

  get selectedGame() {
    return this.listOfGames.find((games) => games.id === this.selectedGameId);
  }
}
