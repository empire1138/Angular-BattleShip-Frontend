import { Injectable } from '@angular/core';
import { SinglePlayerComponent } from 'src/app/single-player/single-player.component';


@Injectable({
  providedIn: 'root'
})
export class SinglePlayerServiceService {

  // const width = 10;
  // userSquares:any = []
  // computerSquares:anly = []

  ngOnInit(): void { 
  
  document.addEventListener('DOMContentLoaded', () => {
    // const userGrid = document.querySelector('.grid-user')
    // const computerGrid = document.querySelector('.grid-computer')
    // const displayGrid = document.querySelector('.grid-display')
    // const ships = document.querySelectorAll('.ship')
    // const destroyer = document.querySelector('.destroyer-container')
    // const submarine = document.querySelector('.submarine-container')
    // const cruiser = document.querySelector('.cruiser-container')
    // const battleship = document.querySelector('.battleship-container')
    // const carrier = document.querySelector('.carrier-container')
    // const startButton = document.querySelector('#start')
    const rotateButton :any = document.querySelector('#rotate')
    // const turnDisplay = document.querySelector('#whose-go')
    // const infoDisplay = document.querySelector('#info')
    // const setupButtons = document.getElementById('setup-buttons')
    // const userSquares : any = []
    // const computerSquares :any = []
    // const square : string|number 
    // let isHorizontal = true
    // let isGameOver = false
    // let currentPlayer = 'user'
    const width = 10
    // let playerNum = 0
    // let ready = false
    // let enemyReady = false
    // let allShipsPlaced = false
    // let shotFired = -1
    //Ships
    const shipArray = [
      {
        name: 'destroyer',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'submarine',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'cruiser',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'battleship',
        directions: [
          [0, 1, 2, 3],
          [0, width, width*2, width*3]
        ]
      },
      {
        name: 'carrier',
        directions: [
          [0, 1, 2, 3, 4],
          [0, width, width*2, width*3, width*4]
        ]
      },
    ]
    
  
    // function rotate() {
    //   if (isHorizontal) {
    //     destroyer.classList.toggle('destroyer-container-vertical')
    //     submarine.classList.toggle('submarine-container-vertical')
    //     cruiser.classList.toggle('cruiser-container-vertical')
    //     battleship.classList.toggle('battleship-container-vertical')
    //     carrier.classList.toggle('carrier-container-vertical')
    //     isHorizontal = false
    //     // console.log(isHorizontal)
    //     return
    //   }
    //   if (!isHorizontal) {
    //     destroyer.classList.toggle('destroyer-container-vertical')
    //     submarine.classList.toggle('submarine-container-vertical')
    //     cruiser.classList.toggle('cruiser-container-vertical')
    //     battleship.classList.toggle('battleship-container-vertical')
    //     carrier.classList.toggle('carrier-container-vertical')
    //     isHorizontal = true
    //     // console.log(isHorizontal)
    //     return
    //   }
    // }
    rotateButton.addEventListener('click',console.log('deez nutz'))


  // constructor() { }
  // //Calling the functions
  // createBoard(userGrid, userSquares: any)
  // createBoard(computerGrid,computerSquares: any)


  // //Making the functions for the game
  // createBoard(grid, squares) {
  //   for (let i = 0; i < this.width* this.width; i++) {
  //     const square = document.createElement('div')
  //     square.dataset.id = i
  //     grid.appendChild(square)
  //     squares.push(square)
  //   }

 
  
  })  }}
  
 
