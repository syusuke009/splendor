import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.less']
})
export class TitlePageComponent implements OnInit {

  players: string[] = [null,null,null,null,null];

  constructor(private setting: SettingService) { }

  ngOnInit() {
    this.setting.setPlayers(this.players);
  }

}
