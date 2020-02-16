import { Player } from './player';
import { Tips } from './tips';
import { Card } from './card';
import { Tile } from './tile';
import { GamePhaseConst } from './game-phase-const';

export class GameStatus {

    players: Player[];
    tipResource: Tips = new Tips();

    level1: Card[];
    level2: Card[];
    level3: Card[];
    tiles: Tile[];

    private fieldCards: Card[] = [];

    private turn: number = 0;
    private round: number = 1;

    phase: string;

    // for smart-phone
    screenMode: string;

    reset() {
      this.fieldCards = [];
      this.turn = 0;
      this.round = 1;
      this.phase = GamePhaseConst.WAIT_OPERATION;
      this.screenMode = 'field';
    }

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
        this.round++;
      }
      this.turn = current;
      this.getCurrentPlayer().myTurn = true;
    }

    getCurrentRound(): number {
      return this.round;
    }

    /*
     * ボタン制御用メソッド
     */
    canGet3Tip(): boolean {
      let enoughColor = 0;
      let resource = this.tipResource;
      if (resource.white > 0) {
        enoughColor++;
      }
      if (resource.blue > 0) {
        enoughColor++;
      }
      if (resource.green > 0) {
        enoughColor++;
      }
      if (resource.red > 0) {
        enoughColor++;
      }
      if (resource.black > 0) {
        enoughColor++;
      }
      return enoughColor >= 3;
    }
    canGet2Tip(): boolean {
      let resource = this.tipResource;
      if (resource.white >= 4) {
        return true;
      }
      if (resource.blue >= 4) {
        return true;
      }
      if (resource.green >= 4) {
        return true;
      }
      if (resource.red >= 4) {
        return true;
      }
      if (resource.black >= 4) {
        return true;
      }
      return false;
    }
    canPurchase(): boolean {
      return this.fieldCards.some(c => this.getCurrentPlayer().canSelect(c));;
    }
    canReserve(): boolean {
      if (this.getCurrentPlayer().reservations.length == 3) {
        return false;
      }
      return true;
    }

    /*
     * smart-phone画面制御用メソッド
     */
    switchScreen(screenMode: string) {
      this.screenMode = screenMode;
    }
}
