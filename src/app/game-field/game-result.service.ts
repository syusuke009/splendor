import { Injectable } from '@angular/core';
import { GameResult } from './game-result';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  private result: GameResult = new GameResult();

  constructor() { 

  }

  getResult(): GameResult {
    return this.result;
  }

  isEnd(players: Player[]): boolean {
    let isEnd: boolean = players.some(p => p.point >= 15);
    if (isEnd) {
      this.result.finish(players);
    }
    return isEnd;
  }

}
