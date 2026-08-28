import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonGroup } from '../../shared/button-group/button-group';
import { ButtonComponent } from '../../shared/button/button';
import { ControlComponent } from '../../shared/control/control';
import { ModalComponent } from '../../shared/modal/modal';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-remove-item',
  imports: [FormsModule, ModalComponent, ControlComponent, ButtonComponent, ButtonGroup],
  templateUrl: './remove-item.html',
  styleUrl: './remove-item.css',
})
export class RemoveItemComponent {
  @Output() closed = new EventEmitter<void>();
  @Input({ required: true }) removeTypeDisplay!: string;
  private copiesService = inject(CopiesService);
  private gamesService = inject(GamesService);
  selectedItemId: string = '';
  copies = this.copiesService.getAllCopies();
  games = this.gamesService.getAllGames();

  onCancel(): void {
    this.selectedItemId = '';
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.removeTypeDisplay === 'C') {
      this.copiesService.removeCopyById(this.selectedItemId);
    } else if (this.removeTypeDisplay === 'G') {
      this.gamesService.removeGameById(this.selectedItemId);
      this.copiesService.removeCopyByGameId(this.selectedItemId);
    }
    this.selectedItemId = '';
    this.closed.emit();
  }
}
