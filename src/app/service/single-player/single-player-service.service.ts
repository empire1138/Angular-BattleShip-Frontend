import { Injectable } from '@angular/core';
import { SinglePlayerComponent } from 'src/app/single-player/single-player.component';


@Injectable({
  providedIn: 'root'
})
export class SinglePlayerServiceService {

  winningPlayer!: string;
  hasWinningPLayer!: boolean;
  


   constructor() { }

  retrieveWinningInfo(winingPlayer: string, hasWinningPLayer: boolean){
    this.winningPlayer = winingPlayer;
    this.hasWinningPLayer = hasWinningPLayer
  }
  
  returnWinningPlayer(){
    return this.winningPlayer; 
  }

  returnHasWinningPlayer(){
    return this.hasWinningPLayer;
  }

}
