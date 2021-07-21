import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'; 
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket!: Socket;


  constructor() { }

  setupSocketConnection(){
    this.socket = io('http://localhost:3000')
  }
  getPlayerNumber(){

  }
  playerConnection(){

  }
  enemyReady(){

  }
  checkPLayers(){

  }
  shotFired(shotFired: number){
    this.socket.emit('fire', shotFired);
  }

  timeOut(){

  }
  shotFiredReceived(){

  }
  playerConnectedOrDisconnected(){

  }
  
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }}

}
