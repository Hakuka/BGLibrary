import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CopiesDetailsComponent } from './game-view/copies-details';
import { GameDetailsComponent } from './game-view/game-details';
import { GamesComponent } from './left-menu/games';

@NgModule({
  declarations: [GamesComponent, GameDetailsComponent, CopiesDetailsComponent],
  exports: [GamesComponent, GameDetailsComponent, CopiesDetailsComponent],
  imports: [FormsModule],
})
export class GamesModule {}
