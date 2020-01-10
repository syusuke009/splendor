import { Player } from './player';

export class GameResult {

    gameset: boolean = false;

    first: Player[] = [];
    second: Player[] = [];
    third: Player[] = [];
    fourth: Player[] = [];

    finish(args: Player[]): void {
        let players = [];
        args.forEach(p => players.push(p));

        this.gameset = true;

        let tmpRank: Player[] = players.sort(this.comparingFunc);
        this.first.push(tmpRank.shift());

        let prev = this.first;
        let next = this.second;
        let p = tmpRank.shift();
        if (p == null) {
            return;
        }
        if (this.comparingFunc(p, prev[0]) == 0) {
            prev.push(p);
        } else {
            next.push(p);
            prev = next;
        }
        next = this.third;

        p = tmpRank.shift();
        if (p == null) {
            return;
        }
        if (this.comparingFunc(p, prev[0]) == 0) {
            prev.push(p);
        } else {
            next.push(p);
            prev = next;
        }
        next = this.fourth;

        p = tmpRank.shift();
        if (p == null) {
            return;
        }
        if (this.comparingFunc(p, prev[0]) == 0) {
            prev.push(p);
        } else {
            next.push(p);
        }
    }

    private tie(rank: Player[], tmpRank: Player[]): Player {
        let next = tmpRank.shift();
        if (next == null) {
            return null;
        }
        if (this.comparingFunc(rank[0], next) == 0) {
            rank.push(next);
            return this.tie(rank, tmpRank);
        }
        return next;
    }

    private comparingFunc = (a, b) => {
        if (a.point != b.point) {
            return (a.point - b.point) * -1;
        }
        if (a.assets.count() != b.assets.count()) {
            return a.assets.count() - b.assets.count()
        }
        return 0;
    }
}
