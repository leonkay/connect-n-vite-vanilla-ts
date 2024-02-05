import { expect, test } from 'vitest'
import { Actor, FromActorType } from "../model/Actor";

test("Actor", () => {
    let actor = new Actor(1);

    expect(actor.symbol).toEqual(1);
    expect(actor.moves()).toEqual([]);
    expect(actor.moveCount()).toEqual(0);
    expect(actor.toJSON()).toEqual({
        symbol: 1,
        moves: [],
    });
    expect(JSON.stringify(actor.toJSON())).toEqual('{"symbol":1,"moves":[]}');

    actor = new Actor(2, [
        {
            colIdx: 0,
            tokenIdx: 0,
        },
        {
            colIdx: 0,
            tokenIdx: 1,
        },
    ]);

    expect(actor.symbol).toEqual(2);
    expect(actor.moves()).toEqual([
        {
            colIdx: 0,
            tokenIdx: 0,
        },
        {
            colIdx: 0,
            tokenIdx: 1,
        },
    ]);
    expect(actor.moveCount()).toEqual(2);
    expect(actor.toJSON()).toEqual({
        symbol: 2,
        moves: [
            {
                colIdx: 0,
                tokenIdx: 0,
            },
            {
                colIdx: 0,
                tokenIdx: 1,
            },
        ],
    });
    expect(JSON.stringify(actor.toJSON())).toEqual(
        '{"symbol":2,"moves":[{"colIdx":0,"tokenIdx":0},{"colIdx":0,"tokenIdx":1}]}',
    );

    actor.successfulMove(3, 0);
    expect(actor.moves()).toEqual([
        {
            colIdx: 0,
            tokenIdx: 0,
        },
        {
            colIdx: 0,
            tokenIdx: 1,
        },
        {
            colIdx: 3,
            tokenIdx: 0,
        },
    ]);
    expect(actor.moveCount()).toEqual(3);
    expect(JSON.stringify(actor.toJSON())).toEqual(
        '{"symbol":2,"moves":[{"colIdx":0,"tokenIdx":0},{"colIdx":0,"tokenIdx":1},{"colIdx":3,"tokenIdx":0}]}',
    );
});

test("FromActorType", () => {
    let actor = FromActorType({
        symbol: 3,
        moves: [
            {
                colIdx: 3,
                tokenIdx: 4,
            },
        ],
    });
    expect(actor.symbol).toEqual(3);
    expect(actor.moves()).toEqual([
        {
            colIdx: 3,
            tokenIdx: 4,
        },
    ]);
    expect(actor.moveCount()).toEqual(1);
});
