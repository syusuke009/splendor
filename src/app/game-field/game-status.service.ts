import { Injectable } from '@angular/core';
import { Player } from './player';
import { CardDealService } from './card-deal.service';
import { SettingService } from '../setting.service';
import { GameStatus } from './game-status';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  status: GameStatus = new GameStatus();

  constructor(private setting: SettingService,
    private dealer: CardDealService) { }

  setup(): GameStatus {
    this.status.players = this.setting.getPlayers().map((name) => {
      let p: Player = new Player();
      p.name = name;
      return p;
    });
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

    return this.status;
  }

  nextTurn(status: GameStatus) {
    status.nextTurn();
  }
}
