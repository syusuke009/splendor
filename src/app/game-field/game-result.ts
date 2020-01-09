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

        let second = this.tie(this.first, tmpRank);
        if (second == null) {
            return;
        }
        this.second.push(second);

        let third = this.tie(this.second, tmpRank);
        if (third == null) {
            return;
        }
        this.third.push(third);

        let fourth = this.tie(this.third, tmpRank);
        if (fourth == null) {
            return;
        }
        this.fourth.push(fourth);
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
