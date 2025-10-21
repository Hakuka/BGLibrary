import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'games-menu',
  imports: [FormsModule],
  templateUrl: './games-menu.html',
  styleUrl: './games-menu.css',
})
export class GamesMenuComponent {
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
