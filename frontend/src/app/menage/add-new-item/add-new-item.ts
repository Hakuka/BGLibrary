import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Copy } from '../../shared/models/copy.model';
import { Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'add-new-item',
  imports: [FormsModule],
  templateUrl: './add-new-item.html',
  styleUrl: './add-new-item.css',
})
export class AddNewItemComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) addTypeDisplay: string | undefined;
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);
  game: Game | undefined;
  games = this.gamesService.getAllGames();
  errorMessage = '';
  newCopy: Copy = {
    id: '',
    responsiblePerson: '',
    comment: '',
    gameId: '',
    weight: undefined,
    borrowed: 'N',
  };
  newGame: Game = {
    artist: '',
    comment: '',
    designer: '',
    id: '',
    minAge: undefined,
    name: '',
    numberOfPlayers: '',
    playingTime: '',
    shortDescription: '',
    weight: undefined,
  };

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (this.addTypeDisplay === 'C') {
      const result = this.copiesService.addCopy(this.newCopy);
      if (result === false) {
        this.errorMessage = 'This ID already exist in the system';
        return;
      }
    } else if (this.addTypeDisplay === 'G') {
      const result = this.gamesService.addGame(this.newGame);
      if (result === false) {
        this.errorMessage = 'This ID already exist in the system';
        return;
      }
    }
    this.close.emit();
  }
}
