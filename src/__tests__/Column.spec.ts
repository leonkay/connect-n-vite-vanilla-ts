import { expect, test } from 'vitest'
import { Column, FromColumnType } from "../model/Column";

test("Column", () => {
    let col = new Column();
    // test an initial column
    expect(col["state"]).toEqual([]);
    expect(col.toJSON()).toEqual({
        capacity: 6,
        state: [],
    });
    expect(JSON.stringify(col.toJSON())).toEqual('{"capacity":6,"state":[]}');

    expect(col.occupiedSlots()).toEqual(0);
    expect(col.values).toEqual([-1, -1, -1, -1, -1, -1])
    expect(col.get(0)).toEqual(-1);
    expect(col.get(1)).toEqual(-1);
    expect(col.get(2)).toEqual(-1);
    expect(col.printElement(0)).toEqual("[-]");
    expect(col.printElement(1)).toEqual("[-]");
    expect(col.printElement(2)).toEqual("[-]");

    expect(col.placeToken(1, 0)).toBeNull();

    // test where the max column height is 1
    expect(col.placeToken(1, 1)).toEqual(0);
    expect(col.placeToken(1, 1)).toBeNull();
    expect(col.toJSON()).toEqual({
        capacity: 6,
        state: [1],
    });
    expect(col.values).toEqual([-1, -1, -1, -1, -1, 1])
    expect(JSON.stringify(col.toJSON())).toEqual('{"capacity":6,"state":[1]}');

    expect(col.occupiedSlots()).toEqual(1);
    expect(col.get(0)).toEqual(1);
    expect(col.get(1)).toEqual(-1);
    expect(col.get(2)).toEqual(-1);

    expect(col.printElement(0)).toEqual("[1]");
    expect(col.printElement(1)).toEqual("[-]");
    expect(col.printElement(2)).toEqual("[-]");

    // test where the max column height is 2
    expect(col.placeToken(2, 2)).toEqual(1);
    expect(col.placeToken(2, 2)).toBeNull();
    expect(JSON.stringify(col.toJSON())).toEqual('{"capacity":6,"state":[1,2]}');

    expect(col.toJSON()).toEqual({
        capacity: 6,
        state: [1, 2],
    });

    expect(col.occupiedSlots()).toEqual(2);
    expect(col.get(0)).toEqual(1);
    expect(col.get(1)).toEqual(2);
    expect(col.get(2)).toEqual(-1);

    expect(col.printElement(0)).toEqual("[1]");
    expect(col.printElement(1)).toEqual("[2]");
    expect(col.printElement(2)).toEqual("[-]");
});

// the "static" constructor for Column based on the ColumnType
test("FromColumnType", () => {
    let col = FromColumnType({
        capacity: 3,
        state: [1, 2],
    });

    expect(col.occupiedSlots()).toEqual(2);
    expect(col.get(0)).toEqual(1);
    expect(col.get(1)).toEqual(2);
    expect(col.get(2)).toEqual(-1);

    expect(col.printElement(0)).toEqual("[1]");
    expect(col.printElement(1)).toEqual("[2]");
    expect(col.printElement(2)).toEqual("[-]");
});
