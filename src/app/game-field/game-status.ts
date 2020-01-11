import { Player } from './player';
import { Tips } from './tips';
import { Card } from './card';
import { Tile } from './tile';

export class GameStatus {

    players: Player[];
    tipResource: Tips = new Tips();

    level1: Card[];
    level2: Card[];
    level3: Card[];
    tiles: Tile[];

    private fieldCards: Card[] = [];

    private turn: number = 0;

    phase: string;

    getCurrentPlayer(): Player {
      return this.players[this.turn];
    }
    isLastPlayer(): boolean {
      return this.turn == this.players.length -1;
    }

    getFieldCards(): Card[] {
        return this.fieldCards;
    }

    putFieldCards(c: Card) {
      this.fieldCards.push(c);
    }
    removeFieldCard(card: Card) {
      let i: number = this.fieldCards.indexOf(card);
      if (i == -1) {
        return;
      }
      this.fieldCards.splice(i, 1);
    }
    removeTile(tile: Tile) {
      let i: number = this.tiles.indexOf(tile);
      if (i == -1) {
        return;
      }
      this.tiles.splice(i, 1);
    }
    
    nextTurn() {
      this.getCurrentPlayer().myTurn = false;
      let current = this.turn;
      current++;
      if (current == this.players.length) {
        current = 0;
      }
      this.turn = current;
      this.getCurrentPlayer().myTurn = true;
    }

    /*
     * ボタン制御用メソッド
     */
    canReserve(): boolean {
      if (this.getCurrentPlayer().reservations.length == 3) {
        return false;
      }
      return true;
    }
}
