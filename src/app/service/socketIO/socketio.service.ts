import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket!: Socket;


  constructor() {

  }
  //Step 1
  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.emit('player-number')
  }
  //Step 2-A 
  getPlayerNumber(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('player-number', number => {
        console.log(number, 'NumberSocket')
        observer.next(number);
      })
    })
  }
  //Step 2-B
  checkPlayersEmit() {
    this.socket.emit('check-players');
    console.log('fired@2')
  }
  //Step 3
  playerConnectionReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('player-connection', (num: any) => {
        console.log('PlayConnections')
        observer.next(num);
      })
    })
  }
  // Step 4 
  enemyReady() {
    return new Observable((observer) => {
      this.socket.on('enemy-ready', (num: any) => {
        observer.next(num);
      })
    })
  }
  //Step 5 
  checkPlayersReceived() {
    return new Observable((observer) => {
      this.socket.on('check-players', (players: any) => {
        observer.next(players);
      })
    })
  }
  //Step 6 
  timeOut() {
    return new Observable((observer) => {
      this.socket.on('timeout', () => {
        observer.next();
      })
    })
  }
  //Step 7-A
  shotFiredEmitReceived() {
    return new Observable((observer) => {
      this.socket.on('fire', (id: any) => {
        observer.next(id);
      })
    })
  }
  //Step 7-B
  shotFiredReplyEmit(squareClassList: any) {
    this.socket.emit('fire-reply', squareClassList);
  }
  //Step 8
  shotFiredReplyReceived() {
    return new Observable((observer) => {
      this.socket.on('fire-reply', (classList: any) => {
        observer.next(classList);
      })
    })
  }
  //Step 9 This starts after the user clicks the Start button
playerReadyEmit() {
    this.socket.emit('player-ready');
  }
  //Step 10 This is fired after each click from the user 
  shotFiredEmit(shotFired: number) {
    this.socket.emit('fire', shotFired);
    console.log('Real Shot Sent');
  }


  

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
