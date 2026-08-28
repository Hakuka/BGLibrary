import { Component, inject } from '@angular/core';
import { type Game } from '../shared/models/game.model';
import { GamesService } from '../shared/services/games.service';
import { CopiesDetailsComponent } from './game-view/copies-details';
import { GameDetailsComponent } from './game-view/game-details';
import { GamesMenuComponent } from './left-menu/games-menu';

@Component({
  selector: 'app-games-view',
  imports: [GamesMenuComponent, GameDetailsComponent, CopiesDetailsComponent],
  templateUrl: './games-view.html',
  styleUrl: './games-view.css',
})
export class GamesViewComponent {
  private readonly gamesService = inject(GamesService);
  selectedGame?: Game;

  onSelectedGame(id: string): void {
    this.selectedGame = this.gamesService.selectedGameById(id);
  }
}
