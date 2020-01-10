import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';
import { Player } from '../player';
import { Tips } from '../tips';
import { GamePhaseConst } from '../game-phase-const';

@Component({
  selector: 'app-tip-multi-select-dialog',
  templateUrl: './tip-multi-select-dialog.component.html',
  styleUrls: ['./tip-multi-select-dialog.component.less']
})
export class TipMultiSelectDialogComponent implements OnInit {

  white: boolean;
  blue: boolean;
  green: boolean;
  red: boolean;
  black: boolean;

  count: number = 0;

  status: GameStatus;

  constructor(private statusService: GameStatusService) {
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
    this.transferResource();
    this.reset();
    this.statusService.nextTurn(this.status);
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
  }

  onCancel() {
    this.reset();
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
  }

  transferResource() {
    let player: Player = this.status.getCurrentPlayer();
    let resource: Tips = this.status.tipResource;
    if (this.white) {
      player.tips.white++;
      resource.white--;
    }
    if (this.blue) {
      player.tips.blue++;
      resource.blue--;
    }
    if (this.green) {
      player.tips.green++;
      resource.green--;
    }
    if (this.red) {
      player.tips.red++;
      resource.red--;
    }
    if (this.black) {
      player.tips.black++;
      resource.black--;
    }
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
