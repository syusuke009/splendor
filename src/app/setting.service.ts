import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  players: string[]

  constructor() { }

  setPlayers(players: string[]) {
    this.players = players;
  }

  getPlayers(): string[] {
    if (!this.players) {
      return ["Player1", "Player2"];
    }
    return this.players;
  }

  getTipResource(): number {
    let playerCount: number = this.getPlayers().length;
    if (playerCount == 2) {
      return 4;
    }
    if (playerCount == 3) {
      return 5;
    }
    return 7;
  }
  getTileCount(): number {
    return this.getPlayers().length + 1;
  }
}
