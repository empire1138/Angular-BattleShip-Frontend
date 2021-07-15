import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { WinPageComponent } from './win-page/win-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameEndingComponent } from './game-ending/game-ending.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    WinPageComponent,
    PageNotFoundComponent,
    SinglePlayerComponent,
    MultiplayerComponent,
    GameEndingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
