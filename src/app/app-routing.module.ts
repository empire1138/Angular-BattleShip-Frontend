import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartPageComponent } from './start-page/start-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameEndingComponent } from './game-ending/game-ending.component';
import { MultiplayerGameLobbyComponent } from './multiplayer-game-lobby/multiplayer-game-lobby.component';
import { MultiplayerGameByCodeComponent } from './multiplayer-game-by-code/multiplayer-game-by-code.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'single-player', component: SinglePlayerComponent },
  { path: 'multiplayer', component: MultiplayerComponent},
  //{ path: 'multiplayer-GameLobby', component: MultiplayerGameLobbyComponent},
  { path: 'multiplayer-GameByCode/:id' , component: MultiplayerGameByCodeComponent}, 
  { path: 'game-ending', component: GameEndingComponent},
  { path: '**', component: PageNotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
