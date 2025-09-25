import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummy_copies } from '../../assets/dummy-copies';
import { dummy_games } from '../../assets/dummy-games';

@Component({
  selector: 'borrowed-view',
  imports: [FormsModule],
  templateUrl: './borrowed-view.html',
  styleUrl: './borrowed-view.css',
})
export class BorrowedView {
  searchGame = '';
  searchPerson = '';
  listOfCopies = dummy_copies;
  listOfGames = dummy_games;

  get filteredCopies() {
    const termGame = this.searchGame.trim().toLowerCase();
    const termPerson = this.searchPerson.trim().toLowerCase();

    return this.listOfCopies.filter((copy) => {
      if (copy.borrowed !== 'Y') return false;

      const game = this.listOfGames.find((g) => g.id === copy.gameId);
      if (!game) return false;

      const matchesGame = !termGame || game.name.toLowerCase().includes(termGame);
      const matchesPerson =
        !termPerson || copy.responsiblePerson?.toLowerCase().includes(termPerson);

      return matchesGame && matchesPerson;
    });
  }

  gameNameById(gameId: string): string {
    const game = this.listOfGames.find((g) => g.id === gameId);
    return game ? game.name : '(unknown)';
  }
}
