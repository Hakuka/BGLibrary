import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Copy } from '../../shared/models/copy.model';
import { Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.html',
  styleUrl: './edit-item.css',
  standalone: false,
})
export class EditItemComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) editTypeDisplay!: string;
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);
  game: Game | undefined;
  games = this.gamesService.getAllGames();
  copies = this.copiesService.getAllCopies();
  updateCopy: Pick<Copy, 'id' | 'comment' | 'weight'> = {
    id: '',
    comment: '',
    weight: undefined,
  };
  updateGame: Pick<
    Game,
    | 'id'
    | 'artist'
    | 'comment'
    | 'designer'
    | 'minAge'
    | 'numberOfPlayers'
    | 'playingTime'
    | 'shortDescription'
    | 'weight'
  > = {
    id: '',
    artist: '',
    comment: '',
    designer: '',
    minAge: undefined,
    numberOfPlayers: '',
    playingTime: '',
    shortDescription: '',
    weight: undefined,
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
