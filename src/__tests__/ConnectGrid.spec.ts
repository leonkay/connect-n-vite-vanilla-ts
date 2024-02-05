import { expect, test } from 'vitest'
import { Column } from "../model/Column";
import { ConnectGrid, FromConnectGridType } from "../model/ConnectGrid";

test("ConnectGrid", () => {
    let grid = new ConnectGrid(2);
    expect(grid.height()).toEqual(2);
    expect(grid.getGrid()).toEqual([]);
    expect(grid.toJSON()).toEqual({
        height: 2,
        columns: [],
    });
    expect(JSON.stringify(grid.toJSON())).toEqual('{"height":2,"columns":[]}');
    expect(grid.printGrid()).toEqual("");
    expect(grid.getGridCol(0)).toBeUndefined();

    // add a column
    grid.addColumn(new Column());
    expect(grid.height()).toEqual(2);
    expect(grid.getGrid()).toEqual([
        {
            capacity: 6,
            state: [],
        },
    ]);
    expect(JSON.stringify(grid.toJSON())).toEqual(
        '{"height":2,"columns":[{"capacity":6,"state":[]}]}',
    );
    expect(grid.getGridCol(0)).toEqual({
        capacity: 6,
        state: [],
    });
    expect(grid.getGridCol(1)).toBeUndefined();

    console.log(grid.printGrid(""));
    //[-]
    //[-]
    expect(grid.printGrid("")).toEqual("[-]\n[-]\n");

    // add another column
    grid.addColumn(new Column());
    expect(grid.height()).toEqual(2);
    expect(grid.getGrid()).toEqual([
        {
            capacity: 6,
            state: [],
        },
        {
            capacity: 6,
            state: [],
        },
    ]);
    expect(JSON.stringify(grid.toJSON())).toEqual(
        '{"height":2,"columns":[{"capacity":6,"state":[]},{"capacity":6,"state":[]}]}',
    );
    expect(grid.getGrid()).toEqual([
        {
            capacity: 6,
            state: [],
        },
        {
            capacity: 6,
            state: [],
        },
    ]);
    expect(grid.getGridCol(0)).toEqual({
        capacity: 6,
        state: [],
    });
    expect(grid.getGridCol(1)).toEqual({
        capacity: 6,
        state: [],
    });
    expect(grid.getGridCol(2)).toBeUndefined();
    console.log(grid.printGrid(""));
    //[-][-]
    //[-][-]
    expect(grid.printGrid("")).toEqual("[-][-]\n[-][-]\n");

    expect(grid.getGridCol(0)?.placeToken(1, grid.height())).toEqual(0);
    expect(grid.getGrid()).toEqual([
        {
            capacity: 6,
            state: [1],
        },
        {
            capacity: 6,
            state: [],
        },
    ]);
    //[-][-]
    //[1][-]
    expect(grid.printGrid("")).toEqual("[-][-]\n[1][-]\n");

    expect(grid.getGridCol(0)?.placeToken(2, grid.height())).toEqual(1);
    expect(grid.getGrid()).toEqual([
        {
            capacity: 6,
            state: [1, 2],
        },
        {
            capacity: 6,
            state: [],
        },
    ]);

    //[2][-]
    //[1][-]
    expect(grid.printGrid("")).toEqual("[2][-]\n[1][-]\n");
});

test("FromConnectGridType", () => {
    let grid = FromConnectGridType({
        height: 2,
        columns: [
            {
                capacity: 3,
                state: [1, 2],
            },
            {
                capacity: 3,
                state: [3, 4],
            },
        ],
    });

    expect(grid.height()).toEqual(2);
    expect(grid.getGrid()).toEqual([
        {
            capacity: 3,
            state: [1, 2],
        },
        {
            capacity: 3,
            state: [3, 4],
        },
    ]);
});
