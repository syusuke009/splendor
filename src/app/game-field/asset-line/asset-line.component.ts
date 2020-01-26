import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardDealService } from '../card-deal.service';
import { Card } from '../card';
import { GameStatusService } from '../game-status.service';
import { GameStatus } from '../game-status';

@Component({
  selector: 'app-asset-line',
  templateUrl: './asset-line.component.html',
  styleUrls: ['./asset-line.component.less']
})
export class AssetLineComponent implements OnInit {

  @Input() level :string;
  @Output() selected: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() rearselected: EventEmitter<Card> = new EventEmitter<Card>();
  card1: Card;
  card2: Card;
  card3: Card;
  card4: Card;

  constructor(private dealer: CardDealService,
    private statusService: GameStatusService) { }

  ngOnInit() {
    let func: Function = this.switchFunc();
    this.card1 = func();
    this.card2 = func();
    this.card3 = func();
    this.card4 = func();
  }

  private switchFunc(): Function {
    let status: GameStatus = this.statusService.status;
    switch (this.level) {
    case '1':
      return () => this.dealer.handOutLevel1(status);
    case '2':
      return () => this.dealer.handOutLevel2(status);
    case '3':
      return () => this.dealer.handOutLevel3(status);
    }
  }

  onSelected(card: Card, index: number) {
    switch(index) {
    case 1:
      this.card1 = this.switchFunc()();
      break;
    case 2:
      this.card2 = this.switchFunc()();
      break;
    case 3:
      this.card3 = this.switchFunc()();
      break;
    case 4:
      this.card4 = this.switchFunc()();
      break;
    }
    this.selected.emit(card);
  }

  onRearSelected() {
    console.log(this.level + "山札クリック")
    this.rearselected.emit(this.switchFunc()());
  }
}
