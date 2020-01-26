import { Component, OnInit, ContentChild, Output, EventEmitter } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';
import { Player } from '../player';
import { Tips } from '../tips';
import { GamePhaseConst } from '../game-phase-const';
import { TipReleaseDialogComponent } from '../tip-release-dialog/tip-release-dialog.component';
import { OperationLogService } from '../log-display/operation-log.service';
import { OperationLogAction } from '../log-display/operation-log';

@Component({
  selector: 'app-tip-multi-select-dialog',
  templateUrl: './tip-multi-select-dialog.component.html',
  styleUrls: ['./tip-multi-select-dialog.component.less']
})
export class TipMultiSelectDialogComponent implements OnInit {

  @Output() over: EventEmitter<Player> = new EventEmitter();

  white: boolean;
  blue: boolean;
  green: boolean;
  red: boolean;
  black: boolean;

  count: number = 0;

  status: GameStatus;
  
  constructor(private statusService: GameStatusService,
      private logService: OperationLogService) {
    this.status = statusService.status;
  }

  ngOnInit() {
  }

  prohibitWhite(): boolean {
    return this.status.tipResource.white == 0;
  }
  prohibitBlue(): boolean {
    return this.status.tipResource.blue == 0;
  }
  prohibitGreen(): boolean {
    return this.status.tipResource.green == 0;
  }
  prohibitRed(): boolean {
    return this.status.tipResource.red == 0;
  }
  prohibitBlack(): boolean {
    return this.status.tipResource.black == 0;
  }

  onChange() {
    let checked: number = 0;
    if (this.white) {
      checked++;
    }
    if (this.blue) {
      checked++;
    }
    if (this.green) {
      checked++;
    }
    if (this.red) {
      checked++;
    }
    if (this.black) {
      checked++;
    }
    this.count = checked;
  }

  onOK() {
    if (this.count != 3) {
      return;
    }
    let transferred: Tips = this.createTransferred();
    this.transferResource(transferred);
    this.reset();
    this.logService.append(new OperationLogAction.GetThreeKindTipAction(transferred));
    if (this.status.getCurrentPlayer().tips.count() > 10) {
      this.over.emit(this.status.getCurrentPlayer());
      return;
    }
    this.statusService.nextTurn(this.status);
  }
  
  onCancel() {
    this.reset();
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
  }
  
  createTransferred(): Tips {
    let tips: Tips = new Tips();
    if (this.white) {
      tips.white = 1;
    }
    if (this.blue) {
      tips.blue = 1;
    }
    if (this.green) {
      tips.green = 1;
    }
    if (this.red) {
      tips.red = 1;
    }
    if (this.black) {
      tips.black = 1;
    }
    return tips;
  }

  transferResource(transferred: Tips) {
    let player: Player = this.status.getCurrentPlayer();
    player.tips.add(transferred);
    let resource: Tips = this.status.tipResource;
    resource.subtract(transferred);
  }

  private reset() {
    this.white = false;
    this.blue = false;
    this.green = false;
    this.red = false;
    this.black = false;
    this.count = 0;
  }
}
