import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'remove-item',
  templateUrl: './remove-item.html',
  styleUrl: './remove-item.css',
  standalone: false,
})
export class RemoveItemComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) removeTypeDisplay!: string;
  private copiesService = inject(CopiesService);
  private gamesService = inject(GamesService);
  selectedItemId: string = '';
  copies = this.copiesService.getAllCopies();
  games = this.gamesService.getAllGames();

  onCancel() {
    this.selectedItemId = '';
    this.close.emit();
  }

  onSubmit() {
    if (this.removeTypeDisplay === 'C') {
      this.copiesService.removeCopyById(this.selectedItemId);
    } else if (this.removeTypeDisplay === 'G') {
      this.gamesService.removeGameById(this.selectedItemId);
      this.copiesService.removeCopyByGameId(this.selectedItemId);
    }
    this.selectedItemId = '';
    this.close.emit();
  }
}
