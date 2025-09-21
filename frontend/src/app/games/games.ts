import { Component, EventEmitter, Input, Output } from '@angular/core';

import { type Game } from './game.model';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games {
  @Input({ required: true }) game!: Game;
  @Output() selectedGame = new EventEmitter<string>();

  onSelectGame() {
    this.selectedGame.emit(this.game.id);
  }
}
