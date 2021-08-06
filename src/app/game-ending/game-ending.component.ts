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
    

}
