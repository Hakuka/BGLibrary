import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummy_games } from '../assets/dummy-games';
import { BorrowedView } from './borrowed/borrowed-view';
import { CopiesDetails } from './games/game-view/copies-details';
import { GameDetails } from './games/game-view/game-details';
import { Games } from './games/left-menu/games';
import { Header } from './header/header';
import { Menu } from './header/menu';

@Component({
  selector: 'app-root',
  imports: [Header, Menu, Games, FormsModule, BorrowedView, GameDetails, CopiesDetails],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedMenuOption?: string;
  listOfGames = dummy_games;
  selectedGameId: string | undefined;
  searchGame = '';

  onSelectMenu(option: string) {
    this.selectedMenuOption = option;
  }

  get sortedGames() {
    return [...this.searchForGames].sort((a, b) => a.name.localeCompare(b.name));
  }

  onSelectGame(id: string) {
    this.selectedGameId = id;
  }

  get selectedGame() {
    return this.listOfGames.find((games) => games.id === this.selectedGameId);
  }

  get searchForGames() {
    const term = this.searchGame.trim().toLowerCase();
    return this.listOfGames.filter((g) => (term ? g.name.toLowerCase().includes(term) : true));
  }
}
