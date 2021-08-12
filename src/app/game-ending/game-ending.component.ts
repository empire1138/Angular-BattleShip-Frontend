import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinglePlayerServiceService } from '../service/single-player/single-player-service.service';

@Component({
  selector: 'app-game-ending',
  templateUrl: './game-ending.component.html',
  styleUrls: ['./game-ending.component.css']
})
export class GameEndingComponent implements OnInit {

  winningPlayer!: string;
  hasWiningPlayer: boolean = false; 

  constructor(
    private router:Router,
    private singlePlayerService: SinglePlayerServiceService
    )  { }

  ngOnInit(): void {
    this.getWinningInfo(); 
    this.emptyCheck(); 
  }

  emptyCheck(){
    if (!this.hasWiningPlayer){
      this.router.navigate(['']);
    }
  }

  getWinningInfo(){
    this.winningPlayer = this.singlePlayerService.returnWinningPlayer();
    this.hasWiningPlayer = this.singlePlayerService.returnHasWinningPlayer();

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
