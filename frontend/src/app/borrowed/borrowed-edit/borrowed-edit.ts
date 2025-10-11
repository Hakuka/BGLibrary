import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { type Copy } from '../../shared/models/copy.model';
import { type Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'borrowed-edit',
  imports: [FormsModule],
  templateUrl: './borrowed-edit.html',
  styleUrl: './borrowed-edit.css',
})
export class BorrowedEditComponent {
  private copiesService = inject(CopiesService);
  private gamesService = inject(GamesService);
  displayedCopy!: Copy;
  editedDisplayedCopy!: Copy;
  selectedGame?: Game;
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) set copyId(value: string) {
    this.displayedCopy = this.copiesService.getCopyInfo(value);
    this.editedDisplayedCopy = { ...this.displayedCopy };
    this.selectedGame = this.gamesService.selectedGame(this.displayedCopy.gameId);
  }

  onCancel() {
    this.close.emit();
    this.editedDisplayedCopy = { ...this.displayedCopy };
  }

  onSubmit() {
    this.copiesService.borrowCopy({
      id: this.displayedCopy.id,
      gameId: this.displayedCopy.gameId,
      weight: this.editedDisplayedCopy.weight!,
      comment: this.editedDisplayedCopy.comment,
      borrowed: 'Y',
      responsiblePerson: this.editedDisplayedCopy.responsiblePerson,
    });
    this.close.emit();
  }
}
