import { Component, Input } from '@angular/core';
import { type Game } from '../../../shared/models/game.model';
@Component({
  selector: 'game-details',
  imports: [],
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
})
export class GameDetails {
  @Input({ required: true }) selectedGame: Game | undefined;
}
