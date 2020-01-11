import { Component, OnInit, ViewChild } from '@angular/core';
import { GameStatusService } from './game-status.service';
import { GameStatus } from './game-status';
import { Player } from './player';
import { Card } from './card';
import { Tips } from './tips';
import { GamePhaseConst } from './game-phase-const';
import { TipReleaseDialogComponent } from './tip-release-dialog/tip-release-dialog.component';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.less']
})
export class GameFieldComponent implements OnInit {

  status: GameStatus;

  @ViewChild(TipReleaseDialogComponent, {static: false})
  releaseDialog: TipReleaseDialogComponent;

  constructor(private service: GameStatusService) { }

  ngOnInit() {
    this.status = this.service.setup();
  }

  openMultiSelectDialog() {
    this.resetSelectable();
    this.status.phase = GamePhaseConst.OPEN_TIP_MULTI_DIALOG;
  }

  openSingleSelectDialog() {
    this.resetSelectable();
    this.status.phase = GamePhaseConst.OPEN_TIP_SINGLE_DIALOG;
  }

  purchaseCard() {
    this.resetSelectable();
    let p: Player = this.status.getCurrentPlayer();
    this.status.getFieldCards().forEach(card => card.setSelectable(p.canSelect(card)));
    this.status.players.forEach(p => p.reservations.forEach(card => card.setSelectable(p.canSelect(card))));
    this.status.phase = GamePhaseConst.SELECT_PURCHASE_CARD;
  }

  reserveCard() {
    this.resetSelectable();
    this.status.getFieldCards().forEach(card => card.setSelectable(true));
    this.status.phase = GamePhaseConst.SELECT_RESERVATION_CARD;
  }

  onCancel() {
    this.resetSelectable();
    this.status.phase = GamePhaseConst.WAIT_OPERATION;
  }

  private resetSelectable() {
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
      this.resetSelectable();
    }
    if (this.status.phase == GamePhaseConst.SELECT_RESERVATION_CARD) {
      let p: Player = this.status.getCurrentPlayer();
      p.reserve(card);
      if (this.status.tipResource.gold > 0) {
        p.tips.gold++;
        this.status.tipResource.gold--;
      }
      if (p.tips.count() > 10) {
        this.onPossessionOver(p);
        this.resetSelectable();
        return;
      }
      this.service.nextTurn(this.status);
      this.resetSelectable();
    }
  }

  onPossessionOver(player: Player) {
    this.releaseDialog.redraw(player);
    this.status.phase = GamePhaseConst.OPEN_TIP_RELEASE_DIALOG;
  }
}
