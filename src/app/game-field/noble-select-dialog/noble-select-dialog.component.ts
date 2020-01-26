import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile';
import { GameStatusService } from '../game-status.service';
import { GameStatus } from '../game-status';
import { Tips } from '../tips';
import { Player } from '../player';
import { OperationLogAction } from '../log-display/operation-log';
import { OperationLogService } from '../log-display/operation-log.service';

@Component({
  selector: 'app-noble-select-dialog',
  templateUrl: './noble-select-dialog.component.html',
  styleUrls: ['./noble-select-dialog.component.less']
})
export class NobleSelectDialogComponent implements OnInit {

  select: Tile;

  status: GameStatus;

  constructor(private statusService: GameStatusService,
    private logService: OperationLogService) { }

  ngOnInit() {
    this.status = this.statusService.status;
  }

  visitedNobles(): Tile[] {
    let player: Player = this.status.getCurrentPlayer();
    let assets: Tips = player.assets;
    return this.status.tiles.filter(noble => noble.isSatisfied(assets));
  }

  onSelected(tile: Tile) {
    this.select = tile;
  }

  onOK() {
    this.status.getCurrentPlayer().visit(this.select);
    this.status.removeTile(this.select);
    this.logService.append(new OperationLogAction.VisitNobleAction(this.select));
    this.statusService.nextTurnWithoutNobleVisit(this.status);
  }
}
