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

   // console.log(this.userGrid.nativeElement.querySelector('.grid-user'));
    //console.log(this.renderer.selectRootElement(this.userGrid));

    this.createBoard(this.renderer.selectRootElement(this.userGrid), this.userSquares);
    this.createBoard(this.renderer.selectRootElement(this.computerGrid), this.computerSquares);
    
  }

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  
  }

  //Calling the functions

  //Making the functions for the game
  createBoard(grid: any, squares: any) {
    console.log(grid);
    console.log(squares);
    for (let i = 0; i < (this.width* this.width); i++) {
      const square = this.renderer.createElement('div');
      square.dataset.id = i;
      // grid.appendChild(square)
      this.renderer.appendChild(grid, square);
      squares.push(square)
    }
  }


}
