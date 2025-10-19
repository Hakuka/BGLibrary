import { Component, inject } from '@angular/core';
import { Game } from './shared/models/game.model';
import { GamesService } from './shared/services/games.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  currentGame: Game | undefined;
  selectedMenuOption?: string;
  private gamesService = inject(GamesService);

  onSelectedGame(id: string) {
    return (this.currentGame = this.gamesService.selectedGameById(id));
  }

  onSelectMenu(option: string) {
    this.selectedMenuOption = option;
  }
}
