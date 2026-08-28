import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonGroup } from '../../shared/button-group/button-group';
import { ButtonComponent } from '../../shared/button/button';
import { ControlComponent } from '../../shared/control/control';
import { ModalComponent } from '../../shared/modal/modal';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-borrowed-add',
  imports: [FormsModule, ControlComponent, ModalComponent, ButtonComponent, ButtonGroup],
  templateUrl: './borrowed-add.html',
  styleUrl: './borrowed-add.css',
})
export class BorrowedAddComponent {
  @Output() closed = new EventEmitter<void>();
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);

  enteredGame = '';
  enteredCopy = '';
  enteredWeight?: number | null;
  enteredResponsiblePerson?: string;
  enteredComment?: string;

  games = this.gamesService.getAllGames();
  copies = this.copiesService.getAllCopies();

  onCancel(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (!this.enteredGame || !this.enteredCopy || this.enteredWeight == null) {
      //TODO: add banner error handling
      return;
    }
    this.copiesService.updateCopy({
      id: this.enteredCopy,
      gameId: this.enteredGame,
      weight: this.enteredWeight,
      comment: this.enteredComment,
      borrowed: 'Y',
      responsiblePerson: this.enteredResponsiblePerson,
    });
    this.closed.emit();
  }

  onGameChange(): void {
    this.enteredCopy = '';
    this.enteredComment = undefined;
    this.enteredWeight = undefined;
  }

  onCopyChange(copyId: string): void {
    const copyInfo = this.copies.find((c) => c.id === copyId);
    if (copyInfo) {
      this.enteredComment = copyInfo.comment;
      this.enteredWeight = copyInfo.weight;
    }
  }
}
