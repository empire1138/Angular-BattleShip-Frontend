import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinglePlayerServiceService } from '../service/single-player/single-player-service.service';
import { MultiplayerServiceService } from '../service/multiplayer/multiplayer-service.service';

@Component({
  selector: 'app-game-ending',
  templateUrl: './game-ending.component.html',
  styleUrls: ['./game-ending.component.css']
})
export class GameEndingComponent implements OnInit {

  winningSinglePlayer!: string;
  hasWiningPlayer: boolean = false; 

  winningMultiPlayer!: number;
  currentMultiPlayer!: number; 

  constructor(
    private router:Router,
    private singlePlayerService: SinglePlayerServiceService,
    private multiPlayerService: MultiplayerServiceService
    )  { }

  ngOnInit(): void {
    this.getSinglePlayerWinningInfo(); 
    this.getMultiPlayerWinningInfo(); 
    this.emptyCheck(); 
  }

  emptyCheck(){
    if (!this.hasWiningPlayer){
      this.router.navigate(['']);
    }
  }

  getSinglePlayerWinningInfo(){
    this.winningSinglePlayer = this.singlePlayerService.returnWinningPlayer();
    this.hasWiningPlayer = this.singlePlayerService.returnHasWinningPlayer();

  }
  getMultiPlayerWinningInfo(){
    this.winningMultiPlayer = this.multiPlayerService.returnWinningPlayer();
    this.hasWiningPlayer = this.multiPlayerService.returnHasWinningPlayer();
    this.currentMultiPlayer = this.multiPlayerService.returnPlayerNumberConverted(); 
  }

  startMultiPlayer() {
    // switch to game lobby page then do the websocket calls
    this.router.navigate(['multiplayer-GameLobby']);
  }
  startSinglePlayer() {
    // switch to game lobby page then do the websocket calls
    this.router.navigate(['single-player']);
  }
  returnToStart() {
    // switch to game lobby page then do the websocket calls
    this.router.navigate(['']);
  }



    

}
