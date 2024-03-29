import { expect, test } from 'vitest'
import { Actor } from "../model/Actor";
import { Column } from "../model/Column";
import { ConnectGrid } from "../model/ConnectGrid";
import { Engine } from "../model/Engine";
import { ConnectNWinCondition } from "../model/WinCondition";

test("ConnectNWinCondition - Horizontal", () => {
    let condition = new ConnectNWinCondition(4);
    expect(condition.colHeight()).toEqual(6);
    expect(condition.numCol()).toEqual(7);

    let actor1 = new Actor(1);

    let grid = new ConnectGrid(condition.colHeight());
    for (let i = 0; i < condition.numCol(); i++) {
        grid.addColumn(new Column());
    }

    let engine = new Engine(condition, grid, [actor1]);
    // test no moves
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    // player 1 move to col 0
    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(2);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(4);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(5);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(3);
    console.log(grid.printGrid(""));
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");

    // an extra move shouldn't do anything to the game status
    engine.simpleMove(6);
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
});

test("ConnectNWinCondition - Vertical", () => {
    let condition = new ConnectNWinCondition(4);

    let actor1 = new Actor(1);

    let grid = new ConnectGrid(condition.colHeight());
    for (let i = 0; i < condition.numCol(); i++) {
        grid.addColumn(new Column());
    }

    let engine = new Engine(condition, grid, [actor1]);
    // test no moves
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    // player 1 move to col 0
    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(2);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(5);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");

    engine.simpleMove(0);
    console.log(grid.printGrid(""));
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");

    // an extra move shouldn't do anything to the game status
    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
});

test("ConnectNWinCondition - Diagonal Up Right", () => {
    let condition = new ConnectNWinCondition(4);

    let actor1 = new Actor(1);
    let actor2 = new Actor(2);

    let grid = new ConnectGrid(condition.colHeight());
    for (let i = 0; i < condition.numCol(); i++) {
        grid.addColumn(new Column());
    }

    let engine = new Engine(condition, grid, [actor1, actor2]);
    engine.simpleMove(0);
    engine.simpleMove(1);

    engine.simpleMove(2);
    engine.simpleMove(2);

    engine.simpleMove(3);
    engine.simpleMove(3);

    engine.simpleMove(2);
    engine.simpleMove(3);

    engine.simpleMove(3);
    engine.simpleMove(4);

    engine.simpleMove(3);
    engine.simpleMove(5);

    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");
    expect(condition.didWin(actor2, grid)).toEqual("PLAYING");

    engine.simpleMove(1);

    console.log(grid.printGrid(""));
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
    expect(condition.didWin(actor2, grid)).toEqual("NOWINNER");

    // an extra move shouldn't do anything to the game status
    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
    expect(condition.didWin(actor2, grid)).toEqual("NOWINNER");
});

test("ConnectNWinCondition - Diagonal Down Right", () => {
    let condition = new ConnectNWinCondition(4);

    let actor1 = new Actor(1);
    let actor2 = new Actor(2);

    let grid = new ConnectGrid(condition.colHeight());
    for (let i = 0; i < condition.numCol(); i++) {
        grid.addColumn(new Column());
    }

    let engine = new Engine(condition, grid, [actor1, actor2]);
    engine.simpleMove(0);
    engine.simpleMove(0);

    engine.simpleMove(0);
    engine.simpleMove(5);

    engine.simpleMove(1);
    engine.simpleMove(1);

    engine.simpleMove(1);
    engine.simpleMove(2);

    engine.simpleMove(3);
    engine.simpleMove(3);

    engine.simpleMove(0);
    engine.simpleMove(5);

    expect(condition.didWin(actor1, grid)).toEqual("PLAYING");
    expect(condition.didWin(actor2, grid)).toEqual("PLAYING");

    engine.simpleMove(2);

    console.log(grid.printGrid(""));
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
    expect(condition.didWin(actor2, grid)).toEqual("NOWINNER");

    // an extra move shouldn't do anything to the game status
    engine.simpleMove(0);
    expect(condition.didWin(actor1, grid)).toEqual("WINNER");
    expect(condition.didWin(actor2, grid)).toEqual("NOWINNER");
});

test("WinCondition - Utility", () => {
    let condition = new ConnectNWinCondition(4);
    expect(condition.colHeight()).toEqual(6);
    expect(condition.numCol()).toEqual(7);

    condition = new ConnectNWinCondition(3);
    expect(condition.colHeight()).toEqual(4);
    expect(condition.numCol()).toEqual(5);
})
