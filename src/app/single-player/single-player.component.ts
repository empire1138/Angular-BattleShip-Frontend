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
  @ViewChild("displayGrid") displayGrid!: ElementRef;
  //@ViewChild("destroyerContainer") destroyerContainer!: ElementRef; 

  width = 10;
  userSquares: any = []
  computerSquares: any = []
  isHorizontal: boolean = true;
  selectedShipNameWithIndex: any;
  draggedShip: any;
  draggedShipLength: any;
  isGameOver:boolean = false
  currentPlayer: string = 'user'
  playerNum: number = 0
  ready: boolean = false
  enemyReady: boolean = false
  allShipsPlaced: boolean = false
  shotFired: number = -1

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
    this.isHorizontal = !this.isHorizontal;
  }

  startGame() {

  }

  //drag Events for the ships 
  onDragStart(event: any) {
    this.draggedShip = event.target
    this.draggedShipLength = this.draggedShip.childNodes.length;
    console.log(this.draggedShip, 'draggedShip')
    console.log(this.draggedShipLength, 'draggedShipLength');
  }

  onDrag(event: DragEvent) {
    console.log('dragging', event);
  }

  onDragOver(event: any) {
    event.preventDefault();
    console.log('drag over', event);
    console.log(event.target)
  }

  onDragEnd(event: DragEvent) {
    console.log('drag end', event);

  }
  onDragLeave(event: DragEvent) {
    console.log('drag leave', event);
  }

  onDrop(event: any) {
    console.log(event.target.dataset.id, 'dataset.id')
    let shipNameWithLastID = this.draggedShip.lastChild.id;
    let shipClass = shipNameWithLastID.slice(0, -2);
    let lastShipIndex = parseInt(shipNameWithLastID.substr(-1));
    let shipLastId = lastShipIndex + parseInt(event.target.dataset.id);
    console.log(shipLastId, 'shipLastId');

    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    let selectedShipIndex = parseInt(this.selectedShipNameWithIndex.substr(-1))
    console.log(shipLastId, 'SecondShipLastID')
    console.log(selectedShipIndex, 'selectedShipIndex');
    shipLastId = shipLastId - selectedShipIndex
    console.log(shipLastId, 'ThirdShipLastID');


    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === this.draggedShipLength - 1) directionClass = 'end'
        this.userSquares[parseInt(event.target.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === this.draggedShipLength - 1) directionClass = 'end'
        this.userSquares[parseInt(event.target.dataset.id) - selectedShipIndex + (this.width * i)].classList.add('taken', 'vertical', directionClass, shipClass)
      }
    } else return

    this.displayGrid.nativeElement.removeChild(this.draggedShip)
    if (!this.displayGrid.nativeElement.querySelector('.ship')) this.allShipsPlaced = true
  }


onDragEnter(event: any) {
  event.preventDefault();
  console.log('drag enter', event);

}
shipIDMouseDown(event: any) {
  this.selectedShipNameWithIndex = event.target.id;
}


}
