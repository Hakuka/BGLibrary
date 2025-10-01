import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-game',
  imports: [FormsModule],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class GamesComponent {
  constructor(private gamesService: GamesService) {}
  @Output() selectedGame = new EventEmitter<string>();
  gameSearchValue = '';
  selectedGameId: string | undefined;

  sortedGames(gameSearchValue: string) {
    return this.gamesService.sortedGames(gameSearchValue);
  }
  onSelectGame(id: string) {
    this.selectedGameId = id;
    this.selectedGame.emit(this.selectedGameId);
  }
}
