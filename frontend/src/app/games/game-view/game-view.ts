import { Component, Input } from '@angular/core';
import { type Game } from '../../shared/models/game.model';
import { CopiesDetails } from './copies-details/copies-details';
import { GameDetails } from './game-details/game-details';

@Component({
  selector: 'game-view',
  imports: [GameDetails, CopiesDetails],
  templateUrl: './game-view.html',
  styleUrl: './game-view.css',
})
export class GameView {
  @Input({ required: true }) selectedGame: Game | undefined;
}
