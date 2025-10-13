import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Copy } from '../../shared/models/copy.model';
import { Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'edit-item',
  imports: [FormsModule],
  templateUrl: './edit-item.html',
  styleUrl: './edit-item.css',
})
export class EditItemComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) editTypeDisplay: string | undefined;
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);
  game: Game | undefined;
  games = this.gamesService.getAllGames();
  copies = this.copiesService.getAllCopies();
  errorMessage = '';
  updateCopy: Copy = {
    id: '',
    responsiblePerson: '',
    comment: '',
    gameId: '',
    weight: 0,
    borrowed: 'N',
  };
  updateGame: Game = {
    artist: '',
    comment: '',
    designer: '',
    id: '',
    minAge: 0,
    name: '',
    numberOfPlayers: '',
    playingTime: '',
    shortDescription: '',
    weight: 0,
  };

  onCancel() {
    this.close.emit();
  }
  onCopySelect(copyId: string) {
    this.updateCopy = { ...this.copiesService.getCopyInfo(copyId) };
  }
  onGameSelect(gameId: string) {
    this.updateGame = { ...this.gamesService.getGameInfo(gameId) };
  }
  onSubmit() {
    if (this.editTypeDisplay === 'C') {
      this.copiesService.updateCopy(this.updateCopy);
    } else if (this.editTypeDisplay === 'G') {
      this.gamesService.updateGame(this.updateGame);
    }
    this.close.emit();
  }
}
