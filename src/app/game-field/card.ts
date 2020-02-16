import { Color } from './color.enum';

export class Card {

    id: string;
    img: string;

    level: number;

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
