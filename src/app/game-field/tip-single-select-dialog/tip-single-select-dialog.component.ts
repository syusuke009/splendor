import { Component, OnInit, ContentChild, Output, EventEmitter } from '@angular/core';
import { Player } from '../player';
import { Tips } from '../tips';
import { GameStatusService } from '../game-status.service';
import { GameStatus } from '../game-status';
import { Color } from '../color.enum';
import { GamePhaseConst } from '../game-phase-const';
import { TipReleaseDialogComponent } from '../tip-release-dialog/tip-release-dialog.component';

@Component({
  selector: 'app-tip-single-select-dialog',
  templateUrl: './tip-single-select-dialog.component.html',
  styleUrls: ['./tip-single-select-dialog.component.less']
})
export class TipSingleSelectDialogComponent implements OnInit {

  private BORDER_COUNT: number = 4;

  @Output() over: EventEmitter<Player> = new EventEmitter();
  
  value: string = null;

  status: GameStatus;

  constructor(private statusService: GameStatusService) {
    this.status = statusService.status;
  }

  ngOnInit() {
  }

  prohibitWhite(): boolean {
    return this.status.tipResource.white < this.BORDER_COUNT;
  }
  prohibitBlue(): boolean {
    return this.status.tipResource.blue < this.BORDER_COUNT;
  }
  prohibitGreen(): boolean {
    return this.status.tipResource.green < this.BORDER_COUNT;
  }
  prohibitRed(): boolean {
    return this.status.tipResource.red < this.BORDER_COUNT;
  }
  prohibitBlack(): boolean {
    return this.status.tipResource.black < this.BORDER_COUNT;
  }

  onOK() {
    if (this.value == null) {
      return;
    }
    this.transferResource();
    this.reset();
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

  private transferResource() {
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
