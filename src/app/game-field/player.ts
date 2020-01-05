import { Tips } from './tips';
import { Card } from './card';
import { Tile } from './tile';
import { Color } from './color.enum';

export class Player {
    
    name: string;

    point: number = 0;

    tips: Tips = new Tips();
    assets: Tips = new Tips();
    purchases: Card[] = [];
    reservations: Card[] = [];
    nobles: Tile[] = [];

    myTurn: boolean = false;

    /**
     * チップを払ってカードを取得する
     * @param card 
     * @return 場に戻るチップ
     */
    acquire(card: Card): Tips {
        let returns: Tips = this.pay(card);
        this.addAsset(card.color);
        this.point += card.point;
        this.purchases.push(card);
        return returns;
    }

    reserve(card: Card, canGetGold: boolean) {
        this.reservations.push(card);
        if (canGetGold) {
            this.tips.gold++;
        }
    }

    visit(noble: Tile) {
        this.point += noble.point;
        this.nobles.push(noble);
    }

    private addAsset(color: Color) {
        switch(color) {
        case Color.WHITE:
            this.assets.white++;
            break;
        case Color.BLUE:
            this.assets.blue++;
            break;
        case Color.GREEN:
            this.assets.green++;
            break;
        case Color.RED:
            this.assets.red++;
            break;
        case Color.BLACK:
            this.assets.black++;
            break;
        }
    }

    private pay(card: Card): Tips {
        let returns = new Tips();
        let tips: Tips = this.tips;
        let beforeGold: number = tips.gold;
        tips.gold += this.checkCost(card.white, tips.white, this.assets.white);
        if (card.white > this.assets.white) {
            let cost: number = Math.min(card.white - this.assets.white, tips.white);
            tips.white -= cost;
            returns.white += cost;
        }
        tips.gold += this.checkCost(card.blue, tips.blue, this.assets.blue);
        if (card.blue > this.assets.blue) {
            let cost: number = Math.min(card.blue - this.assets.blue, tips.blue);
            tips.blue -= cost;
            returns.blue += cost;
        }
        tips.gold += this.checkCost(card.green, tips.green, this.assets.green);
        if (card.green > this.assets.green) {
            let cost: number = Math.min(card.green - this.assets.green, tips.green);
            tips.green -= cost;
            returns.green += cost;
        }
        tips.gold += this.checkCost(card.red, tips.red, this.assets.red);
        if (card.red > this.assets.red) {
            let cost: number = Math.min(card.red - this.assets.red, tips.red)
            tips.red -= cost;
            returns.red += cost;
        }
        tips.gold += this.checkCost(card.black, tips.black, this.assets.black);
        if (card.black > this.assets.black) {
            let cost: number = Math.min(card.black - this.assets.black, tips.black)
            tips.black -= cost;
            returns.black += cost;
        }
        returns.gold = beforeGold - tips.gold;
        return returns;
    }

    canSelect(card: Card): boolean {
        let tips: Tips = this.tips;
        let wildcard = tips.gold;
        wildcard += this.checkCost(card.white, tips.white, this.assets.white);
        if (wildcard < 0) {
            return false;
        }
        wildcard += this.checkCost(card.blue, tips.blue, this.assets.blue);
        if (wildcard < 0) {
            return false;
        }
        wildcard += this.checkCost(card.green, tips.green, this.assets.green);
        if (wildcard < 0) {
            return false;
        }
        wildcard += this.checkCost(card.red, tips.red, this.assets.red);
        if (wildcard < 0) {
            return false;
        }
        wildcard += this.checkCost(card.black, tips.black, this.assets.black);
        if (wildcard < 0) {
            return false;
        }
        return true;
    }

    /**
     * カードのコストに対して、チップと資産と比べどれくらい足りないかを返す
     * @param card 
     * @param tip 
     * @param asset 
     * @return 足りないチップの数（マイナス値のみ、プラス値は返らない）、充足している場合は0
     */
    private checkCost(card: number, tip: number, asset: number): number {
        if (card <= tip + asset) {
            return 0;
        }
        let lack: number = Math.max(card - tip + asset, 0);
        return lack * -1;
    }
}
