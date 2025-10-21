import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BorrowedViewComponent } from './borrowed/borrowed-view';
import { CopiesDetailsComponent } from './games/game-view/copies-details';
import { GameDetailsComponent } from './games/game-view/game-details';
import { GamesMenuComponent } from './games/left-menu/games-menu';
import { HeaderMenuComponent } from './header/header';
import { MenageComponent } from './menage/menage';
import { Game } from './shared/models/game.model';
import { GamesService } from './shared/services/games.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderMenuComponent,
    GamesMenuComponent,
    FormsModule,
    BorrowedViewComponent,
    GameDetailsComponent,
    CopiesDetailsComponent,
    MenageComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
