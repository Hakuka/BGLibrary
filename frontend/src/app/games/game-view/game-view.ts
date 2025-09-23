import { Component, Input } from '@angular/core';
import { type Game } from '../../shared/models/game.model';

@Component({
  selector: 'game-view',
  imports: [],
  templateUrl: './game-view.html',
  styleUrl: './game-view.css',
})
export class GameView {
  @Input({ required: true }) selectedGame: Game | undefined;
}
