import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Copy } from '../shared/models/copy.model';
import { CopiesService } from '../shared/services/copies.service';
import { GamesService } from '../shared/services/games.service';
import { BorrowedAddComponent } from './borrowed-add/borrowed-add';
import { BorrowedEditComponent } from './borrowed-edit/borrowed-edit';

interface BorrowedCopyViewModel extends Copy {
  gameName: string;
}

@Component({
  selector: 'app-borrowed-view',
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
  filteredCopies: BorrowedCopyViewModel[] = [];
  private borrowedCopies: BorrowedCopyViewModel[] = [];

  constructor() {
    this.refreshCopies();
  }

  onGameSearchChange(searchValue: string): void {
    this.searchGame = searchValue;
    this.applyFilters();
  }

  onPersonSearchChange(searchValue: string): void {
    this.searchPerson = searchValue;
    this.applyFilters();
  }

  onStartBorrowingGame(): void {
    this.isBorrowingGame = true;
  }

  onCloseBorrowingGame(): void {
    this.isBorrowingGame = false;
    this.refreshCopies();
  }

  onEditBorrowedGame(copyId: string): void {
    this.editingCopyId = copyId;
    this.isEditingGame = true;
  }

  onCloseEditBorrowedGame(): void {
    this.isEditingGame = false;
    this.editingCopyId = '';
    this.refreshCopies();
  }

  returnBorrowedGame(copyId: string): void {
    this.copiesService.updateCopy({
      id: copyId,
      borrowed: 'N',
      responsiblePerson: '',
    });
    this.refreshCopies();
  }

  private refreshCopies(): void {
    const gamesById = new Map(this.gamesService.getAllGames().map((game) => [game.id, game]));
    const borrowedCopies: BorrowedCopyViewModel[] = [];

    for (const copy of this.copiesService.getAllBorrowedCopies()) {
      const game = gamesById.get(copy.gameId);
      if (game) {
        borrowedCopies.push({ ...copy, gameName: game.name });
      }
    }

    this.borrowedCopies = borrowedCopies;
    this.applyFilters();
  }

  private applyFilters(): void {
    const gameSearchTerm = this.searchGame.trim().toLowerCase();
    const personSearchTerm = this.searchPerson.trim().toLowerCase();

    this.filteredCopies = this.borrowedCopies.filter((copy) => {
      const matchesGame =
        gameSearchTerm.length === 0 || copy.gameName.toLowerCase().includes(gameSearchTerm);
      const responsiblePerson = copy.responsiblePerson?.toLowerCase() ?? '';
      const matchesPerson =
        personSearchTerm.length === 0 || responsiblePerson.includes(personSearchTerm);

      return matchesGame && matchesPerson;
    });
  }
}
