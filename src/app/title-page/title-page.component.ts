import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.less']
})
export class TitlePageComponent implements OnInit {

  notReady: boolean;
  message: string;

  constructor() { }

  ngOnInit() {
  }

  onChanged(players: string[]) {0
    this.notReady = players.filter(s => !s).length != 0;
    this.message = null;
    if (this.notReady == true) {
      this.message = '名前の入力されていないプレイヤーがいます';
      return;
    }
    this.notReady = players.map(subject => 
      players.filter(object => subject == object).length > 1
    ).filter(bool => bool).length != 0;
    if (this.notReady == true) {
      this.message = '同じ名前のプレイヤーがいます';
      return;
    }
    this.message = null;
  }
}
