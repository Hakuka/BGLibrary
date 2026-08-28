import { Component, Input, inject } from '@angular/core';
import { type Copy } from '../../shared/models/copy.model';
import { type Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';

@Component({
  selector: 'app-copies-details',
  imports: [],
  templateUrl: './copies-details.html',
  styleUrl: './copies-details.css',
})
export class CopiesDetailsComponent {
  private copiesService = inject(CopiesService);
  selectedGameCopies: Copy[] = [];

  @Input({ required: true }) set selectedGame(game: Game | undefined) {
    this.selectedGameCopies = this.copiesService
      .getAllCopies()
      .filter((copy) => copy.gameId === game?.id)
      .sort((a, b) => a.borrowed.localeCompare(b.borrowed));
  }
}
