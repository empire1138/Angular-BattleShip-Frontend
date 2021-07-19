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
  //@ViewChild("destroyerContainer") destroyerContainer!: ElementRef; 

  width = 10;
  userSquares: any = []
  computerSquares: any = []
  isVertical: boolean = false;
  shipArray = [
    { name: 'destroyer', directions: [[0, 1], [0, this.width]] },
    { name: 'submarine', directions: [[0, 1, 2], [0, this.width, this.width * 2]] },
    { name: 'cruiser', directions: [[0, 1, 2], [0, this.width, this.width * 2]] },
    { name: 'battleship', directions: [[0, 1, 2, 3], [0, this.width, this.width * 2, this.width * 3]] },
    { name: 'carrier', directions: [[0, 1, 2, 3, 4], [0, this.width, this.width * 2, this.width * 3, this.width * 4]] },
  ]


  ngAfterViewInit() {
    this.createBoard(this.userGrid, this.userSquares);
    this.createBoard(this.computerGrid, this.computerSquares);
  }

  constructor(private renderer: Renderer2, private he: ElementRef) { }

  ngOnInit(): void {

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

  rotateShips() {
    this.isVertical = !this.isVertical;
  }

  startGame() {

  }

  //drag Events for the ships 
  onDragStart(event: DragEvent) {
    console.log(`starting`, event);
    console.log(event.target)
  }

  onDrag(event: DragEvent) {
    console.log('dragging', event);
  }

  onDragOver(event: DragEvent) {
    console.log('drag over', event);
    console.log(event.target)
  }

  onDragEnd(event: DragEvent) {
    console.log('drag end', event);
    
  }
  onDragLeave(event: DragEvent) {
    console.log('drag leave', event);
  }

  onDrop(event: DragEvent) {
    console.log('dropped', event);
  }

  onDragEnter(event: DragEvent) {
    console.log('drag enter', event);

  }
  shipIDMouseDown(event:any){
    console.log(event.target.id)
  }


}
