import { Component, OnInit } from '@angular/core';
import { GameResult } from '../game-result';
import { GameResultService } from '../game-result.service';
import { Player } from '../player';

@Component({
  selector: 'app-gameset-slide',
  templateUrl: './gameset-slide.component.html',
  styleUrls: ['./gameset-slide.component.less']
})
export class GamesetSlideComponent implements OnInit {

  result: GameResult;

  constructor(private service: GameResultService) { }

  ngOnInit() {
    this.result = this.service.getResult();
  }

}
