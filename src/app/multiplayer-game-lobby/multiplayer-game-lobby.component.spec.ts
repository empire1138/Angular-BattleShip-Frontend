import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerGameLobbyComponent } from './multiplayer-game-lobby.component';

describe('MultiplayerGameLobbyComponent', () => {
  let component: MultiplayerGameLobbyComponent;
  let fixture: ComponentFixture<MultiplayerGameLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerGameLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerGameLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
