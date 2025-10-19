import { Component, Input } from '@angular/core';
import { type Game } from '../../shared/models/game.model';
@Component({
  selector: 'game-details',
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
  standalone: false,
})
export class GameDetailsComponent {
  @Input({ required: true }) selectedGame: Game | undefined;
}
