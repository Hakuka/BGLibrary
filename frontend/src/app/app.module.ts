import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BorrowedModule } from './borrowed/borrowed.module';
import { MenageModule } from './menage/menage.module';

import { AppComponent } from './app';
import { GamesModule } from './games/games.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [HeaderModule, MenageModule, FormsModule, BrowserModule, BorrowedModule, GamesModule],
})
export class AppModule {}
