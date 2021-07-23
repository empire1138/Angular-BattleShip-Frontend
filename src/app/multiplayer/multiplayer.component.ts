import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SocketioService } from '../service/socketIO/socketio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {
  @ViewChild("userGrid") userGrid!: ElementRef;
  @ViewChild("computerGrid") computerGrid!: ElementRef;
  @ViewChild("displayGrid") displayGrid!: ElementRef;
  //@ViewChild("destroyerContainer") destroyerContainer!: ElementRef; 

  width = 10;
  userSquares: any = []
  computerSquares: any = []
  isHorizontal: boolean = true;
  isGameStarted: boolean = false;
  selectedShipNameWithIndex: any;
  draggedShip: any;
  draggedShipLength: any;
  isGameOver: boolean = false
  currentPlayer: string = 'user'
  playerNum: number = 0
  ready: boolean = false
  enemyReady: boolean = false
  allShipsPlaced: boolean = false
  shotFired: number = -1
  gameMode: string = 'singlePlayer'
  infoMessageDisplay: string = 'Place the ships on the game grid then click Start Game';

  cpuDestroyerCount: number = 0
  cpuSubmarineCount: number = 0
  cpuCruiserCount: number = 0
  cpuBattleshipCount: number = 0
  cpuCarrierCount: number = 0

  destroyerCount: number = 0
  submarineCount: number = 0
  cruiserCount: number = 0
  battleshipCount: number = 0
  carrierCount: number = 0

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

  constructor(private renderer: Renderer2,
    private he: ElementRef,
    private socketIO: SocketioService,
    private activeRoute: ActivatedRoute
  ) { }

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
    this.startMultiPlayer();
    this.isGameStarted = !this.isGameStarted;

  }

  startMultiPlayer() {

    //this should get the player number from the backend
    this.socketIO.getPlayerNumber().subscribe((number: any) => {
      if (number === -1) {
        this.infoMessageDisplay =  "Sorry, the server is full"
      } else {
        this.playerNum = parseInt(number)
        if (this.playerNum === 1) this.currentPlayer = "enemy"

        console.log(this.playerNum)
        this.socketIO.checkPLayersEmit();
      }
    })


    //Setup listen for shots fired
    this.computerSquares.forEach((square: any) => {
      square.addEventListener('click', () => {
        if (this.currentPlayer === 'user' && this.ready && this.enemyReady) {
          this.shotFired = square.dataset.id
          this.socketIO.shotFiredEmit(this.shotFired);
        }
      })
    })
  }

  playerConnectedOrDisconnected(){
    
  }

  revealSquare(classList: any) {
    const enemySquare = this.computerGrid.nativeElement.querySelector(`div[data-id='${this.shotFired}']`)
    const obj = Object.values(classList)
    if (!enemySquare.classList.contains('boom') && this.currentPlayer === 'user' && !this.isGameOver) {
      if (obj.includes('destroyer')) this.destroyerCount++
      if (obj.includes('submarine')) this.submarineCount++
      if (obj.includes('cruiser')) this.cruiserCount++
      if (obj.includes('battleship')) this.battleshipCount++
      if (obj.includes('carrier')) this.carrierCount++
    }
    if (obj.includes('taken')) {
      enemySquare.classList.add('boom')
    } else {
      enemySquare.classList.add('miss')
    }
    this.checkForWins()
    this.currentPlayer = 'enemy'
  }


  checkForWins() {
    let enemy = 'computer'
    if (this.gameMode === 'multiPlayer') enemy = 'enemy'
    if (this.destroyerCount === 2) {
      this.infoMessageDisplay = `You sunk the ${enemy}'s destroyer`
      this.destroyerCount = 10
    }
    if (this.submarineCount === 3) {
      this.infoMessageDisplay = `You sunk the ${enemy}'s submarine`
      this.submarineCount = 10
    }
    if (this.cruiserCount === 3) {
      this.infoMessageDisplay = `You sunk the ${enemy}'s cruiser`
      this.cruiserCount = 10
    }
    if (this.battleshipCount === 4) {
      this.infoMessageDisplay = `You sunk the ${enemy}'s battleship`
      this.battleshipCount = 10
    }
    if (this.carrierCount === 5) {
      this.infoMessageDisplay = `You sunk the ${enemy}'s carrier`
      this.carrierCount = 10
    }
    if (this.cpuDestroyerCount === 2) {
      this.infoMessageDisplay = `${enemy} sunk your destroyer`
      this.cpuDestroyerCount = 10
    }
    if (this.cpuSubmarineCount === 3) {
      this.infoMessageDisplay = `${enemy} sunk your submarine`
      this.cpuSubmarineCount = 10
    }
    if (this.cpuCruiserCount === 3) {
      this.infoMessageDisplay = `${enemy} sunk your cruiser`
      this.cpuCruiserCount = 10
    }
    if (this.cpuBattleshipCount === 4) {
      this.infoMessageDisplay = `${enemy} sunk your battleship`
      this.cpuBattleshipCount = 10
    }
    if (this.cpuCarrierCount === 5) {
      this.infoMessageDisplay = `${enemy} sunk your carrier`
      this.cpuCarrierCount = 10
    }

    if ((this.destroyerCount + this.submarineCount + this.cruiserCount + this.battleshipCount + this.carrierCount) === 50) {
      this.infoMessageDisplay = "YOU WIN"
      this.gameOver()
    }
    if ((this.cpuDestroyerCount + this.cpuSubmarineCount + this.cpuCruiserCount + this.cpuBattleshipCount + this.cpuCarrierCount) === 50) {
      this.infoMessageDisplay = `${enemy.toUpperCase()} WINS`
      this.gameOver()
    }
  }

  gameOver() {
    this.isGameOver = true
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
