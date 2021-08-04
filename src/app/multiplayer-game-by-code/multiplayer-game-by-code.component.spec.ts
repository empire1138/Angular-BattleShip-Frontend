import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerGameByCodeComponent } from './multiplayer-game-by-code.component';

describe('MultiplayerGameByCodeComponent', () => {
  let component: MultiplayerGameByCodeComponent;
  let fixture: ComponentFixture<MultiplayerGameByCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerGameByCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerGameByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
