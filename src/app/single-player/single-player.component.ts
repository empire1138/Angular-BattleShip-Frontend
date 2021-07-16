import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, Directive, ElementRef, OnInit, Query, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit, AfterViewInit{

  @ViewChild("userGrid") userGrid!: ElementRef;
  @ViewChild("computerGrid") computerGrid!: ElementRef; 

  width = 10;
  userSquares:any = []
  computerSquares:any = []
 


  // userGrid = document.querySelector('.grid-user')
  
  // computerGrid = document.querySelector('.grid-computer')
  
  ngAfterViewInit() {

   console.log(this.userGrid.nativeElement.querySelector('.grid-user'),'check1');
    console.log(this.renderer.selectRootElement(this.userGrid), 'checkTwo');

    this.createBoard(this.userGrid, this.userSquares);
    this.createBoard(this.computerGrid, this.computerSquares);
  }

  constructor(private renderer:Renderer2, private he:ElementRef) { }

  ngOnInit(): void {
   


    console.log(this.he.nativeElement.querySelector('.grid-user'), 'CheckThree');
    console.log(this.renderer.selectRootElement('.grid-user'), 'CheckFour');
  }

  //Calling the functions

  //Making the functions for the game
  createBoard(grid: any, squares: any) {
    console.log(grid, 'CheckFive');
    console.log(squares, 'checkSix');
    for (let i = 0; i < (this.width* this.width); i++) {
      let square = this.renderer.createElement('div');
      square.dataset.id = i;
      // grid.appendChild(square)
      this.renderer.appendChild(grid.nativeElement, square);
      squares.push(square);
      //this.he.nativeElement.push(square)
    }
  }


}
