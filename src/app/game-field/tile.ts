import { Tips } from './tips';

export class Tile {
    
    id: string;
    img: string;

    point: number;

    white: number;
    blue: number;
    green: number;
    red: number;
    black: number;

    isSatisfied(assets: Tips): boolean {
      if (assets.white < this.white) {
          return false;
      }
      if (assets.blue < this.blue) {
          return false;
      }
      if (assets.green < this.green) {
          return false;
      }
      if (assets.red < this.red) {
          return false;
      }
      if (assets.black < this.black) {
          return false;
      }
      return true;
    }
}
