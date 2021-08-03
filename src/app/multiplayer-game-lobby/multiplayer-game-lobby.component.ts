import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-multiplayer-game-lobby',
  templateUrl: './multiplayer-game-lobby.component.html',
  styleUrls: ['./multiplayer-game-lobby.component.css']
})
export class MultiplayerGameLobbyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

    startRandomGame(){
      this.router.navigate(['multiplayer'])
    }

    startGameByCode(){
      const uuid = uuidv4();
      this.router.navigate(['multiplayer-GameByCode/',uuid]);
    }

    
}
