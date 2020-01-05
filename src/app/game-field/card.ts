import { Color } from './color.enum';
import { Player } from './player';
import { Tips } from './tips';

export class Card {

    color: Color;

    point: number;

    white: number;
    blue: number;
    green: number;
    red: number;
    black: number;

    selectable: boolean = false;

    setSelectable(selectable: boolean) {
        this.selectable = selectable;
    }
}
