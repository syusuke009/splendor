import { Injectable, ElementRef } from '@angular/core';
import { OperationLogList, OperationLogAction, OperationLog } from './operation-log';
import { Player } from '../player';
import { GameStatus } from '../game-status';

@Injectable({
  providedIn: 'root'
})
export class OperationLogService {

  loglist: OperationLogList = new OperationLogList();

  constructor() {
  }

  newTurn(status: GameStatus) {
    let log: OperationLog = new OperationLog(status.getCurrentRound(), status.getCurrentPlayer());
    this.loglist.logs.unshift(log);
  }

  append(action: OperationLogAction) {
    let log: OperationLog = this.loglist.getActiveLog();
    log.actions.push(action);
  }
}
