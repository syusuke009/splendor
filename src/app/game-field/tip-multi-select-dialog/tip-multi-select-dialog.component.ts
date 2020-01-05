import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';
import { Player } from '../player';
import { Tips } from '../tips';

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
    this.status.multiSelectDialog = false;
  }

  onCancel() {
    this.reset();
    this.status.multiSelectDialog = false;
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
