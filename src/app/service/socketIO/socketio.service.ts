import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: Socket = io('http://localhost:3000');


  constructor() {

  }

  setupSocketConnection() {

  }
  getPlayerNumber() {

    return new Observable((observer) => {
      this.socket.on('players-num', number => {
        observer.next(number);
      })
    })
  }
  playerConnectionReceived() {
    return new Observable((observer) => {
      this.socket.on('player-connection', num => {
        observer.next(num);
      })
    })
  }
  enemyReady() {

  }
  checkPLayersEmit() {
    this.socket.emit('check-players');
  }
  checkPlayersReceived() {

  }
  shotFiredEmit(shotFired: number) {
    this.socket.emit('fire', shotFired);
  }
  shotFiredEmitReceived() {

  }

  timeOut() {

  }
  shotFiredReceived() {

  }
  playerConnectedOrDisconnected() {

  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
