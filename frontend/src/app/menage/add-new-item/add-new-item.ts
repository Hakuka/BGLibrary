import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonGroup } from '../../shared/button-group/button-group';
import { ButtonComponent } from '../../shared/button/button';
import { ControlComponent } from '../../shared/control/control';
import { ModalComponent } from '../../shared/modal/modal';
import { Copy } from '../../shared/models/copy.model';
import { Game } from '../../shared/models/game.model';
import { CopiesService } from '../../shared/services/copies.service';
import { GamesService } from '../../shared/services/games.service';
@Component({
  selector: 'app-add-new-item',
  imports: [FormsModule, ModalComponent, ControlComponent, ButtonComponent, ButtonGroup],
  templateUrl: './add-new-item.html',
  styleUrl: './add-new-item.css',
})
export class AddNewItemComponent {
  @Output() closed = new EventEmitter<void>();
  @Input({ required: true }) addTypeDisplay: string | undefined;
  private gamesService = inject(GamesService);
  private copiesService = inject(CopiesService);
  game: Game | undefined;
  games = this.gamesService.getAllGames();
  errorMessage = '';
  newCopy: Copy = {
    id: '',
    responsiblePerson: '',
    comment: '',
    gameId: '',
    weight: undefined,
    borrowed: 'N',
  };
  newGame: Game = {
    artist: '',
    comment: '',
    designer: '',
    id: '',
    minAge: undefined,
    name: '',
    numberOfPlayers: '',
    playingTime: '',
    shortDescription: '',
    weight: undefined,
  };

  onCancel(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.addTypeDisplay === 'C') {
      if (this.newCopy.weight == null) {
        return;
      }

      const result = this.copiesService.addCopy(this.newCopy);
      if (result === false) {
        this.errorMessage = 'This ID already exist in the system';
        return;
      }
    } else if (this.addTypeDisplay === 'G') {
      if (this.newGame.minAge == null || this.newGame.weight == null) {
        return;
      }

      const result = this.gamesService.addGame(this.newGame);
      if (result === false) {
        this.errorMessage = 'This ID already exist in the system';
        return;
      }
    }
    this.closed.emit();
  }
}
