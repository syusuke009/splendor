import { Injectable } from '@angular/core';
import { Card } from './card';
import { Tile } from './tile';
import { Decks } from './decks';
import { GameStatus } from './game-status';
import { TileComponent } from './tile/tile.component';

@Injectable({
  providedIn: 'root'
})
export class CardDealService {

  constructor() {
  }

  private shuffle(boundle: any[]): any[] {
    let result = boundle.map((e) => e);
    let count = result.length;

    while (count > 0) {
       let index = Math.floor(Math.random() * count);
       count--;
       let temp = result[count];
       result[count] = result[index];
       result[index] = temp;
    }
    return result;
  }

  setupDeck(status: GameStatus) {
    status.level1 = this.castToCard(this.shuffle(Decks.LEVEL_1));
    status.level2 = this.castToCard(this.shuffle(Decks.LEVEL_2));
    status.level3 = this.castToCard(this.shuffle(Decks.LEVEL_3));
    status.tiles = this.castToTile(this.shuffle(Decks.TILE));
  }

  private castToCard(boundle: any[]): Card[] {
    return boundle.map((b) => Object.assign(new Card(), b));
  }

  private castToTile(boundle: any[]): Tile[] {
    return boundle.map(b => Object.assign(new Tile(), b));
  }

  handOutLevel1(status: GameStatus): Card {
    if (status.level1.length == 0) {
      return null;
    }
    let c: Card = status.level1.pop();
    status.putFieldCards(c);
    return c;
  }
  
  handOutLevel2(status: GameStatus): Card {
    if (status.level2.length == 0) {
      return null;
    }
    let c: Card = status.level2.pop();
    status.putFieldCards(c);
    return c;
  }
  
  handOutLevel3(status: GameStatus): Card {
    if (status.level3.length == 0) {
      return null;
    }
    let c: Card = status.level3.pop();
    status.putFieldCards(c);
    return c;
  }

}
