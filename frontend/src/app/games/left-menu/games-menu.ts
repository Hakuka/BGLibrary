import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Game } from '../../shared/models/game.model';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-games-menu',
  imports: [FormsModule],
  templateUrl: './games-menu.html',
  styleUrl: './games-menu.css',
})
export class GamesMenuComponent {
  private gamesService = inject(GamesService);
  @Output() selectedGame = new EventEmitter<string>();
  gameSearchValue = '';
  selectedGameId: string | undefined;
  filteredGames: Game[] = this.getSortedGames('');

  onSearchChange(searchValue: string): void {
    this.gameSearchValue = searchValue;
    this.filteredGames = this.getSortedGames(searchValue);
  }

  onSelectGame(id: string): void {
    this.selectedGameId = id;
    this.selectedGame.emit(this.selectedGameId);
  }

  private getSortedGames(searchValue: string): Game[] {
    return this.gamesService
      .searchForGames(searchValue)
      .sort((first, second) => first.name.localeCompare(second.name));
  }
}
