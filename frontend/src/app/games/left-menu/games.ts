import { Component, EventEmitter, Output, inject } from '@angular/core';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './games.html',
  styleUrl: './games.css',
  standalone: false,
})
export class GamesComponent {
  private gamesService = inject(GamesService);
  @Output() selectedGame = new EventEmitter<string>();
  gameSearchValue = '';
  selectedGameId: string | undefined;

  sortedGames(gameSearchValue: string) {
    const temp = this.gamesService.searchForGames(gameSearchValue);
    return [...temp].sort((a, b) => a.name.localeCompare(b.name));
  }
  onSelectGame(id: string) {
    this.selectedGameId = id;
    this.selectedGame.emit(this.selectedGameId);
  }
}
