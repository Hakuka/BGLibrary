import { Component, Input } from '@angular/core';
import { dummy_copies } from '../../../assets/dummy-copies';
import { type Game } from '../../shared/models/game.model';

@Component({
  selector: 'copies-details',
  imports: [],
  templateUrl: './copies-details.html',
  styleUrl: './copies-details.css',
})
export class CopiesDetails {
  @Input({ required: true }) selectedGame: Game | undefined;
  listOfCopies = dummy_copies;

  get selectedGameCopies() {
    return this.listOfCopies
      .filter((copy) => copy.gameId === this.selectedGame?.id)
      .sort((a, b) => a.borrowed.localeCompare(b.borrowed));
  }
}
