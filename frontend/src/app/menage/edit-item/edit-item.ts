import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonGroup } from '../../shared/button-group/button-group';
import { ButtonComponent } from '../../shared/button/button';
import { ControlComponent } from '../../shared/control/control';
import { ModalComponent } from '../../shared/modal/modal';
import { Copy } from '../../shared/models/copy.model';
import { Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'app-edit-item',
  imports: [FormsModule, ModalComponent, ControlComponent, ButtonComponent, ButtonGroup],
  templateUrl: './edit-item.html',
  styleUrl: './edit-item.css',
})
export class EditItemComponent {
  @Output() closed = new EventEmitter<void>();
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

  onCancel(): void {
    this.closed.emit();
  }
  onCopySelect(copyId: string): void {
    this.updateCopy = { ...this.copiesService.getCopyInfo(copyId) };
  }
  onGameSelect(gameId: string): void {
    this.updateGame = { ...this.gamesService.getGameInfo(gameId) };
  }
  onSubmit(): void {
    if (this.editTypeDisplay === 'C') {
      if (this.updateCopy.weight == null) {
        return;
      }
      this.copiesService.updateCopy(this.updateCopy);
    } else if (this.editTypeDisplay === 'G') {
      this.gamesService.updateGame({
        ...this.updateGame,
        minAge: this.updateGame.minAge ?? undefined,
        weight: this.updateGame.weight ?? undefined,
      });
    }
    this.closed.emit();
  }
}
