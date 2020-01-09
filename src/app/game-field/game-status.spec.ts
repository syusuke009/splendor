import { TestBed } from '@angular/core/testing';
import { GameResult } from './game-result';
import { Player } from './player';


describe('Game Set', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('1,2,3,4', () => {
    let players: Player[] = [];
    let p1 = new Player();
    p1.point = 11;
    players.push(p1);
    let p2 = new Player();
    p2.point = 15;
    players.push(p2);
    let p3 = new Player();
    p3.point = 16;
    players.push(p3);
    let p4 = new Player();
    p4.point = 13;
    players.push(p4);

    let result: GameResult = new GameResult();
    result.finish(players);
    expect(result.gameset).toBe(true);

    expect(result.first.length).toBe(1);
    expect(result.first[0]).toBe(p3);
    expect(result.second.length).toBe(1);
    expect(result.second[0]).toBe(p2);
    expect(result.third.length).toBe(1);
    expect(result.third[0]).toBe(p4);
    expect(result.fourth.length).toBe(1);
    expect(result.fourth[0]).toBe(p1);
  });
});
