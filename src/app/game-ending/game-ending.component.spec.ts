import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndingComponent } from './game-ending.component';

describe('GameEndingComponent', () => {
  let component: GameEndingComponent;
  let fixture: ComponentFixture<GameEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
