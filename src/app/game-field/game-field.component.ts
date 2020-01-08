import { Component, OnInit } from '@angular/core';
import { GameStatusService } from './game-status.service';
import { GameStatus } from './game-status';
import { Player } from './player';
import { Card } from './card';
import { Tips } from './tips';
import { GamePhaseConst } from './game-phase-const';

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
    this.status.phase = GamePhaseConst.OPEN_TIP_MULTI_DIALOG;
  }

  openSingleSelectDialog() {
    this.resetOperation();
    this.status.phase = GamePhaseConst.OPEN_TIP_SINGLE_DIALOG;
  }

  purchaseCard() {
    this.resetOperation();
    let p: Player = this.status.getCurrentPlayer();
    this.status.getFieldCards().forEach(card => card.setSelectable(p.canSelect(card)));
    this.status.players.forEach(p => p.reservations.forEach(card => card.setSelectable(p.canSelect(card))));
    this.status.phase = GamePhaseConst.SELECT_PURCHASE_CARD;
  }

  reserveCard() {
    this.resetOperation();
    this.status.getFieldCards().forEach(card => card.setSelectable(true));
    this.status.phase = GamePhaseConst.SELECT_RESERVATION_CARD;
  }

  onCancel() {
    this.resetOperation();
  }

  private resetOperation() {
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
    this.status.getFieldCards().forEach(card => card.setSelectable(false));
    this.status.players.forEach(p => p.reservations.forEach(card => card.setSelectable(false)));
  }

  onSelected(card: Card) {
    this.status.removeFieldCard(card);
    if (this.status.phase == GamePhaseConst.SELECT_PURCHASE_CARD) {
      let p: Player = this.status.getCurrentPlayer();
      let returns: Tips = p.acquire(card);
      if (p.isReserved(card)) {
        p.purchaseReserved(card);
      }
      this.status.tipResource.add(returns);
      this.service.nextTurn(this.status);
      this.resetOperation();
    }
    if (this.status.phase == GamePhaseConst.SELECT_RESERVATION_CARD) {
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
