import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket!: Socket;
  roomNumber!: number;


  constructor() {

  }
  //Step 1
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('player-number')
  }
  //Step 2-A 
  getPlayerNumber(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('player-number', number => {
        console.log(number, 'PlayerNumber')
        observer.next(number);
      })
    })
  }
  // New Step Will add Number later. this gets the room number for current game
  getRoomReceived(){
    return new Observable((observer) => {
      this.socket.on('room-number', (roomNum: number) => {
        console.log(roomNum,'roomNum')
        this.roomNumber = roomNum; 
        observer.next(roomNum); 
      })
    } )
  }
  //Step 2-B
  checkPlayersEmit() {
    this.socket.emit('check-players', this.roomNumber);
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
        console.log(players, 'CheckPLayersReceived')
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
    this.socket.emit('fire-reply', squareClassList, this.roomNumber);
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
    this.socket.emit('player-ready' ,this.roomNumber);
  }
  //Step 10 This is fired after each click from the user 
  shotFiredEmit(shotFired: number) {
    this.socket.emit('fire', shotFired,this.roomNumber);
    console.log('Real Shot Sent');
  }


  

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
