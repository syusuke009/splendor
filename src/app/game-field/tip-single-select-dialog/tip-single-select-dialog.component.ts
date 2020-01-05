import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Tips } from '../tips';
import { GameStatusService } from '../game-status.service';
import { GameStatus } from '../game-status';
import { Color } from '../color.enum';

@Component({
  selector: 'app-tip-single-select-dialog',
  templateUrl: './tip-single-select-dialog.component.html',
  styleUrls: ['./tip-single-select-dialog.component.less']
})
export class TipSingleSelectDialogComponent implements OnInit {

  value: string = null;

  status: GameStatus;

  constructor(private statusService: GameStatusService) {
    this.status = statusService.status;
  }

  ngOnInit() {
  }

  onOK() {
    if (this.value == null) {
      return;
    }
    this.transferResource();
    this.reset();
    this.statusService.nextTurn(this.status);
    this.status.singleSelectDialog = false;
  }

  onCancel() {
    this.reset();
    this.status.singleSelectDialog = false;
  }

  transferResource() {
    let player: Player = this.status.getCurrentPlayer();
    let resource: Tips = this.status.tipResource;
    switch (Number.parseInt(this.value)) {
    case Color.WHITE:
      player.tips.white+=2;
      resource.white-=2;
      break;
    case Color.BLUE:
      player.tips.blue+=2;
      resource.blue-=2;
      break;
    case Color.GREEN:
      player.tips.green+=2;
      resource.green-=2;
      break;
    case Color.RED:
      player.tips.red+=2;
      resource.red-=2;
      break;
    case Color.BLACK:
      player.tips.black+=2;
      resource.black-=2;
      break;
    }
  }

  private reset() {
    this.value = null;
  }
}
