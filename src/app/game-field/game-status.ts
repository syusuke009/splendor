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

    /* Dialog Open Status */
    multiSelectDialog: boolean = false;
    singleSelectDialog: boolean = false;
    /* Card Selection Status */
    purchaseCard: boolean = false;
    reserveCard: boolean = false;

    getCurrentPlayer() {
      return this.players[this.turn];
    }

    getFieldCards(): Card[] {
        return this.fieldCards;
    }

    putFieldCards(c: Card) {
      this.fieldCards.push(c);
    }
    removeFieldCard(card: Card) {
      let i: number = this.fieldCards.indexOf(card);
      this.fieldCards.splice(i, 1);
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
}
