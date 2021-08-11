import { asNativeElements, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SocketioService } from '../service/socketIO/socketio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {
  @ViewChild("userGrid") userGrid!: ElementRef;
  @ViewChild("computerGrid") computerGrid!: ElementRef;
  @ViewChild("displayGrid") displayGrid!: ElementRef;
  @ViewChild("playerDisplay") playerDisplay!: ElementRef;
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
  otherPlayerNumber!: number;
  ready: boolean = false
  enemyReady: boolean = false
  allShipsPlaced: boolean = false
  shotFired: number = -1
  gameMode: string = 'multiPlayer'
  infoMessageDisplay: string = '';
  firedShotsArray: number[] = []
  returnHitMissCheck: boolean = false;
  currentGameRoomNumber!: number;
  winingPlayer!: number;
  hasWinningPlayer: boolean = false;

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
    this.getRoomNumber();

  }

  constructor(private renderer: Renderer2,
    private he: ElementRef,
    private socketIO: SocketioService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.infoMessageDisplay = "Place the ships on the game grid then click Start Game"
    //Step 1 Setup the connection and request for a Player Number. In socketIO Service
    this.socketIO.setupSocketConnection();
    // Get Room Number 
    //this.getRoomNumber(); 
    // Step 2 Receive the player number
    this.playerNumberReceived();
    // Step 3 Another player has connected or disconnected
    this.playerConnection();
    // Step 4 "enemyplayer" ready
    this.playerEnemyReady();
    //Step 5 Check player Status 
    this.checkPlayersReceiver();
    //step 6 timeout Check Limit 
    this.timedOut();
    //Step 7
    this.fireReceived();
    //Step 8
    this.fireRelyReceived();
    //Test 
    this.getOtherPLayerNumber();

  }

  rotateShips() {
    this.isHorizontal = !this.isHorizontal;
  }

  startGame() {
    this.startMultiPlayer();
    this.playGameMulti();
    this.isGameStarted = !this.isGameStarted;
    this.infoMessageDisplay = '';
  }


  startMultiPlayer() {


    console.log(this.currentPlayer, 'current player');
    console.log(this.ready, 'this.ready')
    console.log(this.enemyReady, 'enemyReady');
    this.computerSquares.forEach((square: any) => {
      square.addEventListener('click', () => {
        if (this.currentPlayer === 'user' && this.ready && this.enemyReady) {
          this.shotFired = square.dataset.id
          this.hitMissCheck(this.shotFired);
          console.log(this.shotFired, 'shotFIRED');
          //Step 10
          if (!this.returnHitMissCheck) {
            this.socketIO.shotFiredEmit(this.shotFired);
          }
        }
        this.returnHitMissCheck = false;
      })
    })


  }
  hitMissCheck(clickedSquare: number) {
    let foundHitMissCheck: number = 0;

    this.firedShotsArray.push(clickedSquare);
    console.log(this.firedShotsArray, 'firedshotsArray')
    //Goes though the array of fired shots and checks for duplicates. When it finds the duplicates prints the copy
    for (let i = 0; i < this.firedShotsArray.length; i++) {

      if (this.firedShotsArray.indexOf(this.firedShotsArray[i]) !== this.firedShotsArray.lastIndexOf(this.firedShotsArray[i])) {
        foundHitMissCheck = this.firedShotsArray[i];
        this.returnHitMissCheck = true
        console.log(foundHitMissCheck, 'foundHitMissCheck');
      }
    }
    //this removes the duplicate from the array 
    this.firedShotsArray = this.firedShotsArray.filter((item, index) => {
      return this.firedShotsArray.indexOf(item) === index;
    })
  }
  //New Step Get Room Number 
  getRoomNumber() {
    this.socketIO.getRoomReceived().subscribe((number: any) => {
      this.currentGameRoomNumber = number;
    })
  }

  //Step 2
  playerNumberReceived() {
    //this should get the player number from the backend then ask for other players connection.
    //step 2-A Receive
    this.socketIO.getPlayerNumber().subscribe((number: any) => {
      if (number === -1) {
        this.infoMessageDisplay = "Sorry, the server is full"
      } else {
        this.playerNum = parseInt(number)
        if (this.playerNum === 1) this.currentPlayer = "enemy"

        console.log(this.playerNum, 'PLayerNumber')
        //Step 2-B Request for other players connection Emit
        this.socketIO.checkPlayersEmit();
      }
    })
  }

  //Step 3. Receive
  playerConnection() {
    this.socketIO.playerConnectionReceived().subscribe((number: any) => {
      console.log(`Player number ${number} has connected or disconnected`)
      //Step 3-A calls function to display the Info on Screen
      //this.otherPlayerNumber = number; 
      this.getOtherPLayerNumber();
      this.playerConnectedOrDisconnected(number);
    })
  }


  //Step 3-A 
  playerConnectedOrDisconnected(number: any) {
    let player = `.p${parseInt(number) + 1}`
    console.log(player, 'letPlayer')
    this.playerDisplay.nativeElement.querySelector(`${player} .connected`).classList.toggle('active')
    if (parseInt(number) === this.playerNum) this.playerDisplay.nativeElement.querySelector(player).style.fontWeight = 'bold'
  }

  //Step 4 On enemy ready move forward with the game  Receive
  playerEnemyReady() {
    this.socketIO.enemyReady().subscribe((number: any) => {
      this.enemyReady = true;
      this.playerReady(number);
    })
  }
  //Step 5. Check player status Receive
  checkPlayersReceiver() {
    this.socketIO.checkPlayersReceived().subscribe((players: any) => {
      players.forEach((p: { connected: any; ready: any; }, i: (number: any) => void) => {
        if (p.connected) this.playerConnectedOrDisconnected(i)
        if (p.ready) {
          this.playerReady(i)
          if (i !== this.playerReady) this.enemyReady = true
        }
      })
    })
  }


  // Step 6 Server API tracking the time limit Receive 
  timedOut() {
    this.socketIO.timeOut().subscribe(() => {
      this.infoMessageDisplay = "You have reached the 10 minute limit"
    })
  }
  //Step 7
  fireReceived() {
    //Step 7-A
    this.socketIO.shotFiredEmitReceived().subscribe((id: any) => {
      this.enemyGo(id)
      const square = this.userSquares[id]
      //Step 7-B
      this.socketIO.shotFiredReplyEmit(square.classList)
      this.playGameMulti();
    })
  }
  //Step 8
  fireRelyReceived() {
    this.socketIO.shotFiredReplyReceived().subscribe((classList: any) => {
      this.revealSquare(classList);
      this.playGameMulti();
    })
  }

  playerReady(number: any) {
    let player = `.p${parseInt(number) + 1}`
    this.playerDisplay.nativeElement.querySelector(`${player} .ready`).classList.toggle('active')
  }


  //Testing 
  getOtherPLayerNumber() {
    this.socketIO.otherPlayerNumber().subscribe((enemyNumber: any) => {
      console.log(enemyNumber, 'enemyNumber');
      this.otherPlayerNumber = enemyNumber;
    })
  }
  //testStep
  sendPlayerNumberOnConnect() {
    this.socketIO.emitPlayerNumberOnConnect(this.playerNum);
  }


  playGameMulti() {
    if (this.isGameOver) return;
    if (!this.ready) {
      //Step 9
      this.socketIO.playerReadyEmit();
      this.ready = true
      this.playerReady(this.playerNum)
    }
    if (this.enemyReady) {
      if (this.currentPlayer === 'user') {
        //this.infoMessageDisplay = 'Your Go'
      }
      if (this.currentPlayer === 'enemy') {
        //this.infoMessageDisplay = "Enemy's Go"
      }
    }
  }



  //Making grid for each players
  createBoard(grid: any, squares: any) {
    //console.log(grid, 'CheckFive');
    //console.log(squares, 'checkSix');
    for (let i = 0; i < (this.width * this.width); i++) {
      let square = this.renderer.createElement('div');
      square.dataset.id = i;
      // grid.appendChild(square)
      this.renderer.appendChild(grid.nativeElement, square);
      squares.push(square);
      //this.he.nativeElement.push(square)
    }
  }

  //This displays the grid spot 
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

  enemyGo(square?: any) {
    if (this.gameMode === 'singlePlayer') square = Math.floor(Math.random() * this.userSquares.length)
    if (!this.userSquares[square].classList.contains('boom')) {
      const hit = this.userSquares[square].classList.contains('taken')
      this.userSquares[square].classList.add(hit ? 'boom' : 'miss')
      if (this.userSquares[square].classList.contains('destroyer')) this.cpuDestroyerCount++
      if (this.userSquares[square].classList.contains('submarine')) this.cpuSubmarineCount++
      if (this.userSquares[square].classList.contains('cruiser')) this.cpuCruiserCount++
      if (this.userSquares[square].classList.contains('battleship')) this.cpuBattleshipCount++
      if (this.userSquares[square].classList.contains('carrier')) this.cpuCarrierCount++
      this.checkForWins()
    } else if (this.gameMode === 'singlePlayer') this.enemyGo()
    this.currentPlayer = 'user'
    //this.infoMessageDisplay = 'Your Go'
    // console.log(this.cpuDestroyerCount, 'cpuDestroyerCount')
    // console.log(this.cpuSubmarineCount, 'cpuSubCount')
    // console.log(this.cpuCruiserCount, 'cpuCruiserCount')
    // console.log(this.cpuBattleshipCount, 'cpuBattleCount')
    // console.log(this.cpuCarrierCount, 'cpuCarrierCount')
    console.log(this.infoMessageDisplay, 'infoMessageDisplay')
  }


  checkForWins() {
    console.log(this.infoMessageDisplay, 'infoMessageDisplay')
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
      this.winingPlayer = this.playerNum;
      this.gameOver()
    }
    if ((this.cpuDestroyerCount + this.cpuSubmarineCount + this.cpuCruiserCount + this.cpuBattleshipCount + this.cpuCarrierCount) === 50) {
      this.infoMessageDisplay = `${enemy.toUpperCase()} WINS`
      this.gameOver()
    }
  }

  gameOver() {
    this.isGameOver = true
    setTimeout(() => {
      this.router.navigate(['game-ending'])
    }, 5000);

  }

  //drag Events for the ships 
  onDragStart(event: any) {
    this.draggedShip = event.target
    this.draggedShipLength = this.draggedShip.childNodes.length;
    //console.log(this.draggedShip, 'draggedShip')
    //console.log(this.draggedShipLength, 'draggedShipLength');
  }

  onDrag(event: DragEvent) {
    //console.log('dragging', event);
  }

  onDragOver(event: any) {
    event.preventDefault();
    //console.log('drag over', event);
    //console.log(event.target)
  }

  onDragEnd(event: DragEvent) {
    //console.log('drag end', event);

  }
  onDragLeave(event: DragEvent) {
    //console.log('drag leave', event);
  }

  onDrop(event: any) {
    //console.log(event.target.dataset.id, 'dataset.id')
    let shipNameWithLastID = this.draggedShip.lastChild.id;
    let shipClass = shipNameWithLastID.slice(0, -2);
    let lastShipIndex = parseInt(shipNameWithLastID.substr(-1));
    let shipLastId = lastShipIndex + parseInt(event.target.dataset.id);

    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    let selectedShipIndex = parseInt(this.selectedShipNameWithIndex.substr(-1))
    shipLastId = shipLastId - selectedShipIndex

    // vert bug start  trying to get the vert bug just right 
    //parseInt(event.target.dataset.id) -((lastShipIndex-selectedShipIndex)*10)
    let startVertIndex = parseInt(event.target.dataset.id) - (selectedShipIndex * 10)
    if ((lastShipIndex - selectedShipIndex) === 0) {
      startVertIndex = parseInt(event.target.dataset.id) - (lastShipIndex * 10);
    }
    if (lastShipIndex === (lastShipIndex - selectedShipIndex)) {
      startVertIndex = parseInt(event.target.dataset.id)
    }
    // vert bug end

    //Start of the ship drop overwrite check.  
    let checkHertArray: boolean[] = [];
    let checkVertArray: boolean[] = [];
    let forLoopStartVertIndex = startVertIndex;
    //this will be an array of true or false for the check condition 
    for (let i = 0; i < this.draggedShipLength; i++) {
      checkHertArray[i] = this.userSquares[parseInt(event.target.dataset.id) - selectedShipIndex + i].classList.contains('taken', 'start', 'end', 'horizontal', 'vertical', 'undefined');
      checkVertArray[i] = this.userSquares[forLoopStartVertIndex].classList.contains('taken', 'start', 'end', 'horizontal', 'vertical', 'undefined')
      forLoopStartVertIndex += 10;
    }
    // Will check the array for every boolean in the array and return one true or false 
    let shipDropArrayChecker = (arr: any[]) => arr.some((v: boolean) => v === true);
    // End of the ship drop overwrite Check 

    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId) && !shipDropArrayChecker(checkHertArray) && !shipDropArrayChecker(checkVertArray)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === this.draggedShipLength - 1) directionClass = 'end'
        this.userSquares[parseInt(event.target.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(startVertIndex) && !shipDropArrayChecker(checkHertArray) && !shipDropArrayChecker(checkVertArray)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === this.draggedShipLength - 1) directionClass = 'end'
        this.userSquares[startVertIndex].classList.add('taken', 'vertical', directionClass, shipClass);
        startVertIndex += 10;
      }
    } else return

    this.displayGrid.nativeElement.removeChild(this.draggedShip)
    if (!this.displayGrid.nativeElement.querySelector('.ship')) this.allShipsPlaced = true
  }

  onDragEnter(event: any) {
    event.preventDefault();
    //console.log('drag enter', event);

  }
  shipIDMouseDown(event: any) {
    this.selectedShipNameWithIndex = event.target.id;
  }


}