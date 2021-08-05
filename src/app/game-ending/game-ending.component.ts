import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-ending',
  templateUrl: './game-ending.component.html',
  styleUrls: ['./game-ending.component.css']
})
export class GameEndingComponent implements OnInit {

  winningPlayer!: string;
  hasWiningPlayer: boolean = false; 

  constructor(private router:Router)  { }

  ngOnInit(): void {
  }

  emptycheck(){
    if (!this.hasWiningPlayer){
      this.router.navigate(['']);
    }
  }

}
