import { Component } from '@angular/core';
import { BorrowedViewComponent } from './borrowed/borrowed-view';
import { GamesViewComponent } from './games/games-view';
import { HeaderMenuComponent } from './header/header';
import { MenageComponent } from './menage/menage';

@Component({
  selector: 'app-root',
  imports: [HeaderMenuComponent, GamesViewComponent, BorrowedViewComponent, MenageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedMenuOption?: string;
}
