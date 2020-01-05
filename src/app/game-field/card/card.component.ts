import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() selected: EventEmitter<Card> = new EventEmitter<Card>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (!this.card.selectable) {
      return;
    }
    this.selected.emit(this.card);
  }
}
