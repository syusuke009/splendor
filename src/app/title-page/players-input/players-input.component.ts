import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingService } from 'src/app/setting.service';

@Component({
  selector: 'app-players-input',
  templateUrl: './players-input.component.html',
  styleUrls: ['./players-input.component.less']
})
export class PlayersInputComponent implements OnInit {

  @Output() changed: EventEmitter<string[]> = new EventEmitter<string[]>();

  players: string[];
  
  constructor(private setting: SettingService) { }

  ngOnInit() {
    this.players = this.setting.getPlayers() || [null,null];
    this.setting.setPlayers(this.players);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  addPlayer() {
    this.players.push(null);
    this.emitChanged();
  }

  removePlayer() {
    this.players.pop();
    this.emitChanged();
  }

  onChange() {
    this.emitChanged();
  }
  emitChanged() {
    this.changed.emit(this.players);
  }
}
