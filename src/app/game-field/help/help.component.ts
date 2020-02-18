import { Component, OnInit, Input } from '@angular/core';
import { GameStatus } from '../game-status';
import { GameStatusService } from '../game-status.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit {

  status: GameStatus;

  constructor(private service: GameStatusService) { }

  ngOnInit() {
    this.status = this.service.status;
  }

}
