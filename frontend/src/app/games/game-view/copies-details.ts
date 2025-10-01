import { Component, Input, inject } from '@angular/core';
import { type Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';

@Component({
  selector: 'copies-details',
  imports: [],
  templateUrl: './copies-details.html',
  styleUrl: './copies-details.css',
})
export class CopiesDetailsComponent {
  private copiesService = inject(CopiesService);
  @Input({ required: true }) selectedGame: Game | undefined;

  get selectedGameCopies() {
    return this.copiesService
      .getAllCopies()
      .filter((copy) => copy.gameId === this.selectedGame?.id)
      .sort((a, b) => a.borrowed.localeCompare(b.borrowed));
  }
}
