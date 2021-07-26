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

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.emit('player-number')
    console.log('fired');
  }
  getPlayerNumber(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('player-number', number => {
        console.log(number, 'NumberSocket')
        observer.next(number);
      })
    })
  }
  playerConnectionReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('player-connection', (num:any) => {
        console.log('PlayConnections')
        observer.next(num);
      })
    })
  }
  playerReadyEmit(){
    this.socket.emit('player-ready'); 
  }
  enemyReady() {
    return new Observable((observer) => {
      this.socket.on('enemy-ready', (num:any) => {
        observer.next(num);
      })
    })
  }
  checkPlayersEmit() {
    this.socket.emit('check-players');
    console.log('fired@2')
  }
  checkPlayersReceived() {
    return new Observable((observer) => {
      this.socket.on('check-players', (players: any) => {
        observer.next(players); 
      }) 
    })
  }
  shotFiredEmit(shotFired: number) {
    this.socket.emit('fire', shotFired);
    console.log('Real Shot Sent');
  }
  shotFiredReplyEmit(squareClassList:any){
    this.socket.emit('fire-reply', squareClassList);     
  }
  shotFiredEmitReceived() {
    return new Observable((observer) =>{
      this.socket.on('fire', (id:any) => {
        observer.next(id); 
      })
    })
  }
  shotFiredReplyReceived(){
    return new Observable( (observer) => {
      this.socket.on('fire-reply' , (classList: any) => {
        observer.next(classList); 
      })
    })
  }

  timeOut() {
    return new Observable((observer) => {
      this.socket.on('timeout', () => {
        observer.next();
      })
    })
  }
  shotFiredReceived() {

  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
