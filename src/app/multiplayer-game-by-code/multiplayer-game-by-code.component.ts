import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from '../service/socketIO/socketio.service';

@Component({
  selector: 'app-multiplayer-game-by-code',
  templateUrl: './multiplayer-game-by-code.component.html',
  styleUrls: ['./multiplayer-game-by-code.component.css']
})
export class MultiplayerGameByCodeComponent implements OnInit {

  gameId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

}
