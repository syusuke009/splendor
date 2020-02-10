import { Injectable } from '@angular/core';
import { Player } from './player';
import { CardDealService } from './card-deal.service';
import { SettingService } from '../setting.service';
import { GameStatus } from './game-status';
import { Tile } from './tile';
import { Tips } from './tips';
import { GamePhaseConst } from './game-phase-const';
import { GameResultService } from './game-result.service';
import { OperationLogService } from './log-display/operation-log.service';
import { OperationLogAction, OperationLog } from './log-display/operation-log';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  status: GameStatus = new GameStatus();

  constructor(private setting: SettingService,
    private dealer: CardDealService,
    private gameresult: GameResultService,
    private logService: OperationLogService) { }

  setup(): GameStatus {
    this.status.reset();
    this.status.players = this.shuffle(this.setting.getPlayers().map((name) => {
      let p: Player = new Player();
      p.name = name;
      return p;
    }));
    this.status.getCurrentPlayer().myTurn = true;

    let resourceCount = this.setting.getTipResource();
    this.status.tipResource.white = resourceCount;
    this.status.tipResource.blue = resourceCount;
    this.status.tipResource.green = resourceCount;
    this.status.tipResource.red = resourceCount;
    this.status.tipResource.black = resourceCount;
    this.status.tipResource.gold = 5;

    this.dealer.setupDeck(this.status);

    this.status.tiles = this.status.tiles.slice(0, this.setting.getTileCount());

    this.logService.start(this.status);
    return this.status;
  }
  private shuffle(boundle: Player[]): Player[] {
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

  nextTurn(status: GameStatus) {
    this.tryVisit(this.status.tiles);
    if (this.status.phase == GamePhaseConst.OPEN_NOBLE_SELECT_DIALOG) {
      return;
    }
    this.nextTurnWithoutNobleVisit(status);
  }
  private tryVisit(tiles: Tile[]) {
    let player: Player = this.status.getCurrentPlayer();
    let assets: Tips = player.assets;
    let nobles: Tile[] = tiles.filter(noble => noble.isSatisfied(assets));
    if (nobles.length == 0) {
      return;
    }
    if (nobles.length > 1) {
      this.status.phase = GamePhaseConst.OPEN_NOBLE_SELECT_DIALOG;
      return;
    }
    let noble: Tile;
    if (nobles.length == 1) {
      noble = nobles.pop();
      player.visit(noble);
      this.status.removeTile(noble);
      this.logService.append(new OperationLogAction.VisitNobleAction(noble));
    }
  }
  /**
   * operation for NobleSelectDialog
   * @param status 
   */
  nextTurnWithoutNobleVisit(status: GameStatus) {
    if (this.status.isLastPlayer() && this.gameresult.isEnd(this.status.players)) {
      this.status.phase = GamePhaseConst.WAIT_OPERATION;
      return;
    }
    status.nextTurn();
    this.logService.newTurn(status);
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
  }
}
