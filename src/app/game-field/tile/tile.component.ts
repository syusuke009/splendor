import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.less']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  @Output() selected: EventEmitter<Tile> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.selected.emit(this.tile);
  }
}
