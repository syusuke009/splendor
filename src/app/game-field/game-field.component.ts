import { Component, OnInit } from '@angular/core';
import { GameStatusService } from './game-status.service';
import { GameStatus } from './game-status';
import { Player } from './player';
import { Card } from './card';
import { Tips } from './tips';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.less']
})
export class GameFieldComponent implements OnInit {

  status: GameStatus;

  constructor(private service: GameStatusService) { }

  ngOnInit() {
    this.status = this.service.setup();
  }

  openMultiSelectDialog() {
    this.resetOperation();
    this.status.multiSelectDialog = true;
  }

  openSingleSelectDialog() {
    this.resetOperation();
    this.status.singleSelectDialog = true;
  }

  purchaseCard() {
    this.resetOperation();
    let p: Player = this.status.getCurrentPlayer();
    this.status.getFieldCards().forEach(card => card.setSelectable(p.canSelect(card)));
    this.status.purchaseCard = true;
  }

  reserveCard() {
    this.resetOperation();
    this.status.getFieldCards().forEach(card => card.setSelectable(true));
    this.status.reserveCard = true;
  }

  onCancel() {
    this.resetOperation();
  }

  private resetOperation() {
    this.status.multiSelectDialog = false;
    this.status.singleSelectDialog = false;
    this.status.purchaseCard = false;
    this.status.reserveCard = false;
    this.status.getFieldCards().forEach(card => card.setSelectable(false));
  }

  onSelected(card: Card) {
    if (this.status.purchaseCard) {
      let p: Player = this.status.getCurrentPlayer();
      let returns: Tips = p.acquire(card);
      this.status.tipResource.add(returns);
      this.service.nextTurn(this.status);
      this.resetOperation();
    }
    if (this.status.reserveCard) {
      let p: Player = this.status.getCurrentPlayer();
      if (this.status.tipResource.gold == 0) {
        p.reserve(card, false);
      } else {
        p.reserve(card, true);
        this.status.tipResource.gold--;
      }
      this.service.nextTurn(this.status);
      this.resetOperation();
    }
  }
}
