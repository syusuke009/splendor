import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';
import { Player } from '../player';
import { Tips } from '../tips';
import { Color } from '../color.enum';
import { OperationLogAction } from '../log-display/operation-log';
import { OperationLogService } from '../log-display/operation-log.service';

@Component({
  selector: 'app-tip-release-dialog',
  templateUrl: './tip-release-dialog.component.html',
  styleUrls: ['./tip-release-dialog.component.less']
})
export class TipReleaseDialogComponent implements OnInit {

  tips: Tips = new Tips();

  maxWhite: number;
  maxBlue: number;
  maxGreen: number;
  maxRed: number;
  maxBlack: number;
  maxGold: number;

  status: GameStatus;

  constructor(private statusService: GameStatusService,
      private logService: OperationLogService) {
    this.status = statusService.status;
  }

  ngOnInit() {
  }

  redraw(p: Player) {
    let tips: Tips = p.tips;
    this.tips = tips;
    this.maxWhite = tips.white;
    this.maxBlue = tips.blue;
    this.maxGreen = tips.green;
    this.maxRed = tips.red;
    this.maxBlack = tips.black;
    this.maxGold = tips.gold;
  }

  total(): number {
    return this.tips.count();
  }

  onPlus(color: Color) {
    switch(color) {
    case Color.WHITE:
      this.tips.white++;
      break;
    case Color.BLUE:
      this.tips.blue++;
      break;
    case Color.GREEN:
      this.tips.green++;
      break;
    case Color.RED:
      this.tips.red++;
      break;
    case Color.BLACK:
      this.tips.black++;
      break;
    default:
      this.tips.gold++;
      break;
    }
  }

  onMinus(color: Color) {
    switch(color) {
      case Color.WHITE:
        this.tips.white--;
        break;
      case Color.BLUE:
        this.tips.blue--;
        break;
      case Color.GREEN:
        this.tips.green--;
        break;
      case Color.RED:
        this.tips.red--;
        break;
      case Color.BLACK:
        this.tips.black--;
        break;
      default:
        this.tips.gold--;
        break;
      }
  }

  onOK() {
    if (this.total() != 10) {
      return;
    }
    let transferred: Tips = new Tips();
    transferred.white = this.maxWhite - this.tips.white;
    transferred.blue = this.maxBlue - this.tips.blue;
    transferred.green = this.maxGreen - this.tips.green;
    transferred.red = this.maxRed - this.tips.red;
    transferred.black = this.maxBlack - this.tips.black;
    transferred.gold = this.maxGold - this.tips.gold;
    let resource: Tips = this.status.tipResource;
    resource.add(transferred);
    this.logService.append(new OperationLogAction.ReleaseTipAction(transferred));
    this.statusService.nextTurn(this.status);
  }
}
