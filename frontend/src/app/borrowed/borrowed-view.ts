import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopiesService } from '../shared/services/copies.service';
import { GamesService } from '../shared/services/games.service';
import { BorrowedAddComponent } from './borrowed-add/borrowed-add';
import { BorrowedEditComponent } from './borrowed-edit/borrowed-edit';

@Component({
  selector: 'borrowed-view',
  imports: [FormsModule, BorrowedAddComponent, BorrowedEditComponent],
  templateUrl: './borrowed-view.html',
  styleUrl: './borrowed-view.css',
})
export class BorrowedViewComponent {
  private copiesService = inject(CopiesService);
  private gamesService = inject(GamesService);
  isBorrowingGame = false;
  isEditingGame = false;
  searchGame: string = '';
  searchPerson: string = '';
  editingCopyId: string = '';

  get filteredCopies() {
    const termGame = this.searchGame.trim().toLowerCase();
    const termPerson = this.searchPerson.trim().toLowerCase();

    const games = this.gamesService.getAllGames();
    const gameById = new Map(games.map((g) => [g.id, g] as const));

    return this.copiesService.getAllBorrowedCopies().filter((copy) => {
      const game = gameById.get(copy.gameId);
      if (!game) return false;

      const matchesGame = !termGame || game.name.toLowerCase().includes(termGame);
      const person = copy.responsiblePerson?.toLowerCase() ?? '';
      const matchesPerson = !termPerson || person.includes(termPerson);

      return matchesGame && matchesPerson;
    });
  }

  gameNameById(gameId: string): string {
    const game = this.gamesService.getAllGames().find((g) => g.id === gameId);
    return game ? game.name : '(unknown)';
  }
  onStartBorrowingGame() {
    this.isBorrowingGame = true;
  }

  onCloseBorrowingGame() {
    this.isBorrowingGame = false;
  }
  onEditBorrowedGame(copyId: string) {
    this.editingCopyId = copyId;
    this.isEditingGame = true;
  }

  onCloseEditBorrowedGame() {
    this.isEditingGame = false;
  }

  returnBorrowedGame(copyId: string) {
    const tempCopy = this.copiesService.getCopyInfo(copyId);
    this.copiesService.updateCopy({
      id: tempCopy.id,
      gameId: tempCopy.gameId,
      weight: tempCopy.weight!,
      comment: tempCopy.comment,
      borrowed: 'N',
      responsiblePerson: '',
    });
  }
}
