import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, Directive, ElementRef, OnInit, Query, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"; 

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit, AfterViewInit {

  @ViewChild("userGrid") userGrid!: ElementRef;
  @ViewChild("computerGrid") computerGrid!: ElementRef;
  @ViewChild('cdkBoard',{read:ElementRef,static:false}) boardElement!: ElementRef;

  width = 10;
  userSquares: any = []
  computerSquares: any = []
  shipArray = [
    {name: 'destroyer',directions: [[0, 1],[0, this.width]]},
    {name: 'submarine',directions: [[0, 1, 2],[0, this.width, this.width * 2]]},
    {name: 'cruiser',directions: [[0, 1, 2],[0, this.width, this.width * 2]]},
    {name: 'battleship',directions: [[0, 1, 2, 3],[0, this.width, this.width * 2, this.width * 3]]},
    {name: 'carrier',directions: [[0, 1, 2, 3, 4],[0, this.width, this.width * 2, this.width * 3, this.width * 4]]},
  ]


  ngAfterViewInit() {

    console.log(this.userGrid.nativeElement.querySelector('.grid-user'), 'check1');
    console.log(this.renderer.selectRootElement(this.userGrid), 'checkTwo');

    this.createBoard(this.userGrid, this.userSquares);
    this.createBoard(this.computerGrid, this.computerSquares);
  }

  constructor(private renderer: Renderer2, private he: ElementRef) { }

  ngOnInit(): void {



    console.log(this.he.nativeElement.querySelector('.grid-user'), 'CheckThree');
    console.log(this.renderer.selectRootElement('.grid-user'), 'CheckFour');
  }

  //Calling the functions

  //Making the functions for the game
  createBoard(grid: any, squares: any) {
    console.log(grid, 'CheckFive');
    console.log(squares, 'checkSix');
    for (let i = 0; i < (this.width * this.width); i++) {
      let square = this.renderer.createElement('div');
      square.dataset.id = i;
      // grid.appendChild(square)
      this.renderer.appendChild(grid.nativeElement, square);
      squares.push(square);
      //this.he.nativeElement.push(square)
    }
  }


}
