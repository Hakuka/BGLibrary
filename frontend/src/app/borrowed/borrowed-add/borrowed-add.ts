import { Component, EventEmitter, Output, inject } from '@angular/core';

import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'borrowed-add',
  templateUrl: './borrowed-add.html',
  styleUrl: './borrowed-add.css',
  standalone: false,
})
export class BorrowedAddComponent {
  @Output() close = new EventEmitter<void>();
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);

  enteredGame!: string;
  enteredCopy?: string;
  enteredWeight?: number | null;
  enteredResponsiblePerson?: string;
  enteredComment?: string;

  games = this.gamesService.getAllGames();
  copies = this.copiesService.getAllCopies();

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.enteredGame || !this.enteredCopy || this.enteredWeight === undefined) {
      //TODO: add banner error handling
      return;
    }
    this.copiesService.updateCopy({
      id: this.enteredCopy,
      gameId: this.enteredGame,
      weight: this.enteredWeight!,
      comment: this.enteredComment,
      borrowed: 'Y',
      responsiblePerson: this.enteredResponsiblePerson,
    });
    this.close.emit();
  }

  onGameChange() {
    this.enteredCopy = undefined;
    this.enteredComment = undefined;
    this.enteredWeight = undefined;
  }

  onCopyChange(copyId: string) {
    const copyInfo = this.copies.find((c) => c.id === copyId);
    if (copyInfo) {
      this.enteredComment = copyInfo.comment;
      this.enteredWeight = copyInfo.weight;
    }
  }
}
