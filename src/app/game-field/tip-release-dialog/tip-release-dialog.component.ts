import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';
import { Player } from '../player';
import { Tips } from '../tips';
import { GamePhaseConst } from '../game-phase-const';
import { Color } from '../color.enum';

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

  constructor(private statusService: GameStatusService) {
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
    let resource: Tips = this.status.tipResource;
    resource.white += this.maxWhite - this.tips.white;
    resource.blue += this.maxBlue - this.tips.blue;
    resource.green += this.maxGreen - this.tips.green;
    resource.red += this.maxRed - this.tips.red;
    resource.black += this.maxBlack - this.tips.black;
    resource.gold += this.maxGold - this.tips.gold;
    this.statusService.nextTurn(this.status);
  }
}
