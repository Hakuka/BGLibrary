import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'borrowed-add',
  imports: [FormsModule],
  templateUrl: './borrowed-add.html',
  styleUrl: './borrowed-add.css',
})
export class BorrowedAddComponent {
  @Output() close = new EventEmitter<void>();
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);

  enteredGame!: string;
  enteredCopy!: string;
  enteredResponsiblePerson: string = '';
  enteredWeight?: number;
  enteredComment: string = '';

  games = this.gamesService.getAllGames();
  copies = this.copiesService.getAllCopies();

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
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
    this.enteredCopy = '';
    this.enteredComment = '';
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
