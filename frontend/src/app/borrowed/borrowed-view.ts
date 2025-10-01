import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopiesService } from '../shared/services/copies.service';
import { GamesService } from '../shared/services/games.service';

@Component({
  selector: 'borrowed-view',
  imports: [FormsModule],
  templateUrl: './borrowed-view.html',
  styleUrl: './borrowed-view.css',
})
export class BorrowedViewComponent {
  constructor(private copiesService: CopiesService) {}
  private gamesService = inject(GamesService);
  searchGame = '';
  searchPerson = '';

  get filteredCopies() {
    const termGame = this.searchGame.trim().toLowerCase();
    const termPerson = this.searchPerson.trim().toLowerCase();

    return this.copiesService.getAllCopies().filter((copy) => {
      if (copy.borrowed !== 'Y') return false;

      const game = this.gamesService.getAllGames().find((g) => g.id === copy.gameId);
      if (!game) return false;

      const matchesGame = !termGame || game.name.toLowerCase().includes(termGame);
      const matchesPerson =
        !termPerson || copy.responsiblePerson?.toLowerCase().includes(termPerson);

      return matchesGame && matchesPerson;
    });
  }

  gameNameById(gameId: string): string {
    const game = this.gamesService.getAllGames().find((g) => g.id === gameId);
    return game ? game.name : '(unknown)';
  }
}
