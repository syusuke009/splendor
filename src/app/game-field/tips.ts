export class Tips {
    white: number = 0;
    blue: number = 0;
    green: number = 0;
    red: number = 0;
    black: number = 0;
    gold: number = 0;
    
    add(other: Tips) {
        this.white += other.white;
        this.blue += other.blue;
        this.green += other.green;
        this.red += other.red;
        this.black += other.black;
        this.gold += other.gold;
    }
    
    subtract(other: Tips) {
        this.white -= other.white;
        this.blue -= other.blue;
        this.green -= other.green;
        this.red -= other.red;
        this.black -= other.black;
        this.gold -= other.gold;
    }

    count(): number {
        return this.white
            + this.blue
            + this.green
            + this.red
            + this.black
            + this.gold;
    }
}
