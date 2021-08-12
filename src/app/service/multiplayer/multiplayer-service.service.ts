import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerServiceService {

  winningPlayer!: number;
  hasWinningPLayer!: boolean;
  currentPlayerNumberConverted!: number;
  


   constructor() { }

  retrieveWinningInfo(winingPlayer: number, hasWinningPLayer: boolean, currentPlayerNumberConverted: number){
    this.winningPlayer = winingPlayer;
    this.hasWinningPLayer = hasWinningPLayer
    this.currentPlayerNumberConverted = currentPlayerNumberConverted; 
  }
  
  returnWinningPlayer(){
    return this.winningPlayer; 
  }

  returnHasWinningPlayer(){
    return this.hasWinningPLayer;
  }
  returnPlayerNumberConverted(){
    return this.currentPlayerNumberConverted; 
  }
}
