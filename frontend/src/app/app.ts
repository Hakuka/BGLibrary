import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BorrowedViewComponent } from './borrowed/borrowed-view';
import { CopiesDetailsComponent } from './games/game-view/copies-details';
import { GameDetailsComponent } from './games/game-view/game-details';
import { GamesComponent } from './games/left-menu/games';
import { HeaderComponent } from './header/header';
import { MenuComponent } from './header/menu';
import { MenageComponent } from './menage/menage';
import { Game } from './shared/models/game.model';
import { GamesService } from './shared/services/games.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MenuComponent,
    GamesComponent,
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
    return (this.currentGame = this.gamesService.selectedGame(id));
  }

  onSelectMenu(option: string) {
    this.selectedMenuOption = option;
  }
}
