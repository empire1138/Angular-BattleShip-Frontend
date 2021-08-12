import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameEndingComponent } from './game-ending/game-ending.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MultiplayerGameLobbyComponent } from './multiplayer-game-lobby/multiplayer-game-lobby.component';
import { MultiplayerGameByCodeComponent } from './multiplayer-game-by-code/multiplayer-game-by-code.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    PageNotFoundComponent,
    SinglePlayerComponent,
    MultiplayerComponent,
    GameEndingComponent,
    MultiplayerGameLobbyComponent,
    MultiplayerGameByCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
