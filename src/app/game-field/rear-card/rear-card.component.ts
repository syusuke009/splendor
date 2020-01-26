import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameStatusService } from '../game-status.service';
import { GameStatus } from '../game-status';
import { Card } from '../card';

@Component({
  selector: 'app-rear-card',
  templateUrl: './rear-card.component.html',
  styleUrls: ['./rear-card.component.less']
})
export class RearCardComponent implements OnInit {

  @Input() level: string;
  @Output() rearselected: EventEmitter<string> = new EventEmitter();
  status: GameStatus;
  deck: Card[];

  constructor(private statusService: GameStatusService) { }

  ngOnInit() {
    this.status = this.statusService.status;
    switch(this.level) {
    case '1':
      this.deck = this.status.level1;
      break;
    case '2':
      this.deck = this.status.level2;
      break;
    case '3':
      this.deck = this.status.level3;
      break;
    }
  }

  onClick() {
    this.rearselected.emit(this.level);
  }
}
